import { Box, Typography, Container, Button, IconButton, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { ConfirmationNumber, } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { useUser } from '../util/UserProvider';

export default function ShowTicket(props) {
    const [open, setOpen] = useState(false);
    const code = props.ticket.code;
    const [qrCode, setQRCode] = useState(null);
    const user = useUser();
    const dayjs = require('dayjs')

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        async function fetchQRCode() {
            const response = await fetch(`http://localhost:8080/qrcode/${code}`, {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                },
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setQRCode(url);
        }
        fetchQRCode();
    }, [code, user.jwt]);

    const printTicket = () => {
        const printHeader = document.getElementById("ticket-dialog-title").innerHTML;
        const printContents = document.getElementById("ticket-dialog").innerHTML;

        // Create a new window object and set its content asynchronously
        const newWindow = window.open();
        newWindow.document.write('<html><head><title>TicketGuru</title></head><body><footer></footer>');
        newWindow.document.write(printHeader + '<br>' + printContents);
        newWindow.document.write('</body></html>');
        newWindow.document.close();

        // Wait for the content to load before triggering the print dialog
        newWindow.onload = () => {
            newWindow.print();
            newWindow.close();
        }
    };


    return (
        <Container>
            <IconButton onClick={handleClickOpen}><ConfirmationNumber /></IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id='ticket-dialog-title' className="footer hide-on-print">TicketGuru Lippu #{props.ticket.ticket_id}</DialogTitle>
                <DialogContent id='ticket-dialog' className="footer hide-on-print">
                    <Typography variant='caption'>{props.ticket.code}</Typography>
                    <Container>
                        <Box component='img' src={qrCode} alt={props.ticket.code} />
                    </Container>
                    <Typography variant='h4' mt={4}>{props.ticket.ticketType.eventRecord.eventrecord_name}</Typography>
                    <Typography>{props.ticket.ticketType.eventRecord.venue}, {props.ticket.ticketType.eventRecord.city}</Typography>
                    <Typography variant='h5'>{dayjs(props.ticket.ticketType.eventRecord.event_starttime).format('DD.MM.YYYY HH:MM')} - {dayjs(props.ticket.ticketType.eventRecord.event_endtime).format('DD.MM.YYYY HH:MM')}</Typography>
                    <Typography mb={4} variant='h5' >{props.ticket.ticketType.name}</Typography>
                    <Typography variant='caption'>Myyntiaika: {dayjs(props.ticket.salesEvent.sale_date).format('DD.MM.YYYY HH:MM')} (id: {props.ticket.salesEvent.salesevent_id})</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={printTicket}>Tulosta lippu</Button>
                    <Button onClick={handleClose}>Sulje</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}