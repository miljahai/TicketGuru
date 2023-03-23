import { Box, Typography, AppBar, Toolbar } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link, Outlet } from "react-router-dom";

function Liput() {

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
            <Typography variant="h3" sx={{flexGrow:1, textAlign:'center'}}>Liput</Typography>
        </Box>
    </div>
    )
}

export default Liput;