import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState, } from "react";
import { useUser } from '../util/UserProvider';
import jwt_decode from "jwt-decode";
import 'dayjs/locale/fi';
import EditEvent from "./EditEvent";


function Events(props) {
  const user = useUser();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
      if (user && user.jwt) {
          const decodedJwt = jwt_decode(user.jwt);
          setRoles(decodedJwt.authorities);
      }
  }, [user, user.jwt]);

  const config = {
      headers: {
          'Authorization': `Bearer ${user.jwt}`
      }
  }

 const deleteEvent = (e, eventId) => {
      e.preventDefault();
      axios.delete(`http://localhost:8080/events/${eventId}`, config)
          .then(response => {
              console.log(response);
              window.location.reload();
          })
          .catch(error => {
              console.error(error);
          });
  }

/*
    const deleteEvent = (e, eventId) => {
        e.preventDefault();

        axios.delete(`https://cen-cenru4.azurewebsites.net/events/${eventId}`, config)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }
    */

    return (
        <Box>
            {
                props.events.map(event => {
                    return (
                        <Card key={event.eventrecord_id}>
                            <CardHeader title={event.eventrecord_name} />
                            <CardContent>
                                <Typography>Paikka: {event.venue}</Typography>
                                <Typography>Kaupunki: {event.city}</Typography>
                                <Typography>Aloitusaika: {(new Date(event.event_starttime)).toLocaleString()}</Typography>
                                <Typography>Lopetusaika: {(new Date(event.event_endtime)).toLocaleString()}</Typography>
                                <Typography>Lippujen enimmäismäärä: {event.ticketsmax}</Typography>
                            </CardContent>
                            {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                                <Box sx={{}}>
                                    <EditEvent eventrecord={event} />
                                    <Button onClick={(e) => deleteEvent(e, event.eventrecord_id)} color="secondary" variant="contained" startIcon={<DeleteIcon />} sx={{ m: 1 }}>Poista tapahtuma</Button>
                                </Box>
                            ) : (
                                <></>
                            )}
                        </Card>
                    )
                })
            }
        </Box>
    )
  return (
    <Box>
      {
        props.events.map(event => {
          return (
            <Card key={event.eventrecord_id}>
              <CardHeader title={event.eventrecord_name} />
              <CardContent>
                <Typography>Paikka: {event.venue}</Typography>
                <Typography>Kaupunki: {event.city}</Typography>
                <Typography>Aloitusaika: {(new Date(event.event_starttime)).toLocaleString()}</Typography>
                <Typography>Lopetusaika: {(new Date(event.event_endtime)).toLocaleString()}</Typography>
                <Typography>Lippuja jäljellä: {event.ticketsmax}</Typography>
              </CardContent>
              {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                <Box sx={{}}>
                    <EditEvent eventrecord={event} />
                    <Button onClick={(e) => deleteEvent(e, event.eventrecord_id)} color="secondary" variant="contained" startIcon={<DeleteIcon />} sx={{ m: 1 }}>Poista tapahtuma</Button>
                </Box>
              ) : (
                <></>
              )}
            </Card>
          )
        })
      }
    </Box>
  )
}

export default Events;