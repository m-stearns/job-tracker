import { AppBar, Toolbar, Button, ButtonGroup } from '@mui/material';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const auth = useAuth();
  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar>
        <ButtonGroup variant="contained" color="inherit">
          <Button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              Home
            </Link>
          </Button>
          <Button onClick={() => (auth.isSignedIn ? auth.signOut() : auth.signIn())}>
            {auth.isSignedIn ? (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Logout
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            )}
          </Button>
          <Button>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              Signup
            </Link>
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
