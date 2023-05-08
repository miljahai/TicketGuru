import { Box, Paper, TextField, Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import Sivupalkki from "./Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../util/UserProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import jwt_decode from "jwt-decode";
import 'dayjs/locale/fi';


function LisaaTapahtuma() {
    const user = useUser();
    const [roles, setRoles] = useState([]);
    const [event, setEvent] = useState({
        eventrecord_name: '',
        venue: '',
        city: '',
        event_starttime: '',
        event_endtime: '',
        ticketsmax: '',
    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
        setViesti('');
    };


    useEffect(() => {
        if (user && user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            setRoles(decodedJwt.authorities);
        }
    }, [user, user.jwt]);

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const config = {
        headers: {
            'Authorization': `Bearer ${user.jwt}`
        }
    }

    const lisaa = async (e) => {
        e.preventDefault();

        const formData = {
            eventrecord_name: event.eventrecord_name,
            venue: event.venue,
            city: event.city,
            event_starttime: selectedStartDate.toISOString(),
            event_endtime: selectedEndDate.toISOString(),
            ticketsmax: event.ticketsmax,
        }

        try {
            await axios.post('http://localhost:8080/events', formData, config);
            setEvent({
                eventrecord_name: '',
                venue: '',
                city: '',
                event_starttime: '',
                event_endtime: '',
                ticketsmax: '',
            });
            setViesti('Tapahtuma lisätty');

        } catch (error) {
            setEvent({
                eventrecord_name: '',
                venue: '',
                city: '',
                event_starttime: '',
                event_endtime: '',
                ticketsmax: '',
            });
            setViesti('Tietojen lisääminen ei onnistunut');
        }
    };

    return (
        <Container>
            <Box component="span" sx={{ p: 2 }}>
                <AppBar position='static' sx={{ borderRadius: '15px 50px' }}>
                    <Toolbar>
                        {<Sivupalkki />}
                        <Typography component={Link} to="/" sx={{ flexGrow: 1, textAlign: 'center' }} variant="h1">TicketGuru</Typography>
                    </Toolbar>
                </AppBar>
                <Outlet />
                <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>Lisää tapahtuma</Typography>
                <Button component={Link} to="../tapahtumat" endIcon={<ArticleIcon />} color='primary' >Tapahtumat</Button>
                {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                    <>
                        <Button component={Link} to="../tapahtumanlisays" variant='outlined' endIcon={<AddIcon />} >Lisää tapahtuma</Button>
                    </>
                ) : (
                    <></>
                )}
            </Box>
            <Button component={Link} to='../lipputyypit' endIcon={<EditIcon />}  >Lipputyypit</Button>
            <Paper>
                <Box
                    component='form'>
                    <TextField label='Tapahtuman nimi' name="eventrecord_name" value={event.eventrecord_name}
                        onChange={(e) => muuta(e)} required fullWidth />

                    <TextField label='Tapahtumapaikka' name="venue" value={event.venue}
                        onChange={(e) => muuta(e)} fullWidth />

                    <TextField label='Tapahtumakaupunki' name="city" value={event.city}
                        onChange={(e) => muuta(e)} fullWidth />
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
                    <DateTimePicker label='Alkamisaika' name="event_starttime" value={event.event_starttime}
                        onChange={(e) => setSelectedStartDate(e)} required fullWidth format="DD.MM.YYYY HH:mm" />

                    <DateTimePicker label= 'Päättymisaika' name="event_endtime" value={event.event_endtime}
                        onChange={(e) => setSelectedEndDate(e)} required fullWidth  format="DD.MM.YYYY HH:mm"/>
                    </LocalizationProvider>
                    
                    <TextField label ="Lippujen enimmäismäärä" name="ticketsmax" value={event.ticketsmax} onChange={(e) => muuta(e)} fullWidth />

                    <Button onClick={(e) => lisaa(e)}>Tallenna</Button>

                </Box>
                <Typography>{viesti}</Typography>
            </Paper>
        </Container>
    )
}

export default LisaaTapahtuma;