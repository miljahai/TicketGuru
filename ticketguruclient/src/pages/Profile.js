import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Container, Typography, Avatar, Card, CardHeader, CardContent, CardActions} from "@mui/material";
import { useUser } from '../util/UserProvider';
import ChangePassword from '../components/ChangePassword';

// Show info of the logged in user
function Profile() {

  const user = useUser();

  return (
    <Container>
      <Box component="span" sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>Omat tiedot</Typography>
        <Card key={user.userInfo.appuser_id} sx={{ width: 450, height: 350, marginTop: 2, marginX: 'auto', paddingLeft: 2}}>
          <CardHeader sx={{ marginX: 'auto' }}
          avatar= {
              <Avatar sx={{ bgcolor: '#7B1FA2', marginX: 'auto', marginTop: 5, width: 100, height: 100 }}>
                  <AccountCircleIcon sx={{ width: 90, height: 90 }} />
              </Avatar>}
          />
          <CardContent>
              <Typography variant='h5'>{user.userInfo.firstname + " " + user.userInfo.lastname}</Typography>
              <Typography variant='body1'>Email: {user.userInfo.email}</Typography>
              <Typography variant='body1'>Rooli: {user.userInfo.userrole}</Typography>
          </CardContent>
          <CardActions>
            <ChangePassword email={user.userInfo.email}/>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

export default Profile;

