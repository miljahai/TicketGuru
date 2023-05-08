import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";
import { useState } from "react";
import { useUser } from '../util/UserProvider';
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import 'dayjs/locale/fi';

function EditEvent(props) {
    const user = useUser();
    const [open, setOpen] = useState(false);

    const [event, setEvent] = useState({
        eventrecord_name: props.eventrecord.eventrecord_name,
        venue: props.eventrecord.venue,
        city: props.eventrecord.city,
        event_starttime: dayjs(props.eventrecord.event_starttime),
        event_endtime: dayjs(props.eventrecord.event_starttime),
        ticketsmax: props.eventrecord.ticketsmax,
    });
    const eventId = props.eventrecord.eventrecord_id;
    const [message, setMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const change = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
        setMessage('');
    };

    const [selectedStartDate, setSelectedStartDate] = useState(event.event_starttime);
    const [selectedEndDate, setSelectedEndDate] = useState(event.event_endtime);


    const update = async (eventId) => {

        const formData = {
            eventrecord_name: event.eventrecord_name,
            venue: event.venue,
            city: event.city,
            event_starttime: selectedStartDate.toISOString(),
            event_endtime: selectedEndDate.toISOString(),
            ticketsmax: event.ticketsmax,
        }

        try {
            await axios.put(`http://localhost:8080/events/${eventId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
            setOpen(false);
            setMessage('Tapahtuma päivitetty');
            window.location.reload();

        } catch (error) {
            setEvent({
                eventrecord_name: props.eventrecord.eventrecord_name,
                venue: props.eventrecord.venue,
                city: props.eventrecord.city,
                event_starttime: dayjs(props.eventrecord.event_starttime),
                event_endtime: dayjs(props.eventrecord.event_starttime),
                ticketsmax: props.eventrecord.ticketsmax,
            });
            setMessage('Tapahtuman päivittäminen ei onnistunut');
        }
    }

    return (
        <Box component="span" sx={{ p: 1 }}>
            <Box component="span" sx={{ p: 1 }}>
                <Button onClick={handleClickOpen} variant="contained" startIcon={<CreateIcon />}>Muokkaa tapahtumaa</Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Muokkaa tapahtumaa</DialogTitle>
                <DialogContent>
                    <TextField label='Tapahtuman nimi' name="eventrecord_name" value={event.eventrecord_name}
                        onChange={e => change(e)} required fullWidth sx={{ mt: 1, mb: 1 }} />

                    <TextField label='Tapahtumapaikka' name="venue" value={event.venue}
                        onChange={e => change(e)} fullWidth sx={{ mt: 1, mb: 1 }} />

                    <TextField label='Tapahtumakaupunki' name="city" value={event.city}
                        onChange={e => change(e)} fullWidth sx={{ mt: 1, mb: 1 }} />

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi' >
                        <DateTimePicker label='Alkamisaika' name="event_starttime" value={event.event_starttime}
                            onChange={e => setSelectedStartDate(e)} required fullWidth sx={{ mt: 1, mb: 1 }} />

                        <DateTimePicker label='Päättymisaika' name="event_endtime" value={event.event_endtime}
                            onChange={e => setSelectedEndDate(e)} required fullWidth sx={{ mt: 1, mb: 1 }} />
                    </LocalizationProvider>

                    <TextField label="Lippujen enimmäismäärä" name="ticketsmax" value={event.ticketsmax}
                        onChange={(e) => change(e)} fullWidth sx={{ mt: 1, mb: 1 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => update(eventId)}>Tallenna</Button>
                    <Button onClick={handleClose}>Peruuta</Button>
                </DialogActions>
                <Typography sx={{ m: 2 }}>{message}</Typography>
            </Dialog>
        </Box>
    );
}

export default EditEvent;