export type WeatherData = {
    conditions: string;
    temperature: number;
    feelsLike: number;
    location: string;
    humidity: number;
}

export type WeatherDataMultiple = {
    location: string,
    result: WeatherData,
}

export const search = async (location: string): Promise<WeatherData | null | string> => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const response = await fetch(url);

        if (response.status === 404) {
            return `Could not find a location called '${location}'.`;
        }

        if (response.status !== 200) {
            return null;
        }
        const data = await response.json();

        return {
            conditions: data.weather[0].main,
            temperature: Math.floor(data.main.temp),
            feelsLike: Math.floor(data.main.feels_like),
            location: data.name,
            humidity: Math.floor(data.main.humidity),
        };
    } catch {
        return null;
    }
}

export const searchMultiple = async (locations: string[]): Promise<WeatherDataMultiple[]> => {
    const results: WeatherDataMultiple[] = [];

    // We don't have control over the backend so this is the only bulk free call available.
    for await (const location of locations) {
        const result = await search(location);

        if (result !== null && typeof result !== 'string') {
            results.push({ location, result });
        }
    }

    return results;
}