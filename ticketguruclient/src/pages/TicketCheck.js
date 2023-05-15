import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useUser } from '../util/UserProvider';

function TicketCheck() {
  const [code, setCode] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [id, setId] = useState(null);
  const [used, setUsed] = useState(null);
  const user = useUser();

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:8080/tickets?code=${code}`, {
      headers: {
        'Authorization': `Bearer ${user.jwt}`
      },
    })
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
      const response = await fetch(`http://localhost:8080/qrcode/${code}`, {
        headers: {
          'Authorization': `Bearer ${user.jwt}`
        },
      });
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.jwt}`
      },
      body: JSON.stringify({ ticket_id: id })
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

  if (ticket && !ticket.used) {
    return (
      <Container>
        <Box component="span" sx={{ p: 2 }}>
          <Typography variant="h2" sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>Lipun tarkastus</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <TextField label="Lipun koodi" variant="outlined" value={code} onChange={handleCodeChange} sx={{ mb: 2 }} />
            <Button variant="contained" onClick={handleSubmit}>Tarkasta</Button>
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
              <div>
                <Button variant="contained" color="primary" onClick={markAsUsed}>Merkitse lippu käytetyksi</Button>
              </div>
            </div>
          )}
          {error && <div>Error: {error}</div>}
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Box component="span" sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>Lipun tarkastus</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <TextField label="Lipun koodi" variant="outlined" value={code} onChange={handleCodeChange} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={handleSubmit}>Tarkasta</Button>
        </Box>
        {ticket && (
          <div>
            <h2>Lipun tiedot</h2>
            <p>Tapahtuma: {ticket.ticketType.eventRecord.eventrecord_name}</p>
            <p>Lipputyyppi: {ticket.ticketType.name}</p>
            <p>Hinta: {(ticket.ticketType.price).toFixed(2)} €</p>
            <p>Koodi: {ticket.code}</p>
            <p>Lippu käytetty: {new Date(ticket.used).toLocaleString()}</p>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </Box>
    </Container>
  )
}

export default TicketCheck;
