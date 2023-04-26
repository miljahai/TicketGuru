import { Box, Typography, AppBar, Toolbar, Container, Select, MenuItem, Button, TextField, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { Person, Add, Remove } from '@mui/icons-material';
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from './UserProvider';
import axios from "axios";
import dayjs from 'dayjs'
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

function Liput() {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState(null);
    const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);
    const [ticketTypeArray, setTicketTypeArray] = useState([]);
    const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [newTickets, setNewTickets] = useState({});
    const user = useUser();
    const dayjs = require('dayjs')

    // Constants for Ticket table
    // Calculate tax for selected tickets
    const TAX_RATE = 0.1
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    // Calculate total price of selected tickets
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;


    useEffect(() => {
        // Fetch events and tickettypes from server
        // Tickettypes with eventRecord == null are filtered to avoid fatal errors
        // Todo: filter events with enddate in the past
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
            console.log('Ticket types fetched:', ttResponse.data.filter(tt => tt.eventRecord != null));
            setEvents(eventsResponse.data);
            setTicketTypes(ttResponse.data.filter(tt => tt.eventRecord != null));
        }).catch(error => {
            console.log('Error fetching events and/or tickettypes:', error);
        });
    }, [user.jwt]);


    function handleAddTicket(id) {
        // Add a chosen ticket_type_id to the ticketTypeArray, which will add it to the Ticket cart
        setTicketTypeArray([...ticketTypeArray, id])
        const addTtById = ticketTypes.filter((tt) => tt.ticket_type_id === id)
        setSelectedTicketTypes([...selectedTicketTypes, addTtById])
        setInvoiceSubtotal(invoiceSubtotal + Number(addTtById[0].price))
    };


    function handleRemoveTicket(id) {
        // Remove chosen ticket_type_id from ticketTypeArray, which will remove it from Ticket cart
        const index = ticketTypeArray.lastIndexOf(Number(id));
        if (index !== -1) {
            const newIdArray = [...ticketTypeArray];
            newIdArray.splice(index, 1);
            setTicketTypeArray(newIdArray);
        };

        // remove last occurrence of ticket type with matching ID from selectedTicketTypes
        let subtract = 0;
        const lastIndex = selectedTicketTypes.findLastIndex((tt) => {
            subtract = tt[0].price
            return Number(tt[0].ticket_type_id) === Number(id);
        });
        if (lastIndex !== -1) {
            const newSelectedTicketTypes = [...selectedTicketTypes];
            newSelectedTicketTypes.splice(lastIndex, 1);
            setSelectedTicketTypes(newSelectedTicketTypes);
        }
        const checkSubTotal = (invoiceSubtotal - Number(subtract)) < 0 ? 0 : (invoiceSubtotal - Number(subtract));
        setInvoiceSubtotal(checkSubTotal);
    };

    const handleSelect = (value) => {
        // Select Event
        const selected = events.find((event) => event.eventrecord_id === parseInt(value));
        setSelectedEvent(selected);
    };

    const handleSubmit = (props) => {
        // Create a Salesevent and then create Tickets by looping selectedTicketTypes

        // Build body for SalesEvent call
        // Todo: user id and user role
        setFinalPrice(invoiceTotal);
        const saleseventbody = {
            sale_date: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
            deleted: false,
            final_price: finalPrice,
            appUser: { appuser_id: 1, userrole: "ADMIN" }
        };

        // Call POST /salesevents to create SalesEvent
        // After creating Salesevent, start looping TicketTypes and creating Tickets:
        //      Build body for Ticket call
        //      Create Tickets by calling POST /tickets
        axios.post(`http://localhost:8080/salesevents`, saleseventbody,
            {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            }).then((response) => {
                console.log('SalesEvent created: ', response.data);
                const selectedSalesEvent = response.data.salesevent_id
                {
                    selectedTicketTypes.map((tt) => {

                        const ticketbody = {
                            ticketType: { ticket_type_id: tt[0].ticket_type_id },
                            salesEvent: { salesevent_id: selectedSalesEvent }
                        };
                        axios.post(`http://localhost:8080/tickets`, ticketbody,
                            {
                                headers: {
                                    'Authorization': `Bearer ${user.jwt}`
                                }
                            }).then((ticketresponse) => {
                                console.log('Ticket created: ', ticketresponse.data);
                                const add = {
                                    code: ticketresponse.data.code,
                                    price: ticketresponse.data.price,
                                    ticketType: ticketresponse.data.ticketType,
                                    salesEvent: ticketresponse.data.salesEvent
                                }
                                setNewTickets({ ...newTickets, [ticketresponse.data.ticket_id]: add });
                            }).catch((ticketerror) => {
                                console.log('Error creating Ticket: ', ticketerror)
                            })
                    })
                }
            }).catch((error) => {
                console.log('Error creating SalesEvent: ', error)
            })
    };

    const reset = () => {
        console.log('reseting...')
        setSelectedEvent(null);
        setSelectedTicketTypes([]);
        setTicketTypeArray([]);
        setInvoiceSubtotal(0);
        setFinalPrice(0);
        setNewTickets('');
    }

    const generatePdf = () => {
        console.log('generating pdf...')
    }


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
                            sx={{ flexGrow: 1, textAlign: "center" }}
                            variant="h1">
                            TicketGuru
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Outlet />
                <Typography
                    variant="h2"
                    sx={{ p: 2, flexGrow: 1, textAlign: "center" }}>
                    Lipunmyynti
                </Typography>
            </Box>

            <Box>
                <Box>
                    <Typography variant="h4">Valitse tapahtuma:</Typography>
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
                        <Box>
                            <Typography variant='h4'>{selectedEvent.eventrecord_name}</Typography>
                            <Typography>Sijainti: {selectedEvent.venue}, {selectedEvent.city}</Typography>
                            <Typography>Alkaa: {dayjs(selectedEvent.event_starttime).format('DD.M.YYYY HH:mm')}</Typography>
                            <Typography>Päättyy: {dayjs(selectedEvent.event_endtime).format('DD.M.YYYY HH:mm')}</Typography>
                            <Typography>Lippuja myynnissä: {selectedEvent.ticketsmax}</Typography>
                        </Box>
                    )}
                </Box>


                {selectedEvent && ticketTypes && (
                    <Box component="span" sx={{
                        p: 2
                    }}>
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
                        <Box hidden>
                            <Typography>array: {ticketTypeArray}</Typography>
                            <Typography>summa: {invoiceSubtotal}</Typography>
                            <Typography>Tähän lista lipuista hintoineen</Typography>
                        </Box>

                        <Box class='ticketlist'>
                            <Typography variant="h4">Liput:</Typography>
                            {selectedTicketTypes?.length ?
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 400 }} aria-label='tickets to buy'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Tapahtuma</TableCell>
                                                <TableCell>Lippu</TableCell>
                                                <TableCell>Hinta</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedTicketTypes.map((tt) => (
                                                (() => {
                                                    return (
                                                        <TableRow
                                                            key={tt[0].ticket_type_id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component='th' scope='row'>
                                                                {JSON.stringify(tt[0].eventRecord.eventrecord_name).replace(/['"]+/g, '')}
                                                            </TableCell>
                                                            <TableCell align='left'>{tt[0].name}</TableCell>
                                                            <TableCell align='left'>{tt[0].price} €</TableCell>
                                                        </TableRow>
                                                    );
                                                })()
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={3}></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell rowSpan={3} />
                                                <TableCell>Yhteensä:</TableCell>
                                                <TableCell>{invoiceSubtotal} €</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Lipunmyyntivero 10%:</TableCell>
                                                <TableCell>{invoiceTaxes} €</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Kokokonaissumma:</TableCell>
                                                <TableCell>{invoiceTotal} €</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                                : <></>
                            }
                        </Box>

                        <Typography>Muuta lopullista hintaa: //ei toimi vielä</Typography>
                        <TextField
                            variant='outlined'
                            sx={{ p: '2' }}
                            value={Number(invoiceTotal)}
                            type='number'
                            onChange={v => setFinalPrice(v)} // kesken
                        >
                            Kokonaishinta
                        </TextField>
                        <Box>
                            <Button
                                variant='contained'
                                onClick={() => handleSubmit({ selectedTicketTypes, finalPrice, selectedEvent, user })}
                                sx={{ m: 1 }}
                            >
                                Vahvista myyntitapahtuma
                            </Button>
                            <Button
                                color='error'
                                variant='contained'
                                onClick={reset}
                                sx={{ m: 1 }}
                            >
                                Peruuta
                            </Button>
                        </Box>
                        {newTickets && (
                            <Box>
                                <Typography>Tähän lista luoduista lipuista, klikkaamalla aukeaa Dialog-jossa yksi lippu.</Typography>
                                <Box>
                                    {Object.keys(newTickets).map((ticket) => (
                                        <Typography>{ticket.code}</Typography>
                                    ))}
                                </Box>

                                <Box>
                                    <Button variant='contained' onClick={generatePdf}>
                                        Generoi PDF
                                    </Button>
                                    <Typography>Napilla  voi generoida pdf:n, jossa kaikki generoidut liput:</Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Container >
    );
};

export default Liput;