import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState, } from "react";
import { useUser } from '../util/UserProvider';
import jwt_decode from "jwt-decode";
import UpdateUser from "./UpdateUser";

// AppUsers component for listing and deleting users
function AppUser(props) {
  const user = useUser();
  const [roles, setRoles] = useState([]);

  // Get user roles from JWT
  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      setRoles(decodedJwt.authorities);
    }
  }, [user, user.jwt]);

  // Delete user
  const deleteUser = (e, userId) => {
    e.preventDefault();
    axios.delete(`https://cen-cenru4.azurewebsites.net/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${user.jwt}`
      }
    })
      .then(response => {
        console.log(response);
        // Refresh page
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Box>
      {props.users.map(user => {
        return (
          <Card key={user.appuser_id}>
            <CardHeader title={user.firstname + " " + user.lastname} />
            <CardContent>
              <Typography>Email: {user.email}</Typography>
              <Typography>Rooli: {user.userrole}</Typography>
            </CardContent>
            {roles && roles.filter((role) => role === "ADMIN").length > 0 ? (
              <Box>
                {roles && roles.filter((role) => role === "ADMIN").length > 0 ? (
                  <>
                    <UpdateUser user={user} />
                  </>
                ) : (
                  <></>
                )}
                <Button onClick={(e) => deleteUser(e, user.appuser_id)} color="secondary" variant="contained" startIcon={<DeleteIcon />}>Poista</Button>
              </Box>
            ) : (
              <></>
            )}
          </Card>
        )
      })}
    </Box>
  )
}

export default AppUser;