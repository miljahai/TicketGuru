import { useState, useEffect } from 'react'
import { Box, Typography, AppBar, Toolbar, Container } from "@mui/material";
import Sivupalkki from "../components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useUser } from '../util/UserProvider'
import jwt_decode from "jwt-decode";
import axios from "axios";
import Reports from '../components/Reports'



function Raportit() {

    const [tickets, setTickets] = useState([])
    const user = useUser();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get('https://cen-cenru4.azurewebsites.net/tickets', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
        ]).then(([res]) => {
            console.log('Tickets fetched:', res.data);
            const data = res.data
            setTickets(data);
        }).catch(error => {
            console.log('Error fetching TicketTypes: ', error);
        });
    }, [user.jwt]);

    useEffect(() => {
        if (user && user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            setRoles(decodedJwt.authorities);
        }
    }, [user, user.jwt]);

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
                <Typography variant="h2" sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>Raportit</Typography>
                {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                    <Reports tickets={tickets} />

                ) : (
                    <></>
                )}
            </Box>
        </Container>
    )
}

export default Raportit;