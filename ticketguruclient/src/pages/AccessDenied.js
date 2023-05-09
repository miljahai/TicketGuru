import React from 'react'
import { Box, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box component="span" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <img src={require("../images/403error.png")} alt="403" style={{ width: 350 }} />
          <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>403</Typography>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>Access Denied</Typography>
          <Typography sx={{ flexGrow: 1, textAlign: 'center', marginTop: 2, marginBottom: 5 }}>Sorry, but you don't have permission to access this page.</Typography>
          <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default AccessDenied;
