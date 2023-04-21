import {Box, Typography, AppBar, Toolbar, Container} from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import {Link, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import { useUser } from './UserProvider';
import axios from "axios";

function Liput() {

    const [events,
        setEvents] = useState([]);
    const [selectedEvent,
        setSelectedEvent] = useState(null);
    const [ticketTypes,
        setTicketTypes] = useState(null);
    const [selectedTicketType,
        setSelectedTicketType] = useState(null);
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
            console.log('Error fetching events and users:', error);
        });
    }, [user.jwt]);

    const handleTicketTypeSelect = (value) => {
        const selected = ticketTypes.find((tt) => tt.ticket_type_id === parseInt(value));
        setSelectedTicketType(selected);
        setFormData({});
    };

    const handleSelect = (value) => {
        const selected = events.find((event) => event.eventrecord_id === parseInt(value));
        setSelectedEvent(selected);
        setFormData({});
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: parseInt(value)
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(formData);
        const {quantity} = formData;
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
            <Box component="span" sx={{
                p: 2
            }}>
                <AppBar
                    position="static"
                    sx={{
                    borderRadius: "15px 50px"
                }}>
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
                <Outlet/>
                <Typography
                    variant="h2"
                    sx={{
                    p: 2,
                    flexGrow: 1,
                    textAlign: "center"
                }}>
                    Myy lippuja
                </Typography>
            </Box>
            <Box
                sx={{
                display: "flex",
                gap: "16px"
            }}>
                <Box sx={{
                    flex: 1
                }}>
                    <Typography variant="h4">Valitse tapahtuma:</Typography>
                    <select
                        value={selectedEvent
                        ? selectedEvent.eventrecord_id
                        : null}
                        onChange={(e) => handleSelect(e.target.value)}
                        style={{
                        width: "100%"
                    }}>
                        <option value={null}>-- Valitse tapahtuma --</option>
                        {events.map((event) => (
                            <option key={event.eventrecord_id} value={event.eventrecord_id}>
                                {event.eventrecord_name}
                            </option>
                        ))}
                    </select>

                    {selectedEvent && (
                        <div>
                            <h4>{selectedEvent.eventrecord_name}</h4>
                            <p>
                                Sijainti: {selectedEvent.venue}, {selectedEvent.city}
                            </p>
                            <p>Lippuja myynnissä: {selectedEvent.ticketsmax}</p>
                            <p>Alkaa: {selectedEvent.event_starttime}</p>
                            <p>Loppuu: {selectedEvent.event_endtime}</p>
                        </div>
                    )}
                </Box>
                {selectedEvent && ticketTypes && (
                    <Box component="span" sx={{
                        p: 2
                    }}>
                        <Typography variant="h4">Valitse lipputyyppi:</Typography>
                        <select
                            value={selectedTicketType
                            ? selectedTicketType.ticket_type_id
                            : null}
                            onChange={(e) => handleTicketTypeSelect(e.target.value)}
                            style={{
                            width: "100%"
                        }}>
                            <option value={null}>-- Valitse lipputyyppi --</option>
                            {ticketTypes.filter((tt) => tt.eventRecord.eventrecord_id === selectedEvent.eventrecord_id).map((tt) => (
                                <option key={tt.ticket_type_id} value={tt.ticket_type_id}>
                                    {tt.name}
                                    ({tt.price}€)
                                </option>
                            ))}
                        </select>

                        {selectedTicketType && (
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h4">Valitse lippujen määrä:</Typography>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity || ""}
                                    onChange={handleInputChange}
                                    style={{
                                    marginBottom: "16px"
                                }}/>
                                <button type="submit" disabled={!formData.quantity}>Lisää ostoskoriin</button>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </form>
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
                                <button onClick={handleSubmit}>Myy</button>
                            </div>
                        )}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Liput;