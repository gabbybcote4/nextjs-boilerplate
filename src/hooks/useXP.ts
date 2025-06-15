"use client"

import { useState, useEffect, useCallback } from 'react'

interface XPSystem {
  currentXP: number
  level: number
  xpToNextLevel: number
  currentLevelXP: number
}

const calculateLevel = (xp: number): { level: number; xpToNextLevel: number; currentLevelXP: number } => {
  const baseXP = 50 // Base XP needed for level 1
  const xpIncrease = 1.5 // 50% increase per level
  
  let level = 1
  let totalXP = 0
  let xpForLevel = baseXP

  // Calculate level based on total XP
  while (totalXP + xpForLevel <= xp) {
    totalXP += xpForLevel
    level++
    xpForLevel = Math.round(baseXP * Math.pow(xpIncrease, level - 1))
  }

  // Calculate XP needed for next level
  const xpInCurrentLevel = xp - totalXP
  const xpToNextLevel = xpForLevel - xpInCurrentLevel

  return {
    level,
    xpToNextLevel: Math.max(0, xpToNextLevel),
    currentLevelXP: xpForLevel
  }
}

export function useXP() {
  const [xpSystem, setXPSystem] = useState<XPSystem>({
    currentXP: 0,
    level: 1,
    xpToNextLevel: 50,
    currentLevelXP: 50
  })

  // Load XP from localStorage on initial mount and listen for updates
  useEffect(() => {
    const loadXP = () => {
      const savedXP = localStorage.getItem('xpSystem')
      if (savedXP) {
        try {
          const parsed = JSON.parse(savedXP)
          setXPSystem(parsed)
        } catch (e) {
          console.error('Failed to parse XP data:', e)
        }
      }
    }

    loadXP() // Initial load
    window.addEventListener('xp-updated', loadXP)
    
    return () => {
      window.removeEventListener('xp-updated', loadXP)
    }
  }, [])

  const addXP = useCallback((amount: number) => {
    const newXP = xpSystem.currentXP + amount
    const { level, xpToNextLevel, currentLevelXP } = calculateLevel(newXP)
    
    const updatedSystem = {
      currentXP: newXP,
      level,
      xpToNextLevel,
      currentLevelXP
    }

    localStorage.setItem('xpSystem', JSON.stringify(updatedSystem))
    setXPSystem(updatedSystem)
    
    // Dispatch event after state update
    setTimeout(() => {
      window.dispatchEvent(new Event('xp-updated'))
    }, 0)
  }, [xpSystem.currentXP])

  const getXPForAction = useCallback((action: 'complete' | 'streak' | 'perfect-week', streakCount: number = 0) => {
    switch (action) {
      case 'complete':
        return 5 // Base XP for completing a habit
      case 'streak':
        // 1 XP per day up to 10
        return Math.min(10, streakCount)
      case 'perfect-week':
        return 0 // Removed perfect week bonus for now
      default:
        return 0
    }
  }, [])

  const resetXP = useCallback(() => {
    const initialSystem = {
      currentXP: 0,
      level: 1,
      xpToNextLevel: 50,
      currentLevelXP: 50
    }
    try {
      // Reset XP system
      localStorage.setItem('xpSystem', JSON.stringify(initialSystem))
      setXPSystem(initialSystem)

      // Reset habits
      localStorage.removeItem('habits')
      window.dispatchEvent(new Event('habits-updated'))
      
      // Notify XP update
      window.dispatchEvent(new Event('xp-updated'))
    } catch (e) {
      console.error('Failed to reset system:', e)
    }
  }, [])

  return {
    ...xpSystem,
    addXP,
    getXPForAction,
    resetXP
  }
}
