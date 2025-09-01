import axios from "axios"


interface Props {
    latitude: number
    longitude: number
}

export const funcGetTemperatures = async ({latitude, longitude}: Props) =>  {
    const temperatures = await axios.get(`${process.env.REACT_APP_API_WEATHER}`, {
        params: {
            latitude: latitude, // Координаты
            longitude: longitude, // Координаты
            daily: ["temperature_2m_max", "temperature_2m_min", "weathercode"], // Макс / Мин / Сред температуры
            forecast_days: 4, // Кол-во дней
            timezone: "auto" 
        }
    })


    return temperatures
}