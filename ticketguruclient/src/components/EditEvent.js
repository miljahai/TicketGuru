import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";
import { useState } from "react";
import { useUser } from '../util/UserProvider';
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from 'moment-timezone';
import 'moment/locale/fi';


function EditEvent(props) {
    const user = useUser();
    const [open, setOpen] = useState(false);

    // Sets the initial state of the event object to the values passed in through props
    // and converts the start and end times to local time using Moment.js
    const [event, setEvent] = useState({
        eventrecord_name: props.eventrecord.eventrecord_name,
        venue: props.eventrecord.venue,
        city: props.eventrecord.city,
        event_starttime: moment.utc(props.eventrecord.event_starttime).local(),
        event_endtime: moment.utc(props.eventrecord.event_endtime).local(),
        ticketsmax: props.eventrecord.ticketsmax,
    });

    // Extracts the event ID from the props
    const eventId = props.eventrecord.eventrecord_id;
    const [message, setMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // Updates the event object when a field is changed
    const change = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
        setMessage('');
    };
    // Initializes the start and end times to the values in the event object
    const [selectedStartDate, setSelectedStartDate] = useState(event.event_starttime);
    const [selectedEndDate, setSelectedEndDate] = useState(event.event_endtime);

    // Updates the event in the database
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
             // Closes the dialog, displays a success message, and reloads the page
            setOpen(false);
            setMessage('Tapahtuma päivitetty');
            window.location.reload();

        } catch (error) {
            // If the update fails, resets the event object to its original values and displays an error message
            setEvent({
                eventrecord_name: props.eventrecord.eventrecord_name,
                venue: props.eventrecord.venue,
                city: props.eventrecord.city,
                event_starttime: moment.utc(props.eventrecord.event_starttime).local(),
                event_endtime: moment.utc(props.eventrecord.event_starttime).local(),
                ticketsmax: props.eventrecord.ticketsmax,
            });
            setMessage('Tapahtuman päivittäminen ei onnistunut');
        }
    }
    // Renders the dialog with input fields for the event information and buttons to save or cancel changes
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

                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='fi' >
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