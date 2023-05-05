import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';
import Ylapalkki from "./pages/Home";
import Tapahtumat from "./pages/Tapahtumat";
import Raportit from "./pages/Raportit";
import Liput from "./pages/Liput";
import LipunTarkastus from "./pages/LipunTarkastus";
import Lipputyypit from './pages/Lipputyypit';
import AddEvent from "./components/AddEvent";
import Users from './pages/Users';
import Profile from './pages/Profile';
import { cyan } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import { useUser } from './util/UserProvider';
import AccessDenied from './AccessDenied';
import jwt_decode from "jwt-decode";
import CircularProgress from '@mui/material/CircularProgress';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      setRoles(decodedJwt.authorities);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user, user.jwt]);

  // Show loading indicator while the user is being fetched
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box component="span" sx={{ p: 2 }}>
          <CssBaseline />
          {/** <BrowserRouter basename={process.env.PUBLIC_URL}> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Ylapalkki />} />
              <Route path="/login" element={<Login />} />
              <Route path="tapahtumat" element={
                <PrivateRoute>
                  <Tapahtumat roles={roles} />
                </PrivateRoute>} />
              <Route
                path="raportit"
                element={
                  roles.find((role) => role === "ADMIN" || role === "EVENTS") ? (
                    <PrivateRoute>
                      <Raportit />
                    </PrivateRoute>
                  ) : (
                    <AccessDenied></AccessDenied>
                  )
                }
              />
              <Route
                path="signup"
                element={
                  roles.find((role) => role === "ADMIN") ? (
                    <PrivateRoute>
                      <SignUp />
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
              <Route path="tapahtumanlisays" element={
                <PrivateRoute>
                  <AddEvent />
                </PrivateRoute>} />
              <Route
                path="users"
                element={
                  roles.find((role) => role === "ADMIN") ? (
                    <PrivateRoute>
                      <Users />
                    </PrivateRoute>
                  ) : (
                    <AccessDenied></AccessDenied>
                  )
                }
              />
              <Route path="profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </Container>
  );
}

export default App;
