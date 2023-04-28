import { useState, useEffect } from "react";
import { AppBar, Box, Container, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '../UserProvider';
import { useNavigate, useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import Sivupalkki from "./Sivupalkki";
import jwt_decode from "jwt-decode";

function Ylapalkki() {

    const user = useUser();
    const [roles, setRoles] = useState([]);
    const { pathname } = useLocation();
    const navigate = useNavigate();
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
                <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>Etusivu</Typography>

                <List sx={{ display: 'flex', flexDirection: 'column' }} >
                    <List sx={{ display: 'flex', flexDirection: 'row' }} >
                        <ListItem component={Link} to="../liput">
                            <ListItemButton>
                                <ListItemIcon><ShoppingBasketIcon /></ListItemIcon>
                                <ListItemText primary='Myy lippuja' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem component={Link} to="../lipuntarkastus">
                            <ListItemButton>
                                <ListItemIcon><LocalActivityIcon /></ListItemIcon>
                                <ListItemText primary="Tarkasta lippuja" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem component={Link} to="../tapahtumat">
                            <ListItemButton>
                                <ListItemIcon><EditIcon /></ListItemIcon>
                                <ListItemText primary='Tapahtumat' />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List sx={{ display: 'flex', flexDirection: 'row' }} >
                        {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                            <>
                                <ListItem component={Link} to="../raportit">
                                    <ListItemButton>
                                        <ListItemIcon><ArticleIcon /></ListItemIcon>
                                        <ListItemText primary="Selaa raportteja" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <></>
                        )}
                        {roles && roles.filter((role) => role === "ADMIN").length > 0 ? (
                            <>
                                <ListItem component={Link} to="../signup">
                                    <ListItemButton>
                                        <ListItemIcon><PersonAddIcon /></ListItemIcon>
                                        <ListItemText primary="Lisää käyttäjä" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <></>
                        )}
                        <ListItem></ListItem>
                    </List>
                    <List sx={{ display: 'flex', flexDirection: 'row' }} >
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                {user && user.jwt ? (
                                    <div onClick={() => {
                                        user.setJwt(null);
                                        navigate("/login");
                                    }} >
                                        Kirjaudu ulos
                                    </div>
                                ) : pathname !== "/login" ? (
                                    <div onClick={() => {
                                        navigate("/login");
                                    }} >
                                        Kirjaudu sisään
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </ListItemButton>
                        </ListItem>
                        <ListItem></ListItem>
                        <ListItem></ListItem>
                    </List>
                </List>
            </Box>
        </Container>
    );
}

export default Ylapalkki;

