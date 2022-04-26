// import { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Home = () => {
  const data = [
    {
      title: 'Software Engineer 1',
      company: 'InstaWhat',
      status: 'Applied',
      link: 'http://www.google.com',
    },
    {
      title: 'Software Engineer 1',
      company: 'InstaWhat2',
      status: 'Applied',
      link: 'http://www.google.com',
    },
    {
      title: 'Software Engineer 1',
      company: 'InstaWhat3',
      status: 'Applied',
      link: 'http://www.google.com',
    },
  ] as JobRowData[];

  // Check if user has no applications
  if (data.length === 0) {
    return <NoContent />;
  }

  return (
    <Container maxWidth="lg">
      <DataTable data={data} />
    </Container>
  );
};

const NoContent = () => (
  <Container maxWidth="sm">
    <Paper elevation={10} style={{ padding: '32px', margin: '16px auto' }}>
      <Stack spacing={6} justifyContent="center" alignItems="center">
        <Typography sx={{ fontStyle: 'italic', pt: '8px' }}>Nothing to see here...</Typography>
        <Button
          variant="contained"
          // TODO: Remove onClick when Link is enabled
          onClick={() => {
            alert('TODO: go to create job page');
          }}
        >
          {/* <Link to="/create-job" style={{ textDecoration: 'none' }}> */}
          Create new application
          {/* </Link> */}
        </Button>
      </Stack>
    </Paper>
  </Container>
);

const DataTable: React.FC<{ data: JobRowData[] }> = ({ data }): React.ReactElement => (
  <Stack spacing={4} sx={{ py: '24px' }}>
    {/* <Link to="/create-job"> */}
    <Button variant="contained" sx={{ width: 'fit-content' }} startIcon={<AddCircleOutlineIcon />}>
      Add new job application
    </Button>
    {/* </Link> */}
    <Typography component="h1" variant="h3">
      Current Job Applications:
    </Typography>
    <Paper elevation={4}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                th: {
                  fontSize: '1.5rem',
                },
              }}
            >
              <TableCell>Title</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <a href={row.link}>{row.link}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Stack>
);

type JobRowData = {
  title: string;
  company: string;
  status: string;
  link: string;
};
