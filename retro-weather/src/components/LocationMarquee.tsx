import { useEffect, useState } from "react";
import { Marquee } from "retro-react";


export default function Weather() {

    fetch()

    const [weatherData, setWeatherData] = useState([]);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
    const locations = ['London', 'Paris', 'New York', 'Los Angeles', 'Tokyo', 'Sydney', 'Hong Kong', 'Moscow', 'Dubai']


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setWeatherData({
                temperature: data.temperature,
                location: data.name
            }))
    })

    return (
        <Marquee></Marquee>
    )
}