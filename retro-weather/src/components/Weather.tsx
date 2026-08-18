import { useEffect, useRef, useState } from 'react';
import { Card, Text, Input, Button, LayoutHeader, Marquee, Box } from 'retro-react';


export interface dataTypes {
    conditions: string;
    temperature: number;
    feelsLike: number;
    location: string;
    humidity: number;
}


export default function Weather() {

    const [weatherData, setWeatherData] = useState<dataTypes | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);


    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                conditions: data.weather[0].main,
                temperature: Math.floor(data.main.temp),
                feelsLike: Math.floor(data.main.feels_like),
                location: data.name,
                humidity: Math.floor(data.main.humidity)
            })

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    useEffect(() => {
        search(inputRef);
    }, [])

    return (
        <Card
            alt="Vintage computer setup"
            sx={{
                maxWidth: 360,
                maxHeight: 400,
                margin: 'auto',
                padding: 0
            }}
        >
            <LayoutHeader sx={{ margin: 0, padding: 1, backgroundColor: '#000080' }}>
                <Text sx={{ color: 'white', fontWeight: 'bold' }}>
                    Weather.exe
                </Text>
            </LayoutHeader>
            <Input
                ref={inputRef}
                onChange={function noRefCheck() { }}
                placeholder="Search"
                size="medium"
                sx={{
                    width: 260,
                    margin: 1
                }}
                variant="classic"
            />
            <Button
                id='submit'
                onClick={() => search(inputRef.current?.value)
                }
                size="medium"
                variant="secondary"

                sx={{
                    marginRight: 1,
                    maxHeight: '26px',
                    alignSelf: 'center'
                }}
            >
                Search
            </Button>

            {weatherData && (
                <>
                    <Box variant='sunken' sx={{
                        padding: 1,
                        margin: 1,
                        background: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Text variant='h1'>{weatherData.location}</Text>
                        <Text variant='h1'>{weatherData.temperature}°C</Text>
                        <Text variant='h2'>{weatherData.conditions}</Text>
                        <Text variant='h3'>Feels like: {weatherData.feelsLike}°C</Text>
                        <Text variant='h3'>Humidity: {weatherData.humidity}%</Text>
                    </Box>
                </>
            )}

            <Marquee
                color="#000000"
                gap="2rem"
                size="medium"
                speed="20s"
            >
                A retro way to check the weather wherever you are!
            </Marquee>
        </Card>
    );
}
