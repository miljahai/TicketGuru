import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Ylapalkki from "./components/Ylapalkki";
import Tapahtumat from "./Tapahtumat";
import Raportit from "./Raportit";
import Liput from "./Liput";


const theme = createTheme({
  palette: {

  },
  typography: {

  }
})
function App() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />        
        <BrowserRouter>
        <Routes>
          <Route path="/" element= { <Ylapalkki />} />
          <Route path="tapahtumat" element = {<Tapahtumat />} />
          <Route path="raportit" element = {< Raportit/>} />
          <Route path="liput" element = {<Liput /> } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
/* tänne talteen tavaraa
<Ylapalkki />
      <BrowserRouter>
        <Routes>
          <Route path="/" element= { <ylapalkki />} ></Route>
          <Route path="tapahtumat" element = {<Tapahtumat />} />
          <Route path="raportit" element = {< Raportit/>} />
          <Route path="liput" element = {<Liput /> } />
        </Routes>
      </BrowserRouter>

*/