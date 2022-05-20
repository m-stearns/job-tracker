import { AppBar, Toolbar, Button, ButtonGroup } from '@mui/material';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
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
          <Button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              Home
            </Link>
          </Button>
          {user ? (
            <>
              <Button>
                <Link to="/contacts" style={{ textDecoration: 'none' }}>
                  Contacts
                </Link>
              </Button>
              <Button>
                <Link to="/skills" style={{ textDecoration: 'none' }}>
                  Skills
                </Link>
              </Button>
              <Button onClick={handleLogout} style={{ textDecoration: 'none' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Login
                </Link>
              </Button>
              <Button>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  Signup
                </Link>
              </Button>
            </>
          )}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
