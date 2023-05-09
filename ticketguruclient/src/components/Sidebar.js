import { Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useUser } from '../util/UserProvider';
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const [roles, setRoles] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      setRoles(decodedJwt.authorities);
    }
  }, [user, user.jwt]);

  return (
    <Box>
      <IconButton onClick={handleOpen}><MenuIcon /></IconButton>
      <Drawer
        anchor="left" open={open} onClick={handleClose}>
        <List>
          <ListItem component={Link} to="../liput">
            <ListItemButton>
              <ListItemIcon><ShoppingBasketIcon /></ListItemIcon>
              <ListItemText primary='Myy lippuja' />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem component={Link} to="../lipuntarkastus">
            <ListItemButton>
              <ListItemIcon><LocalActivityIcon /></ListItemIcon>
              <ListItemText primary="Tarkasta lippuja" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem component={Link} to="../tapahtumat">
            <ListItemButton>
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary='Tapahtumat' />
            </ListItemButton>
          </ListItem>
          <Divider />
          {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
            <>
              <ListItem component={Link} to="../raportit">
                <ListItemButton>
                  <ListItemIcon><ArticleIcon /></ListItemIcon>
                  <ListItemText primary="Selaa raportteja" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ) : (
            <></>
          )}
          {roles && roles.filter((role) => role === "ADMIN").length > 0 ? (
            <>
              <ListItem component={Link} to="../users">
                <ListItemButton>
                  <ListItemIcon><PeopleIcon /></ListItemIcon>
                  <ListItemText primary="Käyttäjät" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ) : (
            <></>
          )}
          <ListItem component={Link} to="../profile">
            <ListItemButton>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary='Omat tiedot' />
            </ListItemButton>
          </ListItem>
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
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;