import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    //! changing color of children
    // marginBottom: '120px',
    '& a': {
      color: '#ffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 50,
    textAlign: 'center',
  },
  grow: {
    display: 'flex',
    flexGrow: 1,
  },
  section: {
    paddingTop: '50px',
    marginTop: 50,
    marginBottom: 50,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  progresbar: {
    paddingTop: '100px',

    backgroundColor: 'transparent',
  },
});

export default useStyles;
