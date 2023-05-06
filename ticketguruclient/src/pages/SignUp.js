import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Typography, AppBar, Toolbar, Container, Grid } from "@mui/material";
import Sivupalkki from "../components/Sivupalkki";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useUser } from '../util/UserProvider';


export default function SignUp() {
  const user = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // Password must be 8-30 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

  // Create new user
  function createUser(event) {
    event.preventDefault();
    const reqBody = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };

    fetch("https://cen-cenru4.azurewebsites.net/auth/register", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.jwt}`
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else if (response.status === 400) {
          // Bad request
          return Promise.reject("Bad request");
        } else if (response.status === 409) {
          // User with this email already exists
          return Promise.reject("User with this email already exists");
        } else {
          return Promise.reject("Something went wrong");
        }
      })
      .then(([body, headers]) => {
        // Navigate to users page
        navigate("/users");
      })
      .catch((message) => {
        alert(message);
      });
  }

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
          <Box component="form" noValidate onSubmit={createUser} sx={{ mt: 3 }}>
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
                  error={!passwordRegex.test(password)}
                  helperText={!passwordRegex.test(password) ? 'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.' : ''}
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