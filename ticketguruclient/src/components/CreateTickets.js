import { Typography, Button } from "@mui/material";
import { LibraryAddOutlined } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { useUser } from '../util/UserProvider';
import axios from "axios";

export default function CreateTickets(props) {

    const [newTickets, setNewTickets] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [viesti, setViesti] = useState('')
    const [fetchingTickets, setFetchingTickets] = useState(false);
    const user = useUser();
    const dayjs = require('dayjs')

    const handleSubmit = () => {
        // Create a Salesevent and then create Tickets by looping selectedTicketTypes

        // Build body for SalesEvent call
        //console.log(props.user)
        //setFinalPrice(invoiceTotal);
        console.log('InvoiceTotal: ', props.invoiceTotal)
        const saleseventbody = {
            sale_date: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
            deleted: false,
            final_price: props.invoiceTotal,
            appUser: { appuser_id: user.userInfo.appuser_id, userrole: user.userInfo.userrole }
        };

        // Start tracking the state of fetching tickets
        setFetchingTickets(true);

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

                props.selectedTicketTypes.map((tt) => {
                    let amount = props.selectedTicketTypes.length;
                    const ticketbody = {
                        ticketType: { ticket_type_id: tt[0].ticket_type_id },
                        price: tt[0].price,
                        salesEvent: { salesevent_id: selectedSalesEvent }
                    };
                    return axios.post(`http://localhost:8080/tickets?amount=${amount}`, ticketbody,
                        {
                            headers: {
                                'Authorization': `Bearer ${user.jwt}`
                            }
                        }).then((response) => {
                            console.log('Ticket created: ', response.data);
                            setNewTickets((prevTickets) => [...prevTickets, response.data.ticket_id]);
                        }).catch((error) => {
                            console.log('Error creating Ticket: ', error)
                        });
                });

                setViesti('Myyntitapahtuma suoritettu')
                console.log(newTickets);
                axios.get('http://localhost:8080/tickets', {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`
                    }
                }).then((response) => {
                    console.log('Tickets fetched: ', response.data);
                    setTickets(response.data.filter(ticket => newTickets.includes(ticket.ticket_id)));
                    console.log('New Tickets: ', tickets)
                }).catch((error) => {
                    console.log('Error fetching tickets: ', error);
                });
            }).catch((error) => {
                console.log('Error creating SalesEvent: ', error)
                setViesti('Myyntitapahtuma epäonnistui')
            }).finally(() => setFetchingTickets(false));
    };

    useEffect(() => {
        if (newTickets.length && !fetchingTickets) {
            axios
                .get('http://localhost:8080/tickets', {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                })
                .then((response) => {
                    console.log('Tickets fetched 2: ', response.data);
                    const filteredTickets = response.data.filter((ticket) =>
                        newTickets.includes(ticket.ticket_id)
                    );
                    setTickets(filteredTickets);
                    console.log('New Tickets: ', filteredTickets);
                    props.setNewTickets(newTickets);
                    props.setTickets(filteredTickets);
                    setFetchingTickets(false);
                })
                .catch((error) => {
                    console.log('Error fetching tickets: ', error);
                });
        }
    }, [newTickets, fetchingTickets, user.jwt, props, props.setNewTickets, props.setTickets]);


    useEffect(() => {
        if (tickets.length && !fetchingTickets) {
            props.setTickets(tickets);
        }
    }, [fetchingTickets, props, tickets])

    return (
        <div>
            <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={props.invoiceSubtotal === 0 || tickets.length}
                sx={{ m: 1 }}
            >
                <LibraryAddOutlined />
                <Typography sx={{ pl: 2 }} >Vahvista myyntitapahtuma</Typography>
            </Button>
            <Typography hidden={!viesti} sx={{
                background: '#eeeeee',
                p: 1, width: 1 / 4
            }}>
                {viesti}
            </Typography>
        </div >
    )
};