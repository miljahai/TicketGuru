import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Autocomplete } from '@mui/material'
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from '../util/UserProvider';
import EditIcon from '@mui/icons-material/Edit';

function UpdateUser(props) {
  const user = useUser();
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [open, setOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    email: props.user.email,
    userrole: props.user.userrole
  });
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Open Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Close Dialog
  const handleClose = () => {
    setUpdatedUser({})
    setOpen(false);
  };

  // Fetch user roles for Dialog userrole selection
  useEffect(() => {
    Promise.all([
        axios.get('http://localhost:8080/roles', {
            headers: {
                'Authorization': `Bearer ${user.jwt}`
            }
        })
    ]).then(([response]) => {
        setUserRoles(response.data);
    }).catch(error => {
        console.log('Error fetching roles: ', error);
    });
}, [user.jwt]);

  // Handle input changes
  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  };
  
  // Update user
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedUser);
    axios.put(`http://localhost:8080/users/${props.user.appuser_id}`, updatedUser, {
        headers: {
            'Authorization': `Bearer ${user.jwt}`
        }
    })
    .then(response => {
      console.log(response);
      alert('User updated successfully!');
      //  refresh page
      window.location.reload();
      handleClose();
    })
    .catch(error => {
      console.error(error);
      alert('Error updating user!');
    });
  };

  return (
    <span>
      <Button variant="contained" sx={{ m: 1 }} onClick={handleClickOpen}>
        <EditIcon />Muokkaa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Muokkaa käyttäjää</DialogTitle>
        <DialogContent>
          <TextField
              margin='dense'
              name='firstname'
              value={updatedUser.firstname}
              label='Etunimi'
              onChange={(e, newValue) => handleInputChange(e)}
              fullWidth
              variant='standard'
              required
              error={!updatedUser.firstname}
          />
          <TextField
              margin='dense'
              name='lastname'
              value={updatedUser.lastname}
              label='Sukunimi'
              onChange={e => handleInputChange(e)}
              fullWidth
              variant='standard'
              required
              error={!updatedUser.lastname}
          />
          <TextField
              margin='dense'
              name='email'
              value={updatedUser.email}
              label='Email'
              onChange={e => handleInputChange(e)}
              fullWidth
              variant='standard'
              required
              error={!updatedUser.email || !emailRegex.test(updatedUser.email)}
              helperText={!updatedUser.email ? 'Email is required' : !emailRegex.test(updatedUser.email) ? 'Email is not valid' : ''}
          />
          <Autocomplete
              sx={{ margin: 'dense' }}
              options={Object.values(userRoles).map((userRoles) => userRoles)}
              getOptionLabel={(option) => option || ''}
              renderInput={(params) => <TextField {...params} label="Rooli" />}
              value={selectedRole}
              defaultValue={null}
              freeSolo={true}
              name='userrole'
              onChange={(event, value) => {
                  setSelectedRole(value);
                  setUpdatedUser({ ...updatedUser, userrole: value });
              }}
              required
              error={!updatedUser.userrole}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSubmit}>Tallenna</Button>
            <Button onClick={handleClose}>Peruuta</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
} 

export default UpdateUser;