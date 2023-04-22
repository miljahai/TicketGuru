import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material'
import { Add } from '@mui/icons-material';

export default function AddTicketTypes(props) {

    const [open, setOpen] = React.useState(false);
    const [tickettype, setTickettype] = React.useState({
        'eventRecord.name': '', name: '', price: ''
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
        console.log(tickettype)
        props.saveTickettype(tickettype);
        handleClose();
    }

    return (
        <span>
            <Button variant="contained" sx={{ m: 1 }} onClick={handleClickOpen}>
                <Add />Lisää lipputyyppi
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Lisää uusi lipputtyypi</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='eventRecord.name'
                        value={tickettype.eventRecord}
                        label='Tapahtuma'
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='name'
                        value={tickettype.ticket_type_name}
                        label='Lipputyyppi'
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='price'
                        value={tickettype.price}
                        label='Hinta'
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant='standard'
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