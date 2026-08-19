import { useRef, useState } from 'react';
import { Card, Text, Input, Button, LayoutHeader, Marquee, Box, Alert } from 'retro-react';
import { search, type WeatherData } from '../api';
import LocationMarquee from './LocationMarquee';

export default function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    let backgroundStyle = 'linear-gradient( #008080, white)';

    if (weatherData?.conditions === 'Clear') {
        backgroundStyle = 'linear-gradient( #87CEEB, white)';
    }
    else if (weatherData?.conditions === 'Rain' || weatherData?.conditions === 'Thunderstorm') {
        backgroundStyle = 'linear-gradient( #808080, white )';
    }
    else if (weatherData?.conditions === 'Clouds' || weatherData?.conditions === 'Drizzle') {
        backgroundStyle = 'linear-gradient( #a0a0a4, white )';
    }

    const submit = async () => {
        setInputError(null);
        setWeatherData(null);

        const searchTerm = inputRef.current?.value;

        if (!searchTerm) {
            setInputError("Please enter a valid city");
            inputRef.current?.focus();
            return;
        }

        const result = await search(searchTerm);

        if (typeof result === "string") {
            setInputError(result);
        } else if (result !== null) {
            setWeatherData(result);
        } else {
            setInputError("Something went wrong...");
        }
    }


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
            <div>
                <Input
                    ref={inputRef}
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
                    onClick={() => submit()}
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
            </div>
            {inputError && (<Alert color="error" title="Error">{inputError}</Alert>)}

            {weatherData && (
                <Box variant='sunken' sx={{
                    backgroundImage: backgroundStyle,
                    padding: 1,
                    margin: 1,
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
            )}

            <Marquee
                color="#000000"
                gap="2rem"
                size="medium"
                speed="20s"
            >
                A retro way to check the weather wherever you are!
            </Marquee>
            <LocationMarquee />
        </Card >
    );
}
