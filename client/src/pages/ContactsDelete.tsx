import { Typography, Container, Stack, Box, Grid, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const ContactsDelete = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography>Delete Contact</Typography>
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <TextField id="contactname" label="Contact Name" variant="standard" fullWidth type="text" />
              </Grid>

              <Typography>Are you sure you want to delete this Contact?</Typography>
              <Grid item xs={4}>
                <Button variant="outlined">
                  <Link to="/contacts/view-contact" style={{ textDecoration: 'none' }}>
                    Back
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="warning">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
