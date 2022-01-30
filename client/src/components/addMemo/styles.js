
import { lightGreen } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    width: '50%',
    marginTop : '100px',
  },
  message: {
    marginLeft : '100px',
    marginTop : '300px',
    float: 'left',
    fontSize: '20px',
    color: lightGreen,
    fontWeight : '1000'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));