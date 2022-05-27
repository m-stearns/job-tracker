import { AppBar, Toolbar, Button, ButtonGroup, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar>
        <ButtonGroup variant="contained" color="inherit">
          <Button onClick={() => navigate('/')}>
            <Typography color="secondary">Home</Typography>
          </Button>
          {user ? (
            <>
              <Button onClick={() => navigate('/contacts')}>
                <Typography color="secondary">CONTACTS</Typography>
              </Button>
              <Button onClick={() => navigate('/skills')}>
                <Typography color="secondary">SKILLS</Typography>
              </Button>
              <Button onClick={handleLogout} style={{ textDecoration: 'none' }}>
                <Typography color="secondary">Logout</Typography>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>
                <Typography color="secondary">Login</Typography>
              </Button>
              <Button onClick={() => navigate('/signup')}>
                <Typography color="secondary">Signup</Typography>
              </Button>
            </>
          )}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
