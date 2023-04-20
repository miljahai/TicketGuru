import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

function Events (props) {
    return (
        <Box>
            {
                props.events.map(event => {
                    return (
                        <Card key={event.eventrecord_id}>
                            <CardHeader title= {event.eventrecord_name}/>
                            <CardContent>
                                <Typography>Paikka: {event.venue}</Typography>
                                <Typography>Kaupunki: {event.city}</Typography>
                                <Typography>Aloitusaika: {(new Date(event.event_starttime)).toLocaleString()}</Typography>
                                <Typography>Lopetusaika: {(new Date(event.event_endtime)).toLocaleString()}</Typography>
                                <Typography>Lippujen enimmäismäärä: {event.ticketsmax}</Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Box>
    )
}
export default Events;