import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";


import { Link, Outlet } from "react-router-dom";
import Sivupalkki from "./Sivupalkki";

function Ylapalkki () {

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
            <Typography variant="h2" sx={{flexGrow:1, textAlign:'center'}}>Etusivu</Typography>
        </Box>
    </Container>
    );
}

export default Ylapalkki;

