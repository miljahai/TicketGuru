import { Box, Typography, AppBar, Toolbar, Container, Button } from "@mui/material";
import Sivupalkki from "../components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Events from "../components/Events";
import { useUser } from '../util/UserProvider';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import jwt_decode from "jwt-decode";



function Tapahtumat({ props }) {
    const [events, setEvents] = useState([]);
    const user = useUser();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (user && user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            setRoles(decodedJwt.authorities);
        }
    }, [user, user.jwt]);

    useEffect(() => {
        Promise.all([
            axios.get('https://cen-cenru4.azurewebsites.net/events', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
        ]).then(([eventsResponse]) => {
            console.log('Events fetched:', eventsResponse.data);
            setEvents(eventsResponse.data);
        }).catch(error => {
            console.log('Error fetching events: ', error);
        });
    }, [user.jwt]);

    return (
        <Container>
            <Box component="span" sx={{ p: 2 }}>
                <AppBar position='static' sx={{ borderRadius: '15px 50px' }}>
                    <Toolbar>
                        {<Sivupalkki />}
                        <Typography component={Link} to="/" sx={{ flexGrow: 1, textAlign: 'center' }} variant="h1">TicketGuru</Typography>
                    </Toolbar>
                </AppBar>
                <Outlet />
                <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>Tapahtumat</Typography>
            </Box>
            <Button component={Link} to="../tapahtumat" endIcon={<ArticleIcon />} variant='outlined' color='primary' >Tapahtumat</Button>
            {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                <>
                    <Button component={Link} to="../tapahtumanlisays" endIcon={<AddIcon />} >Lisää tapahtuma</Button>
                </>
            ) : (
                <></>
            )}
            <Button component={Link} to='../lipputyypit' endIcon={<EditIcon />}  >Lipputyypit</Button>
            <Events events={events} />
        </Container >
    )
}

export default Tapahtumat;