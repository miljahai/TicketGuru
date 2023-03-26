import { Box, Typography, AppBar, Toolbar, Container } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";

function Raportit() {

    return (
        <Container>
        <Box component="span" sx={{p: 2}}>
            <AppBar position='static'>
                <Toolbar>                 
                {<Sivupalkki />}
                    <Typography component={Link} to="/" sx = { {flexGrow:1, textAlign:'center' } }variant="h1">TicketGuru</Typography>
                </Toolbar>
            </AppBar>
            <Outlet/>
            <Typography variant="h2" sx={{p: 2, flexGrow:1, textAlign:'center'}}>Raportit</Typography>
        </Box>
    </Container>
    )
}

export default Raportit;