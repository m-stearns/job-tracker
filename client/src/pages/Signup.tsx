import { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../common/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const emailPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export const Signup = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setIsEmailError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordError(false);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setIsPasswordError(false);
  };

  const handleSignup = () => {
    // Validate username is email and passwords match
    if (emailPattern.test(username) && password === confirmPassword) {
      alert(`Creating account with username: ${username}\npassword: ${password}\nYour name is ${firstName}${lastName}`);
      navigate('/login', {});
      return;
    }
    if (!emailPattern.test(username)) {
      setIsEmailError(true);
    }
    if (password !== confirmPassword) {
      setIsPasswordError(true);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Avatar sx={{ bgcolor: 'error.main' }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1">Create Account</Typography>
          <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstname"
                  label="First name"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  type="text"
                  onChange={handleFirstnameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastname"
                  label="Last name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  onChange={handleLastnameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  required
                  fullWidth
                  helperText={isEmailError && 'Username must be a valid email'}
                  type="email"
                  error={isEmailError}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  required
                  fullWidth
                  helperText={isPasswordError && 'Passwords must match'}
                  type="password"
                  error={isPasswordError}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password-confirm"
                  label="Confirm Password"
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  error={isPasswordError}
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
            </Grid>
            <Grid item sx={{ py: 2, justifyContent: 'center' }} display="flex">
              <Button variant="contained" onClick={handleSignup}>
                Sign up
              </Button>
            </Grid>
            <Grid item sx={{ justifyContent: 'center' }} display="flex">
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
