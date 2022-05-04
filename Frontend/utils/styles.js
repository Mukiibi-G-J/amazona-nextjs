import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    //! changing color of children
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
});

export default useStyles;