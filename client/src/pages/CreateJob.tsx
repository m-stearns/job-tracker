import {
  Typography,
  Container,
  Stack,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
} from '@mui/material';

export const CreateJob = () => {
  const handleCreateJob = () => {
    return;
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography component="h1">Create Job Application</Typography>
          <Box component="form" noValidate onSubmit={handleCreateJob} width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="jobtitle"
                  label="Job Title"
                  variant="standard"
                  fullWidth
                  required
                  autoFocus
                  type="text"
                />
              </Grid>
              {/** end of jobtitle item */}
              <Grid item xs={12}>
                <TextField
                  id="companyname"
                  label="Company Name"
                  variant="standard"
                  fullWidth
                  required
                  autoFocus
                  type="text"
                />
              </Grid>
              {/** end of companyname item */}
              <Grid item xs={12}>
                <TextField
                  id="jobdesc"
                  label="Job Description"
                  variant="standard"
                  fullWidth
                  required
                  autoFocus
                  multiline
                  type="text"
                />
              </Grid>
              {/** end of jobdesc item */}
              <Grid item xs={12}>
                <TextField
                  id="joburl"
                  label="URL to Job Post"
                  variant="standard"
                  fullWidth
                  required
                  autoFocus
                  type="text"
                />
              </Grid>
              {/** end of joburl item */}
              <Grid item xs={12} style={{ marginBottom: '24px' }}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select labelId="status-label" id="status" label="Status" required fullWidth variant="standard">
                    <MenuItem value={'Applied'}>Applied</MenuItem>
                    <MenuItem value={'Interview Scheduled'}>Interview Scheduled</MenuItem>
                    <MenuItem value={'Decision Pending'}>Decision Pending</MenuItem>
                    <MenuItem value={'Accepted'}>Accepted</MenuItem>
                    <MenuItem value={'Rejected'}>Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/** end of status item */}
              <Typography component="h1">Add Skills</Typography>
              <Grid item xs={12} style={{ marginBottom: '24px' }}>
                <Button color="primary" sx={{ borderRadius: 28 }} variant="contained">
                  <Typography variant="body2">+Add Skill</Typography>
                </Button>
              </Grid>
              {/** end of add skills item */}
              <Typography component="h1">Add Contact (optional)</Typography>
              <Grid item xs={12}>
                <TextField id="contactname" label="Contact Name" variant="standard" fullWidth autoFocus type="text" />
              </Grid>
              {/** end of contact name item */}
              <Grid item xs={12}>
                <TextField id="contactemail" label="Email Address" variant="standard" fullWidth autoFocus type="text" />
              </Grid>
              {/** end of contact email item */}
              <Grid item xs={12}>
                <TextField
                  id="contactphonenumber"
                  label="Phone Number"
                  variant="standard"
                  fullWidth
                  autoFocus
                  type="text"
                />
              </Grid>
              {/** end of contact phone number item */}
              <Grid item xs={12}>
                <TextField id="contactcompany" label="Company" variant="standard" fullWidth autoFocus type="text" />
              </Grid>
              {/** end of contact phone number item */}

              {/** start form buttons */}
              <Grid item xs={6}>
                <Button variant="outlined">Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained">Submit</Button>
              </Grid>
              {/** end form buttons */}
            </Grid>
            {/** end of container */}
          </Box>
          {/** end of form */}
        </Stack>
      </Paper>
    </Container>
  );
};
