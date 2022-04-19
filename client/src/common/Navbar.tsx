import { AppBar, Toolbar, Button, ButtonGroup, Link } from '@mui/material';

export const Navbar = () => {
  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar>
        <ButtonGroup variant="contained" color="inherit">
          <Button>
            <Link href="/" underline="none" variant="button">
              Home
            </Link>
          </Button>
          <Button>
            <Link href="/login" underline="none" variant="button">
              Login
            </Link>
          </Button>
          <Button>
            <Link href="/signup" underline="none" variant="button">
              Signup
            </Link>
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
