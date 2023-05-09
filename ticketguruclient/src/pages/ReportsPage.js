import { useState, useEffect } from 'react'
import { Box, Typography, Container } from "@mui/material";
import { useUser } from '../util/UserProvider'
import jwt_decode from "jwt-decode";
import axios from "axios";
import Reports from '../components/Reports'


function ReportsPage() {

    const [tickets, setTickets] = useState([])
    const user = useUser();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/tickets', {
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

export default ReportsPage;