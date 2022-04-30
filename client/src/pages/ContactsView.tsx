import { Container, Stack, Box, Grid, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const ContactsView = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <TextField id="contactname" label="Contact Name" variant="standard" fullWidth type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="contactemail" label="Email Address" variant="standard" fullWidth type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="contactphonenumber" label="Phone Number" variant="standard" fullWidth type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="contactcompany" label="Company" variant="standard" fullWidth type="text" />
              </Grid>

              <Grid item xs={4}>
                <Button variant="outlined">
                  <Link to="/contacts" style={{ textDecoration: 'none' }}>
                    Back
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained">
                  <Link to="/contacts/edit-contact" style={{ textDecoration: 'none' }}>
                    Edit
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="warning">
                  <Link to="/contacts/delete-contact" style={{ textDecoration: 'none' }}>
                    Delete
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
