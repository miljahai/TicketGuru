import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import axios from "axios";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

function Events (props) {

    const deleteEvent = async (e) => {
        try {
            await axios.delete('http://localhost:8080/events/{id}');
        }catch (error) {
            return "Poistaminen ei onnistunut";
        }
    }

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
                            <Box>
                                <Button variant="contained" startIcon={<CreateIcon/>}>Muokkaa tapahtumaa</Button>
                                <Button onClick={(e) => deleteEvent(e)} color="secondary" variant="contained" startIcon={<DeleteIcon />}>Poista tapahtuma</Button>
                            </Box>
                        </Card>
                    )
                })
            }
        </Box>
    )
}
export default Events;