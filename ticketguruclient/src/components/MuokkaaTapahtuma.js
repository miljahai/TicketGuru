import { Container, Box, AppBar, Toolbar, Typography, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from '../UserProvider';
import jwt_decode from "jwt-decode";
import Sivupalkki from "./Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/fi';

function MuokkaaTapahtuma({ props }) {
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

        const eventId = props.event.id;

        const [viesti, setViesti] = useState('');

        const config = {
            headers: {
                'Authorization': `Bearer ${user.jwt}`
            }
        }
        
        useEffect(() => {
            if (user && user.jwt) {
                const decodedJwt = jwt_decode(user.jwt);
                setRoles(decodedJwt.authorities);
            }
        }, [user, user.jwt]);  


        useEffect(() => {
            axios.get(`http://localhost:8080/events/${eventId}`, config)
            .then(response => {
                console.log(response.data);
                setEvent(response.data);
            }).catch(error => {
                console.log('Error fetching event: ', error);
            });
        }, [eventId, config]);


        
        const muuta = (e) => {
            setEvent({
                ...event,
                [e.target.name]: e.target.value
            });
            setViesti('');
        };  
      
        const [selectedStartDate, setSelectedStartDate] =useState(null);
        const [selectedEndDate, setSelectedEndDate] = useState(null);

        const update = async (e, eventId) => {
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
                await axios.put(`http://localhost:8080/events/${eventId}`, formData, config);
                setEvent({
                    eventrecord_name: '',
                    venue: '',
                    city: '',
                    event_starttime: '',
                    event_endtime: '',
                    ticketsmax: '',
                });
                setViesti('Tapahtuma päivitetty');
                
            }catch (error) {
                setEvent({
                    eventrecord_name: '',
                    venue: '',
                    city: '',
                    event_starttime: '',
                    event_endtime: '',
                    ticketsmax: '',
                });
                setViesti('Tapahtuman päivittäminen ei onnistunut');
            }
        }


        return (
            <Container>
            <Box component="span" sx={{ p: 2}}>
             <AppBar position='static' sx={{borderRadius: '15px 50px'}}>
                 <Toolbar>                 
                 {<Sivupalkki />}
                     <Typography component={Link} to="/" sx = { {flexGrow:1, textAlign:'center' } }variant="h1">TicketGuru</Typography>
                 </Toolbar>
             </AppBar>
             <Outlet/>
             </Box>
             <Paper>
                 <Box
                     component='form'>
                         <TextField label= 'Tapahtuman nimi' name="eventrecord_name" value={event.eventrecord_name}
                         onChange={(e) => muuta(e)} required fullWidth/>
 
                         <TextField label= 'Tapahtumapaikka' name="venue" value={event.venue}
                         onChange={(e) => muuta(e)} fullWidth/>
 
                         <TextField label= 'Tapahtumakaupunki' name="city" value={event.city}
                         onChange={(e) => muuta(e)} fullWidth/>
 
                         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi' >
                         <DateTimePicker label= 'Alkamisaika' name="event_starttime" value={event.event_starttime}
                         onChange={(e) => setSelectedStartDate(e)} required fullWidth />
 
                         <DateTimePicker label= 'Päättymisaika' name="event_endtime" value={event.event_endtime}
                         onChange={(e) => setSelectedEndDate(e)} required fullWidth />
                         </LocalizationProvider>
 
                         <TextField label="Lippujen enimmäismäärä" name="ticketsmax" value={event.ticketsmax}
                         onChange={(e) => muuta(e)} fullWidth/>
 
                         
                             <Button onClick={(e) => update(e, eventId)}>Tallenna</Button>
                         
                 </Box>
                 <Typography>{viesti}</Typography>
             </Paper>
         </Container>
        );
    } 

    export default MuokkaaTapahtuma;