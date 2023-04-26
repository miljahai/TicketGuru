import { Box, Typography, AppBar, Toolbar, Container, Button } from "@mui/material";
import Sivupalkki from "./components/Sivupalkki";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TicketTypes from "./components/TicketTypes";
import { useUser } from './UserProvider';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';

function Lipputyypit() {

    const [tickettypes, setTickettypes] = useState([]);
    const user = useUser();

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/tickettypes', {
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
        ]).then(([tickettypesResponse]) => {
            console.log('TicketTypes fetched:', tickettypesResponse.data);
            const ttdata = tickettypesResponse.data.filter(tt => tt.eventRecord != null)
            setTickettypes(ttdata);
        }).catch(error => {
            console.log('Error fetching TicketTypes: ', error);
        });
    }, [user.jwt]);

    return (
        <Container>
            <Box component="span" sx={{ p: 2 }}>

                <AppBar position='static' sx={{ borderRadius: '15px 50px' }}>
                    <Toolbar>
                        {<Sivupalkki />}
                        <Typography component={Link} to="/" sx={{ flexGrow: 1, textAlign: 'center' }} variant="h1">TicketGuru</Typography>
                    </Toolbar>
                </AppBar>

                <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>Lipputyypit</Typography>
                <Typography variant="caption" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    <div hidden>Todo:<ul>
                        <li>Tapahtuman päivittäminen Gridissä (nyt päivittyy vain nimi, ei event_id)</li>
                        <li>Dialogin päivittyminen</li>
                        <li>Gridissä muokatun lipputyypin muokkaus PUTtaus</li>
                        <li>id pois gridistä (vasta kun muuten valmis! näkyvillä devausapuna)</li>
                    </ul></div></Typography>

                <Button component={Link} to="../tapahtumat" endIcon={<ArticleIcon />} color='primary' >Tapahtumat</Button>
                <Button component={Link} to="../tapahtumanlisays" endIcon={<AddIcon />} >Lisää tapahtuma</Button>
                <Button component={Link} to='../lipputyypit' endIcon={<EditIcon />} variant='outlined' >Lipputyypit</Button>
            </Box>

            <Box>
                <TicketTypes tickettypes={tickettypes} user={user} />
            </Box>

        </Container >
    )
}

export default Lipputyypit;