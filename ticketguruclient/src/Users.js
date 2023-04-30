import { Box, Button, Card, CardContent, CardHeader, Typography, AppBar, Toolbar, Container } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Events from "./components/Events";
import { useUser } from './UserProvider';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import jwt_decode from "jwt-decode";
import AppUsers from "./components/AppUsers";


function Users({ props }) {
    const [users, setUsers] = useState([]);
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
            {roles && roles.filter((role) => role === "ADMIN").length > 0 ? (
                <>
                  <Button component={Link} to="../signup" endIcon={<AddIcon />} >Lisää Käyttäjä</Button>
                </>
            ) : (
                <></>
            )}
            <AppUsers users={users} />
        </Container >
    )
}

export default Users;