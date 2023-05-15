import { Box, Paper, TextField, Container, Typography, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../util/UserProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers";
import jwt_decode from "jwt-decode";

function AddEvent() {
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
  const [message, setMessage] = useState('');

  const change = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
    setMessage('');
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
  const add = async (e) => {
    e.preventDefault();

    if (!event.eventrecord_name) {
      setMessage('Lisää tapahtumalle nimi.');
      return;
    }
    try {
      const formData = {
        eventrecord_name: event.eventrecord_name,
        venue: event.venue,
        city: event.city,
        event_starttime: selectedStartDate.toISOString(),
        event_endtime: selectedEndDate.toISOString(),
        ticketsmax: event.ticketsmax,
      }
      await axios.post('https://cen-cenru4.azurewebsites.net/events', formData, config);
      setEvent({
        eventrecord_name: '',
        venue: '',
        city: '',
        event_starttime: '',
        event_endtime: '',
        ticketsmax: '',
      });
      setMessage('Tapahtuma lisätty');
    } catch (error) {
      setEvent({
        eventrecord_name: '',
        venue: '',
        city: '',
        event_starttime: '',
        event_endtime: '',
        ticketsmax: '',
      });
      setMessage('Tietojen lisääminen ei onnistunut: ' + error);
    }
  };
  return (
    <Container>
      <Box component="span" sx={{ p: 2 }}>
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
            onChange={(e) => change(e)} required fullWidth />
          <TextField label='Tapahtumapaikka' name="venue" value={event.venue}
            onChange={(e) => change(e)} fullWidth />
          <TextField label='Tapahtumakaupunki' name="city" value={event.city}
            onChange={(e) => change(e)} fullWidth />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker label='Alkamisaika' name="event_starttime" value={event.event_starttime}
              onChange={(e) => setSelectedStartDate(e)} useTimeZone required fullWidth format="DD.MM.YYYY HH:mm" />
            <DateTimePicker label='Päättymisaika' name="event_endtime" value={event.event_endtime}
              onChange={(e) => setSelectedEndDate(e)} useTimeZone required fullWidth format="DD.MM.YYYY HH:mm" />
          </LocalizationProvider>

          <TextField label="Lippujen enimmäismäärä" name="ticketsmax" value={event.ticketsmax} onChange={(e) => change(e)} fullWidth />
          <Button onClick={(e) => add(e)}>Tallenna</Button>
        </Box>
        <Typography>{message}</Typography>
      </Paper>
    </Container>
  )
}

export default AddEvent;