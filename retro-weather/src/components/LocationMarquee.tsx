import { useEffect, useState } from "react";
import { Marquee } from "retro-react";
import { searchMultiple, type WeatherDataMultiple } from "../api";

export default function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherDataMultiple[]>([]);
    const locations = ['London', 'Paris', 'New York', 'Los Angeles', 'Tokyo', 'Sydney', 'Hong Kong', 'Moscow', 'Dubai']

    useEffect(() => {
        searchMultiple(locations)
            .then(result => setWeatherData(result))
    }, []);

    return (
        <Marquee speed="20s">
            {weatherData.map((data) => (
                <span style={{ padding: "0 8px" }} key={data.location}>
                    <span>{data.location}</span> <span>{data.result.temperature}°C</span>
                </span>
            ))}
        </Marquee>
    )
}