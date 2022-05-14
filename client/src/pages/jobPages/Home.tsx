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
import { useNavigate, Link } from 'react-router-dom';
import type { JobRowData } from '../../types';
import { useJobsApi } from '../../common/JobsQueryProvider';

export const Home = () => {
  const { jobsData, fetchAllJobsHasError, fetchAllJobsError, fetchAllJobsLoading } = useJobsApi();

  return (
    <Container maxWidth="lg">
      {fetchAllJobsHasError && <div>{fetchAllJobsError?.message ?? 'unknown error'}</div>}
      {fetchAllJobsLoading && <Loading />}
      {!fetchAllJobsLoading && jobsData.length > 0 && <DataTable data={jobsData} />}
      {!fetchAllJobsLoading && jobsData.length === 0 && <NoContent />}
    </Container>
  );
};

const Loading = () => (
  <Container maxWidth="sm">
    <Paper elevation={10} style={{ padding: '32px', margin: '16px auto' }}>
      <Stack spacing={6} justifyContent="center" alignItems="center">
        <Typography sx={{ fontStyle: 'italic', pt: '8px' }}>Loading...</Typography>
      </Stack>
    </Paper>
  </Container>
);

const NoContent = () => (
  <Container maxWidth="sm">
    <Paper elevation={10} style={{ padding: '32px', margin: '16px auto' }}>
      <Stack spacing={6} justifyContent="center" alignItems="center">
        <Typography sx={{ fontStyle: 'italic', pt: '8px' }}>Nothing to see here...</Typography>
        <Link to="/jobs/create" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Create new application</Button>
        </Link>
      </Stack>
    </Paper>
  </Container>
);

const DataTable: React.FC<{ data: JobRowData[] }> = ({ data }): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <Stack spacing={4} sx={{ py: '24px' }}>
      <Link to="jobs/create" style={{ display: 'contents' }}>
        <Button variant="contained" sx={{ width: 'fit-content' }} startIcon={<AddCircleOutlineIcon />}>
          Add new job application
        </Button>
      </Link>
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
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => navigate(`/jobs/view/${row.id}`)}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
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
};
