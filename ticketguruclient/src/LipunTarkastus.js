import { Box, Typography, AppBar, Toolbar, Container, TextField, Button } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function LipunTarkastus() {
    const [code, setCode] = useState("");
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleSubmit = (event) => {
        fetch(`http://localhost:8080/tickets?/tickets?code=${code}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setTicket(data[0]);
          setError(null);
        } else {
          setTicket(null);
          setError(`Ticket not found with code ${code}`);
        }
      })
      .catch(error => {
        console.error(error);
        setTicket(null);
        setError('An error occurred while fetching ticket data.');
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
        <Typography variant="h2" sx={{p: 2, flexGrow:1, textAlign:'center'}}>Lipun tarkastus</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <TextField label="Lipun koodi" variant="outlined" value={code} onChange={handleCodeChange} sx={{mb:2}} />
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
        {ticket && (
          <div>
              <h2>Lipun tiedot</h2>
              <p>Tapahtuma: {ticket.ticketType.eventRecord.eventrecord_name}</p>
              <p>Lipputyyppi: {ticket.ticketType.name}</p>
              <p>Hinta: {(ticket.ticketType.price).toFixed(2)} €</p>
              <p>Koodi: {ticket.code}</p>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </Box>
    </Container>
  )
}

export default LipunTarkastus;
