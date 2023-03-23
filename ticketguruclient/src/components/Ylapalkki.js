import { AppBar, Box, Toolbar, Typography } from "@mui/material";


import { Link, Outlet } from "react-router-dom";
import Sivupalkki from "./Sivupalkki";

function Ylapalkki () {

    return (
        <div>
        <Box>
            <AppBar position='static'>
                <Toolbar>                 
                    {<Sivupalkki />}
                    <Typography component={Link} to="/" sx = { {flexGrow:1, textAlign:'center' } }variant="h4">TicketGuru</Typography>
                </Toolbar>
            </AppBar>
            <Outlet/>
            <Typography variant="h3" sx={{flexGrow:1, textAlign:'center'}}>Etusivu</Typography>
        </Box>
    </div>
    );
}

export default Ylapalkki;

/*    <IconButton onClick={handleOpen}>
<MenuIcon />
</IconButton> */