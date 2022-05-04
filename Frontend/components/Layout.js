import Head from 'next/head';
import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
const Layout = ({ title, description, children }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
  const classes = useStyles();
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const darkModeChangHandler = () => {
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    dispatch({
      type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
    });
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title}-Next-Amazona` : 'Next-Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar className={classes.navbar} position="fixed">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography> Amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangHandler}
              ></Switch>

              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    <span> Cart</span>
                  )}
                </Link>
              </NextLink>
              <NextLink href="/cart" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          ALL rights reserved NextAmazona
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Layout), { ssr: false });