import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material'
import axios from "axios";
import { useState } from "react";
import { useUser } from '../UserProvider';
import LockIcon from '@mui/icons-material/Lock';

function ChangePassword(props) {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const { email } = props;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
      
  const handleSubmit = (e) => {
    e.preventDefault();
    const isPasswordValid = validatePassword();
    if (!isPasswordValid) {
      return;
    }
    axios.put(`http://localhost:8080/auth/change-password`, {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }, {
        headers: {
            'Authorization': `Bearer ${user.jwt}`
        }
    })
    .then(response => {
      console.log(response);
      alert('Password changed successfully!');
      handleClose();
    })
    .catch(error => {
      console.error(error);
      alert(error.response.data);
    });
  };

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    // Passwords match, return true
    return true;
  };

  return (
    <span>
      <Button variant="outlined" sx={{ m: 1 }} onClick={handleClickOpen}>
        <LockIcon /> &nbsp; Vaihda salasana
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >Change Password</DialogTitle>
        <DialogContent>
          <div>
          <TextField
            required
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            sx={{ marginTop: 1 }}
            error={currentPassword === ''}
            helperText={currentPassword === '' ? 'This field is required' : ''}
          />
          </div>
          <div>
          <TextField
            required
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            sx={{ marginY: 1 }}
            error={!passwordRegex.test(newPassword)}
            helperText={!passwordRegex.test(newPassword) ? 'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.' : ''}
          />
          </div>
          <div>
          <TextField
            required
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={confirmPassword !== newPassword}
            helperText={confirmPassword !== newPassword ? 'Passwords do not match' : ''}
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
} 

export default ChangePassword;