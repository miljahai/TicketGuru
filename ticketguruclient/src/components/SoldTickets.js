import { Box, Typography, AppBar, Toolbar, Container, Select, MenuItem, Button, TextField, List, ListItem, ListItemText, ListItemButton, IconButton } from "@mui/material";
import { Add, Remove, ConfirmationNumber, ArticleOutlined, Cancel, LibraryAddOutlined, AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { useUser } from '../UserProvider';
import axios from "axios";
import ShowTicket from "./ShowTicket";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SoldTickets(props) {

    const dayjs = require('dayjs')

    return (
        <Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Lippu ID:</TableCell>
                        <TableCell>Koodi</TableCell>
                        <TableCell>Tapahtuma</TableCell>
                        <TableCell>Lipputyyppi</TableCell>
                        <TableCell>Myyntiaika</TableCell>
                        <TableCell>Myyjä</TableCell>
                        <TableCell>Avaa lippu</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tickets ? props.tickets.map((ticket) => (
                        <TableRow key={ticket.ticket_id}>
                            <TableCell>{ticket.ticket_id}</TableCell>
                            <TableCell>{ticket.code}</TableCell>
                            <TableCell>{ticket.ticketType.eventRecord ? ticket.ticketType.eventRecord.eventrecord_name : 'N/A'}</TableCell>
                            <TableCell>{ticket.ticketType ? ticket.ticketType.name : 'N/A'}</TableCell>
                            <TableCell>{ticket.salesEvent ? dayjs(ticket.salesEvent.sale_date).format('DD.MM.YYYY HH:MM') : 'N/A'}</TableCell>
                            <TableCell>{ticket.salesEvent.appUser ? ticket.salesEvent.appUser.firstname + ' ' + ticket.salesEvent.appUser.lastname : 'N/A'}</TableCell>
                            <TableCell><ShowTicket ticket={ticket} /></TableCell>
                        </TableRow>
                    )) : ''}
                </TableBody>
            </Table>
        </Box>
    )
}

export default SoldTickets;