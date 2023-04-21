import { Box, Typography, AppBar, Toolbar, Container, Button } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TicketTypes from "./components/TicketTypes";
import { useUser } from './UserProvider';
import ArrowBack from '@mui/icons-material/Edit';

function Lipputyypit() {

    const [tickettypes, setTickettypes] = useState([]);
    const user = useUser();

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/tickettypes', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
        ]).then(([tickettypesResponse]) => {
            console.log('TicketTypes fetched:', tickettypesResponse.data);
            setTickettypes(tickettypesResponse.data);
        }).catch(error => {
            console.log('Error fetching TicketTypes: ', error);
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
                <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>Lipputyypit</Typography>
                <Button href='../tapahtumat' variant="contained"><ArrowBack />Tapahtumat</Button>
            </Box>
            <Box sx={{ width: 0.5, p: 0 }}>
                <TicketTypes tickettypes={tickettypes} />
            </Box>
        </Container>
    )
}

export default Lipputyypit;