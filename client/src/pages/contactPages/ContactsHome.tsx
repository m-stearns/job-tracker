import { Typography, Container, Stack, Button, Paper, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchContacts } from '../../repository';
import type { Contact } from '../../types';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const ContactsHome = () => {
  const [contactsData, setContactsData] = useState<Contact[]>([]);

  const handleGetContacts = async () => {
    await fetchContacts().then((res) => {
      setContactsData(res.data);
    });
  };
  useEffect(() => {
    handleGetContacts();
  }, []);

  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={5} justifyContent="left" alignItems="center">
          <Grid container spacing={0}>
            <Link to="/contacts/create" style={{ display: 'contents' }}>
              <Button variant="contained" sx={{ width: 'fit-content' }} startIcon={<AddCircleOutlineIcon />}>
                ADD NEW CONTACT
              </Button>
            </Link>
          </Grid>
          <Typography component="h1" variant="h3">
            Contacts
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    th: {
                      fontSize: '1.5rem',
                    },
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contactsData.map((row) => (
                  <TableRow
                    hover={true}
                    key={row.name}
                    onClick={() => navigate(`/contacts/view/${row.id}`)}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phoneNo}</TableCell>
                    <TableCell align="left">{row.company}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>
    </Container>
  );
};
