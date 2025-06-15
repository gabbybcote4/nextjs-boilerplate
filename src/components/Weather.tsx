"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CloudSunIcon, CloudRainIcon, SunIcon, CloudIcon, CloudSnowIcon, CloudLightningIcon } from "lucide-react"

interface WeatherData {
  temp: number
  condition: string
  location: string
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async (position: GeolocationPosition) => {
      try {
        const { latitude, longitude } = position.coords
        // Get weather data
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
        )
        if (!weatherResponse.ok) {
          throw new Error('Weather service unavailable')
        }
        const weatherData = await weatherResponse.json()

        // Get location name using reverse geocoding
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        )
        if (!geoResponse.ok) {
          throw new Error('Location service unavailable')
        }
        const geoData = await geoResponse.json()

        setWeather({
          temp: Math.round(weatherData.current.temperature_2m),
          condition: getWeatherCondition(weatherData.current.weather_code),
          location: geoData.city || geoData.locality || 'Unknown Location'
        })
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch weather')
        console.error("Error fetching weather:", error)
      } finally {
        setLoading(false)
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        fetchWeather,
        (error) => {
          setError('Location access denied')
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation not supported')
      setLoading(false)
    }
  }, [])

  const getWeatherCondition = (code: number): string => {
    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    if (code === 0) return "Clear"
    if (code === 1) return "Mainly Clear"
    if (code === 2) return "Partly Cloudy"
    if (code === 3) return "Cloudy"
    if (code >= 51 && code <= 67) return "Rain"
    if (code >= 71 && code <= 77) return "Snow"
    if (code >= 80 && code <= 82) return "Rain"
    if (code >= 85 && code <= 86) return "Snow"
    if (code >= 95 && code <= 99) return "Thunderstorm"
    return "Clear"
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "mainly clear":
        return <SunIcon className="h-6 w-6" />
      case "partly cloudy":
      case "cloudy":
        return <CloudIcon className="h-6 w-6" />
      case "rain":
        return <CloudRainIcon className="h-6 w-6" />
      case "snow":
        return <CloudSnowIcon className="h-6 w-6" />
      case "thunderstorm":
        return <CloudLightningIcon className="h-6 w-6" />
      default:
        return <CloudSunIcon className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <Card className="p-3 bg-white dark:bg-gray-800">
        <div className="animate-pulse flex items-center justify-between">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-3 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>{error}</p>
          <CloudIcon className="h-5 w-5" />
        </div>
      </Card>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <Card className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-2">
        {getWeatherIcon(weather.condition)}
        <div>
          <div className="flex items-baseline gap-1">
            <p className="text-lg font-semibold">{weather.temp}°C</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{weather.location}</p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300">{weather.condition}</p>
        </div>
      </div>
    </Card>
  )
}
