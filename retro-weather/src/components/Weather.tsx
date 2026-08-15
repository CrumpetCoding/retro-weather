import { Card, Text, Input, Button, LayoutHeader } from 'retro-react';

export default function Weather() {

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
                <Text sx={{ color: 'white', fontWeight: 'bold' }}>Weather App</Text>
            </LayoutHeader>
            <Input
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
                onClick={function noRefCheck() { }}
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
            <Text variant="paragraph" sx={{ margin: 1 }}>
                A retro way to find the weather wherever you are.
            </Text>
        </Card>
    );
}
