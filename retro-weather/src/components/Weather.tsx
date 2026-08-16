import { useEffect, useRef, useState } from 'react';
import { Card, Text, Input, Button, LayoutHeader, Marquee } from 'retro-react';

export default function Weather() {

    const [weatherData, setWeatherData] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name
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
                onClick={() => search(inputRef.current?.value)}
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
