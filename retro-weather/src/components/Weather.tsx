import { Card, Text } from 'retro-react';

export default function Weather() {

    return (
        <Card
            alt="Vintage computer setup"
            header="Weather Information"
            image="https://picsum.photos/seed/retro/320/180"
            sx={{
                maxWidth: 360,
                maxHeight: 400,
                margin: 'auto'
            }}
        >
            <Text variant="paragraph">
                A complete retro card with header, image, content, and footer.
            </Text>
        </Card>
    );
}
