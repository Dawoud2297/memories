import {ShareSocial} from 'react-share-social' 
import { Button } from '@material-ui/core';
import Close from '@material-ui/icons/Close'
import './socialMedia.css'
const style = {
  color: 'white',
  backgroundColor: 'gray',
  padding: '0 30px',
  width: '100%'
};

export default function SocialMedia(props) {
  return (props.trigger) ?
     (<div className='popup'>
       <div className='popup-inner'>
         <ShareSocial 
              style={style}
              url ={`http://localhost:3000/memories/${props.memory._id}`}
              socialTypes={['facebook','twitter','reddit','linkedin','whatsapp']}
              />
         <Button size="small" color="primary" className='close-btn' onClick={()=>props.setTrigger(false)}><Close/></Button>
       </div>
     </div>
  ) : ""   
}