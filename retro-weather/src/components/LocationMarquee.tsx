import { Marquee } from "retro-react";


export default function Weather() {

    const [weatherData, setWeatherData] = useState<dataTypes | null>(null);


    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            setWeatherData({
                temperature: data.temperature,
                location: data.name
            })

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}