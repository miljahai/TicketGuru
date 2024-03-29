import { useState, useEffect } from 'react';
import { Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useUser } from '../util/UserProvider';

const Login = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (user.jwt) navigate("/");
  }, [user, navigate]);

  // Send login request
  const sendLoginRequest = (event) => {
    event.preventDefault();
    const reqBody = {
      email: email,
      password: password,
    };
    // Get JWT token from server
    fetch("http://localhost:8080/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) 
          return Promise.all([response.json(), response.headers]);
        else if (response.status === 401 || response.status === 403) {
          return Promise.reject("Invalid email or password");
        } else { 
          return Promise.reject("Something went wrong");
        }
      })
      .then(([body, headers]) => {
          // Save JWT token and user info to context
          user.setJwt(headers.get("Authorization"));
          user.setUserInfo(body);
      })
      .catch((message) => {
        alert(message);
      });
  };
  
  return (
    <Container>
    <Box component="span" sx={{p: 2}}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={sendLoginRequest} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
    </Box>
  </Container>
  )
}

export default Login;