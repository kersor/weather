import { useEffect, useState } from "react"
import { CityLocalStorage } from "../types/city"



const funcGetLocalStorage = (key: string, defaultValue: CityLocalStorage) => {
    const city = localStorage.getItem(key)
    
    if (!city) return defaultValue

    const initial = JSON.parse(city);
    return initial || defaultValue
}

export const useCityLocalStorage = (key: string, defaultValue: CityLocalStorage) => {
    console.log(key)
    const [value, setValue] = useState(() => {
        return funcGetLocalStorage(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, defaultValue])

    return [value, setValue]
}