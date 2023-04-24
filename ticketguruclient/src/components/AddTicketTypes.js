import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Autocomplete } from '@mui/material'
import { Add } from '@mui/icons-material';

export default function AddTicketTypes(props) {

    const [events, setEvents] = useState({});
    const [selectedEvent, setSelectedEvent] = useState({ id: '', name: '' })
    const [open, setOpen] = useState(false);
    const [tickettype, setTickettype] = useState({
        name: '', price: '', eventrecord_id: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setTickettype({})
        setOpen(false);
    };
    const handleInputChange = (event) => {
        setTickettype({ ...tickettype, [event.target.name]: event.target.value })
        //console.log(tickettype)
    };
    const addTickettype = () => {
        const tickettypetosent = {
            name: tickettype.name,
            price: tickettype.price,
            eventRecord: { eventrecord_id: tickettype.eventrecord_id }
        }
        console.log(tickettypetosent);
        props.saveTickettype(tickettypetosent);
        handleClose();
        setTickettype({ eventrecord_name: '', name: '', price: '', eventrecord_id: 0 })
    }

    // Configuration for event selector
    //
    // get events:
    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/events', {
                headers: {
                    'Authorization': `Bearer ${props.user.jwt}`
                }
            })
        ]).then(([response]) => {
            console.log('Events fetched:', response.data);
            setEvents(response.data);
        }).catch(error => {
            console.log('Error fetching events: ', error);
        });
    }, [props.user.jwt]);



    return (
        <span>
            <Button variant="contained" sx={{ m: 1 }} onClick={handleClickOpen}>
                <Add />Lisää lipputyyppi
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Lisää uusi lipputtyypi</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        sx={{ margin: 'dense' }}
                        options={Object.values(events).map((event) => event)}
                        getOptionLabel={(option) => option.eventrecord_name || ''}
                        renderInput={(params) => <TextField {...params} label="Tapahtuma" />}
                        value={selectedEvent.eventrecord_name}
                        freeSolo={true}
                        name='eventrecord_name'
                        onChange={(event, value) => {
                            setSelectedEvent(value);
                            setTickettype({ ...tickettype, eventrecord_id: value.eventrecord_id });
                        }}
                    />
                    <TextField
                        margin='dense'
                        name='name'
                        value={tickettype.ticket_type_name}
                        label='Lipputyypin nimi'
                        onChange={(e, newValue) => handleInputChange(e)}
                        fullWidth
                        variant='standard'
                        required
                    />
                    <TextField
                        margin='dense'
                        name='price'
                        value={tickettype.price}
                        label='Hinta'
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant='standard'
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addTickettype}>Lisää lipputyyppi</Button>
                    <Button onClick={handleClose}>Peruuta</Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}