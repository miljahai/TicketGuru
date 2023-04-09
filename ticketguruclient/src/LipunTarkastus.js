import { Box, Typography, AppBar, Toolbar, Container, TextField, Button } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function LipunTarkastus() {
    const [code, setCode] = useState("");

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleSubmit = () => {
        // tähän se, miten lippu tarkastetaan
    };

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
            </Box>
        </Container>
    )
}

export default LipunTarkastus;
