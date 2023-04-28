import { Box, Typography, AppBar, Toolbar, Container, Select, MenuItem, Button, TextField, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { ArticleOutlined, Cancel, AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material';
import Sivupalkki from "./components/Sivupalkki";
import ShowTicket from "./components/ShowTicket"
import SoldTickets from "./components/SoldTickets";
import CreateTickets from "./components/CreateTickets"
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from './UserProvider';
import axios from "axios";
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
    const [tickets, setTickets] = useState(null);
    const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);
    const [ticketTypeArray, setTicketTypeArray] = useState([]);
    const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [newTickets, setNewTickets] = useState([]);
    const user = useUser();
    const dayjs = require('dayjs')

    // Constants for Ticket table
    // Calculate tax for selected tickets
    const TAX_RATE = 0.1;
    const SERVICE_PAYMENT = invoiceSubtotal == 0 ? 0 : 5;
    const SERVICE_TAX = SERVICE_PAYMENT * 0.24;
    const SERVICE_PAYMENT_WO_TAX = 5 - SERVICE_TAX;
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    // Calculate total price of selected tickets
    const invoiceTotal = invoiceTaxes + invoiceSubtotal + SERVICE_PAYMENT;


    useEffect(() => {
        // Fetch events and tickettypes from server
        // Tickettypes with eventRecord == null are filtered to avoid fatal errors
        // TODO: filter events with enddate in the past
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


    const handleSelect = (value) => {
        // Select Event for salesevent from dropdown
        const selected = events.find((event) => event.eventrecord_id === parseInt(value));
        setSelectedEvent(selected);
    };


    function handleAddTicket(id) {
        // Handle situations where a tickettype is added to the salesevent
        // Add a chosen ticket_type_id to the ticketTypeArray, which will add it to the Tickettype list counters
        setTicketTypeArray([...ticketTypeArray, id])
        // Add a chosen TicketType to the selectedTicketTypes array, which will add it to TicketTypes list
        const addTtById = ticketTypes.filter((tt) => tt.ticket_type_id === id)
        setSelectedTicketTypes([...selectedTicketTypes, addTtById])
        // Add price of added ticket to invoice subtotal
        setInvoiceSubtotal(invoiceSubtotal + Number(addTtById[0].price))
    };

    function handleRemoveTicket(id) {
        // Handle situations where a tickettype is removed from the salesevent
        // Remove chosen ticket_type_id from ticketTypeArray, which will remove it from Tickettype list counters
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
        // Subtract price of removed tickettype from invoice subtotal
        // TODO: Check that selected ticket_type_id is in the array to avoid subtracting missing tickettypes 
        const checkSubTotal = (invoiceSubtotal - Number(subtract)) < 0 ? 0 : (invoiceSubtotal - Number(subtract));
        setInvoiceSubtotal(checkSubTotal);
    };


    const handleFinalPriceChange = (event) => {
        // Change final price when it changes in client
        setFinalPrice(event.target.value);
    };
    useEffect(() => {
        // Set Finalprice to invoiceTotal
        // Makes invoiceTotal the default value of final price field
        setFinalPrice(invoiceTotal);
    }, [invoiceTotal]);


    const reset = () => {
        // Restart salesevent. Set constants to starting states
        console.log('reseting...')
        setSelectedEvent(null);
        setSelectedTicketTypes([]);
        setTicketTypeArray([]);
        setInvoiceSubtotal(0);
        setFinalPrice(0);
        setNewTickets([]);
        setTickets(null)
    }


    const generatePdf = () => {
        // TODO: create a pdf file of the completed salesevent. List all tickets. Use <ShowTicket>.
        console.log('generating pdf...')
    }




    return (
        <Container>
            <Box id='header' component="span" sx={{ p: 2 }}>
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



            <Box id='ticketsales'>
                <Container id='eventselect' sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: 600 }}>
                        <Typography variant="h4">Valitse tapahtuma:</Typography>
                        <Select
                            label=""
                            defaultValue='valitse tapahtuma'
                            value={selectedEvent
                                ? selectedEvent.eventrecord_id
                                : null}
                            onChange={(e) => handleSelect(e.target.value)}
                            sx={{ mt: 2, width: '70%' }}
                        >
                            {events.map((event) => (
                                <MenuItem key={event.eventrecord_id} value={event.eventrecord_id}>
                                    {event.eventrecord_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>


                    {selectedEvent && (
                        <Box id='eventinfo' sx={{}}>
                            <Typography variant='h4'>{selectedEvent.eventrecord_name}</Typography>
                            <Typography>Sijainti: {selectedEvent.venue}, {selectedEvent.city}</Typography>
                            <Typography>Alkaa: {dayjs(selectedEvent.event_starttime).format('DD.M.YYYY HH:mm')}</Typography>
                            <Typography>Päättyy: {dayjs(selectedEvent.event_endtime).format('DD.M.YYYY HH:mm')}</Typography>
                            <Typography>Lippuja myynnissä: {selectedEvent.ticketsmax}</Typography>
                        </Box>
                    )}
                </Container>


                {
                    selectedEvent && ticketTypes && (
                        <Box id='tickettypesselect' component="span" sx={{
                            p: 2
                        }}>
                            <Typography variant="h4">Lipputyyppit:</Typography>
                            <List sx={{}}>
                                {ticketTypes.filter((tt) => tt.eventRecord.eventrecord_id === selectedEvent.eventrecord_id).map((tt) => (
                                    <ListItem sx={{ gridAutoColumns: '1fr', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }} key={tt.ticket_type_id} value={tt.ticket_type_id}>
                                        <ListItemText sx={{ gridColumn: '1', colSpan: 3 }}>
                                            {tt.name}
                                        </ListItemText>
                                        <ListItemText sx={{ gridColumn: '3', colSpan: 2 }}>
                                            {tt.price.toFixed(2)} €
                                        </ListItemText>
                                        <ListItemButton alignItems='center' sx={{ gridColumn: '4' }} onClick={() => handleAddTicket(tt.ticket_type_id)} ><AddCircleOutlineOutlined /></ListItemButton>
                                        <ListItemText alignItems='center' sx={{ gridColumn: '5' }}>{(ticketTypeArray.filter((counter) => counter === tt.ticket_type_id)).length}</ListItemText>
                                        <ListItemButton alignItems='center' sx={{ gridColumn: '6' }} onClick={() => handleRemoveTicket(tt.ticket_type_id)} ><RemoveCircleOutlineOutlined /></ListItemButton>
                                    </ListItem>
                                ))}
                            </List>


                            <Box id='invoice'>
                                <Typography variant="h4" sx={{ pt: 4 }}>Liput:</Typography>
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
                                                                <TableCell align='left'>{tt[0].price.toFixed(2)} €</TableCell>
                                                            </TableRow>
                                                        );
                                                    })()
                                                ))}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={5}></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell rowSpan={4} />
                                                    <TableCell>Yhteensä (alv0):</TableCell>
                                                    <TableCell>{invoiceSubtotal.toFixed(2)} €</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Lipunmyyntivero 10%:</TableCell>
                                                    <TableCell>{invoiceTaxes.toFixed(2)} €</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Palvelumaksu (alv0):</TableCell>
                                                    <TableCell>{SERVICE_PAYMENT_WO_TAX.toFixed(2)} €</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Arvonlisävero 24%:</TableCell>
                                                    <TableCell>{SERVICE_TAX.toFixed(2)} €</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell rowSpan={1} />
                                                    <TableCell>Kokokonaissumma:</TableCell>
                                                    <TableCell>{invoiceTotal.toFixed(2)} €</TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                    : <></>
                                }
                            </Box>

                            <Box id='finishsale'>
                                <TextField
                                    label="Hinta"
                                    type="number"
                                    defaultValue={invoiceTotal}
                                    value={finalPrice}
                                    onChange={handleFinalPriceChange}
                                    sx={{ mt: 3 }}
                                    disabled={invoiceSubtotal == 0 || tickets}
                                />
                                <CreateTickets
                                    invoiceTotal={finalPrice}
                                    selectedTicketTypes={selectedTicketTypes}
                                    selectedEvent={selectedEvent}
                                    setTickets={setTickets}
                                    setNewTickets={setNewTickets}
                                />
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    onClick={reset}
                                    sx={{ m: 1 }}
                                >
                                    <Cancel /> <Typography sx={{ pl: 1 }}>{newTickets.length > 0 ? 'Uusi myyntitapahtuma' : 'Peruuta'}</Typography>
                                </Button>
                            </Box>

                            {newTickets.length > 0 && (
                                <Box if='finishedsale'>
                                    <Typography variant='h4' sx={{ pt: 4 }}>Myydyt liput</Typography>
                                    <Box>
                                        <Typography>Kokonaishinta {Number(finalPrice).toFixed(2)} €</Typography>
                                        <SoldTickets tickets={tickets}
                                        />

                                    </Box>

                                    <Box sx={{}} hidden>
                                        <Button
                                            sx={{ p: '2' }}
                                            variant='contained'
                                            color='info'
                                            onClick={generatePdf}
                                        >
                                            <ArticleOutlined /> <Typography sx={{ pl: 1 }}>Luo PDF</Typography>
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )
                }
            </Box >
        </Container >
    );
};

export default Liput;