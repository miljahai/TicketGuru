import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Typography, AppBar, Toolbar, Container, Grid } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useUser } from './UserProvider';


export default function SignUp() {
  const user = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  function createAndLoginUser(event) {
    event.preventDefault();
    const reqBody = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };

    fetch("http://localhost:8080/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else if (response.status === 400)  {
          return Promise.reject("Bad request");
        } else if (response.status === 409)  {
          return Promise.reject("User with this email already exists");
        } else { 
          return Promise.reject("Something went wrong");
        }
      })
      .then(([body, headers]) => {
        //console.log(body);
        //user.setJwt(body.token);
        navigate("/");
        //Tästä ohjaus käyttäjät sivulle, kun sellainen luotu
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <Container>
      <Box component="span" sx={{p: 2}}>
        <AppBar position='static' sx={{borderRadius: '15px 50px'}}>
          <Toolbar>                 
          {<Sivupalkki />}
              <Typography component={Link} to="/" sx = { {flexGrow:1, textAlign:'center' } }variant="h1">TicketGuru</Typography>
          </Toolbar>
        </AppBar>
      <Outlet/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 400,
            marginX: 'auto',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={createAndLoginUser} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}