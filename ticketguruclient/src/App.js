import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Ylapalkki from "./components/Ylapalkki";
import Tapahtumat from "./Tapahtumat";
import Raportit from "./Raportit";
import Liput from "./Liput";
import LipunTarkastus from "./LipunTarkastus";
<<<<<<< HEAD
import Lipputyypit from "./Lipputyypit";
=======
import LisaaTapahtuma from "./LisaaTapahtuma";
>>>>>>> feat3
import { cyan } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import { useUser } from './UserProvider';
import AccessDenied from './AccessDenied';
import jwt_decode from "jwt-decode";

const theme = createTheme({
  palette: {
    primary: cyan,
  },
  typography: {
    fontFamily: ['apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
    h1: {
      fontSize: '5rem',
      fontWeight: 500,
      lineHeight: 1.8,
      letterSpacing: '0.08em',
    },
    h2: {
      fontSize: '3rem',
      letterSpacing: '0.08em',
      padding: '12px'
    },

  }
})

function App() {
  const user = useUser();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [user.jwt]);

  const getRolesFromJWT = () => {
    if (user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      return decodedJwt.authorities;
    }
    return [];
  }


  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box component="span" sx={{ p: 2 }}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Ylapalkki />} />
<<<<<<< HEAD
              <Route path="/login" element={<Login />} />
              <Route path="tapahtumat" element={
                <PrivateRoute>
                  <Tapahtumat />
                </PrivateRoute>} />
              <Route
                path="raportit"
                element={
                  roles.find((role) => role === "ADMIN" || role === "EVENT") ? (
                    <PrivateRoute>
                      <Raportit />
                    </PrivateRoute>
                  ) : (
                    <AccessDenied></AccessDenied>
                  )
                }
              />
              <Route path="liput" element={
                <PrivateRoute>
                  <Liput />
                </PrivateRoute>} />
              <Route path="lipuntarkastus" element={
                <PrivateRoute>
                  <LipunTarkastus />
                </PrivateRoute>} />
              <Route path="lipputyypit" element={
                <PrivateRoute>
                  <Lipputyypit />
                </PrivateRoute>} />
=======
              <Route path="tapahtumat" element={<Tapahtumat />} />
              <Route path="raportit" element={<Raportit />} />
              <Route path="liput" element={<Liput />} />
              <Route path="lipuntarkastus" element={<LipunTarkastus />} />
              <Route path="tapahtumanlisäys" element={<LisaaTapahtuma />} />
>>>>>>> feat3
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </Container>
  );
}

export default App;
