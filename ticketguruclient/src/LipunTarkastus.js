import { Box, Typography, AppBar, Toolbar, Container, TextField, Button } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function LipunTarkastus() {
  const [code, setCode] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [id, setId] = useState(null);
  const [used, setUsed] = useState(null);

  const handleCodeChange = (event) => {
      setCode(event.target.value);
  };

  const handleSubmit = () => {
      fetch(`http://localhost:8080/tickets?code=${code}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        setTicket(data[0]);
        console.log(ticket);
        setId(parseInt(data[0].ticket_id));
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

  const showQr = () => {

    async function fetchQRCode() {
      const response = await fetch(`http://localhost:8080/qrcode/${code}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQRCode(url);
    }
    fetchQRCode();
  }

  const markAsUsed = () => {
    fetch(`http://localhost:8080/tickets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ used: new Date().toISOString() })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUsed(new Date().toISOString());
    })
    .catch(error => {
      console.error(error);
      setError('Tapahtui virhe merkittäessä lippua käytetyksi.');
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
              {used && <p>Käytetty: {new Date(used).toLocaleString()}</p>}
              {qrCode == null && <Button onClick={showQr}>Näytä QR-koodi</Button>}
              {qrCode && <img src={qrCode} alt="QR Code" />}
              <Button variant="contained" color="primary" onClick={markAsUsed}>Merkitse lippu käytetyksi</Button>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </Box>
    </Container>
  )
}

export default LipunTarkastus;
