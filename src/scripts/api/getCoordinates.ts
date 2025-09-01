import axios from "axios"

export const funcGetCoordinates = async (city: string) =>  {
    const coordinates = await axios.get(`${process.env.REACT_APP_API_WEATHER_COORDINATES}`, {
        params: {
            name: city
        }
    })

    const results = coordinates.data.results

    return results
}