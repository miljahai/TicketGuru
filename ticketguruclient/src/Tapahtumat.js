import { Box, Typography, AppBar, Toolbar, Container, Button } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Events from "./components/Events";
import AddIcon from '@mui/icons-material/Add';


function Tapahtumat() {

    const [events, setEvents] = useState([]);

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LmFkbWluQHRpY2tldGd1cnUuY29tIiwiaWF0IjoxNjgyMDY5Njk0LCJleHAiOjE2ODIwNzExMzR9.3M1K6mmpyr_lcPUpEX2sif9Tc4dsevZu8MMoKYbbsVU';

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/events', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        ]).then(([eventsResponse]) => {
            console.log('Events fetched:', eventsResponse.data);
            setEvents(eventsResponse.data);
        }).catch(error => {
            console.log('Error fetching events: ', error);
        });
    }, []);

    return (
        <Container>
        <Box component="span" sx={{ p: 2}}>
            <AppBar position='static' sx={{borderRadius: '15px 50px'}}>
                <Toolbar>                 
                {<Sivupalkki />}
                    <Typography component={Link} to="/" sx = { {flexGrow:1, textAlign:'center' } }variant="h1">TicketGuru</Typography>
                </Toolbar>
            </AppBar>
            <Outlet/>
            <Typography variant="h2" sx={{ flexGrow:1, textAlign:'center'}}>Tapahtumat</Typography>
        </Box>
        <Button component={Link} to ="../tapahtumanlisäys" endIcon={<AddIcon />} >Lisää tapahtuma</Button>
        <Events events = {events} />

    </Container>
    )
}

export default Tapahtumat;