import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TicketTypesGrid from "../components/TicketTypesGrid";
import { useUser } from '../util/UserProvider';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import AddTicketTypes from '../components/AddTicketTypes';
import jwt_decode from "jwt-decode";

export default function TicketTypes() {

    const [tickettypes, setTickettypes] = useState([]);
    const user = useUser();
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (user && user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            setRoles(decodedJwt.authorities);
        }
    }, [user, user.jwt]);

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/tickettypes', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
        ]).then(([tickettypesResponse]) => {
            console.log('TicketTypes fetched:', tickettypesResponse.data);
            const ttdata = tickettypesResponse.data.filter(tt => tt.eventRecord != null)
            setTickettypes(ttdata);
        }).catch(error => {
            console.log('Error fetching TicketTypes: ', error);
        });
    }, [user.jwt]);

    const saveTickettype = (tickettype) => {
        // Save a new tickettype
        Promise.all([
            axios.post(
                `http://localhost:8080/tickettypes`,
                tickettype,
                {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`
                    }
                })
        ]).then((response) => {
            console.log('TicketType created: ', response[0].data);

            console.log('refreshing grid')
            // Get updated data from server
            // Refresh grid with new data
            axios.get('http://localhost:8080/tickettypes', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            }).then((tickettypesResponse) => {
                console.log('TicketTypes fetched:', tickettypesResponse.data);
                const ttdata = tickettypesResponse.data.filter(tt => tt.eventRecord != null)
                setTickettypes(ttdata);
                setMessage('Lipputyyppi ' + tickettype.eventRecord.eventrecord_id + ': ' + tickettype.name + ' lisätty');
            }).catch(error => {
                console.log('Error fetching TicketTypes: ', error);
                setMessage('Lipputyypin lisääminen epäonnistui: ' + error.code + ' ' + error.message + ': ' + JSON.stringify(error.response.data));
            });
        }).catch(error => {
            console.log('Error creating TicketType: ', error)
            setMessage('Lipputyypin lisääminen epäonnistui: ' + error.code + ' ' + error.message + ': ' + JSON.stringify(error.response.data));
        });
    };


    return (
        <Container>
            <Box component="span" sx={{ p: 2 }}>
                <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>Lipputyypit</Typography>
                <Button component={Link} to="../tapahtumat" endIcon={<ArticleIcon />} color='primary' >Tapahtumat</Button>
                {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                    <>
                        <Button component={Link} to="../tapahtumanlisays" endIcon={<AddIcon />} >Lisää tapahtuma</Button>
                    </>
                ) : (
                    <></>
                )}
                <Button component={Link} to='../lipputyypit' endIcon={<EditIcon />} variant='outlined' >Lipputyypit</Button>
            </Box>
            <Typography variant='body2' sx={{ p: 0, textAlign: 'left' }}>
                {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                    <>
                        <AddTicketTypes saveTickettype={saveTickettype} user={user} />
                    </>
                ) : (
                    <></>
                )}
            </Typography>
            <Box>
                <TicketTypesGrid tickettypes={tickettypes} user={user} />
            </Box>
            <Box component='div'>
                {message}
            </Box>
        </Container >
    )
}