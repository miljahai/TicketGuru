import { Box, Typography, AppBar, Toolbar, Container, Select, MenuItem, Button, TextField, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { Person, Add, Remove } from '@mui/icons-material';
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from './UserProvider';
import axios from "axios";
import dayjs from 'dayjs'

function Liput() {

    const [events,
        setEvents] = useState([]);
    const [selectedEvent,
        setSelectedEvent] = useState(null);
    const [ticketTypes,
        setTicketTypes] = useState(null);
    const [selectedTicketType,
        setSelectedTicketType] = useState(null);
    const [ticketTypeArray, setTicketTypeArray] = useState([]);
    const [formData,
        setFormData] = useState({});
    const [ticketQuantities,
        setTicketQuantities] = useState({});
    const [finalPrice,
        setFinalPrice] = useState(0);
    const [errorMessage,
        setErrorMessage] = useState('');
    const [totalQuantity,
        setTotalQuantity] = useState(0);

    const user = useUser();

    const dayjs = require('dayjs')

    // Haetaan Tapahtumat ja Lipputyypit
    // Todo: Suodatetaan pois menneisyydessä olevet tapahtumat
    useEffect(() => {
        console.log('Fetching events and tickettypes...');
        Promise.all([
            axios.get('http://localhost:8080/events', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            }),
            axios.get('http://localhost:8080/tickettypes', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
        ]).then(([eventsResponse, ttResponse]) => {
            console.log('Events fetched:', eventsResponse.data);
            console.log('Ticket types fetched:', ttResponse.data);
            setEvents(eventsResponse.data);
            setTicketTypes(ttResponse.data);
        }).catch(error => {
            console.log('Error fetching events and/or tickettypes:', error);
        });
    }, [user.jwt]);

    function handleAddTicket(id) {
        setTicketTypeArray([...ticketTypeArray, id])
    };

    function handleRemoveTicket(id) {
        const index = ticketTypeArray.indexOf(Number(id));
        console.log(ticketTypeArray.indexOf(Number(id)));
        if (index !== -1) {
            const newArray = [...ticketTypeArray];
            newArray.splice(index, 1);
            setTicketTypeArray(newArray);
        };
        console.log(ticketTypeArray);
    };

    // 
    const handleTicketTypeSelect = (value) => {
        const selected = ticketTypes.find((tt) => tt.ticket_type_id === parseInt(value));
        setSelectedTicketType(selected);
        setFormData({});
    };

    //
    const handleSelect = (value) => {
        const selected = events.find((event) => event.eventrecord_id === parseInt(value));
        setSelectedEvent(selected);
        setFormData({});
    };

    // 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: parseInt(value)
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(formData);
        const { quantity } = formData;
        const price = selectedTicketType.price;
        const ticketFinalPrice = quantity * price;

        if (quantity > selectedEvent.ticketsmax) {
            setErrorMessage(`Cannot purchase more than ${selectedEvent.ticketsmax} tickets per person.`);
            return;
        } else if (quantity < 1) {
            setErrorMessage('Cannot purchase less than 1 ticket.');
            return;
        }

        setFinalPrice(finalPrice + ticketFinalPrice);
        setTotalQuantity(totalQuantity + quantity); // Add quantity to total quantity
        setTicketQuantities({
            ...ticketQuantities,
            [selectedTicketType.ticket_type_id]: quantity
        });

        const data = {
            event_id: selectedEvent.eventrecord_id,
            ticket_type_id: selectedTicketType.ticket_type_id,
            quantity,
            price: selectedTicketType.price,
            total_price: ticketFinalPrice
        };

        const handleFormSubmit = () => {
            event.preventDefault();
            axios
                .post('http://localhost:8080/salesevents', data, {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`
                    }
                })
                .then(response => {
                    console.log('SalesEvent created:', response.data);
                    setFormData({});
                })
                .catch(error => {
                    console.log('Error creating SalesEvent:', error);
                });
        }
    };

    return (
        <Container>
            <Box component="span" sx={{ p: 2 }}>
                <AppBar
                    position="static"
                    sx={{ borderRadius: "15px 50px" }}>
                    <Toolbar>
                        {< Sivupalkki />}
                        <Typography
                            component={Link}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                textAlign: "center"
                            }}
                            variant="h1">
                            TicketGuru
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Outlet />
                <Typography
                    variant="h2"
                    sx={{ p: 2, flexGrow: 1, textAlign: "center" }}>
                    Myy lippuja
                </Typography>
            </Box>

            <Box>
                <Box>
                    {/* 
                    <Typography variant="h4">Valitse tapahtuma:</Typography>
                    */}
                    <Select
                        value={selectedEvent
                            ? selectedEvent.eventrecord_id
                            : null}
                        onChange={(e) => handleSelect(e.target.value)}
                        label="Tapahtuma"
                        sx={{ mt: '10px', width: '50%' }}
                    >
                        {events.map((event) => (
                            <MenuItem key={event.eventrecord_id} value={event.eventrecord_id}>
                                {event.eventrecord_name}
                            </MenuItem>
                        ))}
                    </Select>

                    {selectedEvent && (
                        <div>
                            <h4>{selectedEvent.eventrecord_name}</h4>
                            <p><div>Sijainti: {selectedEvent.venue}, {selectedEvent.city}</div>
                                <div>Alkaa: {dayjs(selectedEvent.event_starttime).format('DD.M.YYYY HH:mm')}</div>
                                <div>Päättyy: {dayjs(selectedEvent.event_endtime).format('DD.M.YYYY HH:mm')}</div></p>
                            <p>Lippuja myynnissä: {selectedEvent.ticketsmax}</p>
                        </div>
                    )}
                </Box>


                {selectedEvent && ticketTypes && (
                    <Box component="span" sx={{
                        p: 2
                    }}>
                        {/** 
                        <Typography variant="h4">Valitse lipputyyppi:</Typography>
                        
                        <Select
                            label='Lipputyyppi'
                            value={selectedTicketType
                                ? selectedTicketType.ticket_type_id
                                : null}
                            onChange={(e) => handleTicketTypeSelect(e.target.value)}
                            sx={{ mt: '10px', width: '100%' }}
                        >
                        */}
                        <Typography variant="h4">Lipputyyppit:</Typography>
                        <List>
                            {ticketTypes.filter((tt) => tt.eventRecord.eventrecord_id === selectedEvent.eventrecord_id).map((tt) => (
                                <ListItem sx={{ gridAutoColumns: '1fr', width: '60%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} key={tt.ticket_type_id} value={tt.ticket_type_id}>
                                    <ListItemText sx={{ gridColumn: '1' }}>
                                        {tt.ticket_type_id} {tt.name} ({tt.price}€)
                                    </ListItemText>
                                    <ListItemButton sx={{ gridColumn: '2' }} onClick={() => handleAddTicket(tt.ticket_type_id)} ><Add /></ListItemButton>
                                    <ListItemText sx={{ gridColumn: '3' }}>{(ticketTypeArray.filter((counter) => counter === tt.ticket_type_id)).length}</ListItemText>
                                    <ListItemButton sx={{ gridColumn: '4' }} onClick={() => handleRemoveTicket(tt.ticket_type_id)} ><Remove /></ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        {/** Alla oleva lista on vain devausta varten, pois lopullisesta */}
                        <Typography>array: {ticketTypeArray}</Typography>
                        <Typography>Tähän lista lipuista hintoineen</Typography>
                        <Typography>Tähän lipuista laskettu finalprice</Typography>
                        <Button>Tähän nappi tms. jolla voi muokata finalpriceä</Button>
                        <Button>Tähän nappi, jolla vahvistetaan myyntitapahtuma. Tämä käynnistää POST SalesEventin ja sitten looppaa yllä olevan id-arrayn ja POSTaa jokaisesta Ticketin</Button>
                        <Button>Tähän peruuta nappi, jolla id-array yms. tyhjennetään.</Button>
                        {/*
                        </Select>
                        * /}

                        {/*
                        {selectedTicketType && (
                            <div>
                                <Typography variant="h4">Valitse lippujen määrä:</Typography>
                                <div>
                                    <TextField
                                        name='tickets'
                                        label='Lippujen lukumäärä'
                                        value={formData.tickets || ""}
                                        onChange={e => handleInputChange(e)}
                                        sx={{ mt: '10px' }}
                                    />
                                </div>
                                <Button onClick={handleSubmit} type="submit" variant='contained' disabled={!formData.tickets}>Lisää ostoskoriin</Button>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>
                        )}

                        {selectedTicketType && (
                            <div>
                                <h4>Valittu lipputyyppi:</h4>
                                <p>{selectedTicketType.name}</p>
                                <p>Hinta: {selectedTicketType.price}
                                    €</p>
                                <h4>Ostoskorissa:</h4>
                                <p>Lopullinen hinta: {finalPrice}
                                    €</p>
                                <Button variant='contained' onClick={handleSubmit}>Myy</Button>
                            </div>
                        )}
                */}
                    </Box>
                )}
            </Box>
        </Container >
    );
};

export default Liput;