import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState,  } from "react";
import { useUser } from '../UserProvider';
import jwt_decode from "jwt-decode";
import UpdateUser from "./UpdateUser";


function AppUser(props) {
  const user = useUser();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
      if (user && user.jwt) {
          const decodedJwt = jwt_decode(user.jwt);
          setRoles(decodedJwt.authorities);
      }
  }, [user, user.jwt]);

  const deleteUser = (e, userId) => {
    e.preventDefault();
    axios.delete(`http://localhost:8080/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${user.jwt}`
      }
    })
      .then(response => {
          console.log(response);
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
                <UpdateUser user={user}/>
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