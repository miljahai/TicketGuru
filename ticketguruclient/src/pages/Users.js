import { Box, Button, Typography, AppBar, Toolbar, Container } from "@mui/material";
import Sivupalkki from "../components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../util/UserProvider';
import AddIcon from '@mui/icons-material/Add';
import AppUsers from "../components/AppUsers";


function Users() {
    const [users, setUsers] = useState([]);
    const user = useUser();

    // Get all users
    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/users', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
        ]).then(([usersResponse]) => {
            console.log('Users fetched:', usersResponse.data);
            setUsers(usersResponse.data);
        }).catch(error => {
            console.log('Error fetching users: ', error);
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
                <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>Käyttäjät</Typography>
            </Box>
                <Button component={Link} to="../signup" endIcon={<AddIcon />} >Lisää Käyttäjä</Button>
            <AppUsers users={users} />
        </Container >
    )
}

export default Users;