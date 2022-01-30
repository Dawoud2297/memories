import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    width: '45vw',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: '4'
    // position: 'sticky',
    position: 'absolute',
    top: '10px',
    // left: '30px',
    right: '40px',
    bottom: '40px',
    // color: 'white',
  },
  commentsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: '4'
    // position: 'sticky',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '70px',
    left: '30px',
    // color: 'white',
  },
});
