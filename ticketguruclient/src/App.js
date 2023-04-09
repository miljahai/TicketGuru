import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ylapalkki from "./components/Ylapalkki";
import Tapahtumat from "./Tapahtumat";
import Raportit from "./Raportit";
import Liput from "./Liput";
import LipunTarkastus from "./LipunTarkastus";
import { cyan } from "@mui/material/colors";
import { Box, Container } from "@mui/system";



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


  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box component="span" sx={{ p: 2 }}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Ylapalkki />} />
              <Route path="tapahtumat" element={<Tapahtumat />} />
              <Route path="raportit" element={<Raportit />} />
              <Route path="liput" element={<Liput />} />
              <Route path="lipuntarkastus" element={<LipunTarkastus />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>

    </Container>
  );
}

export default App;
