import { useState } from 'react';
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import EditIcon from '@material-ui/icons/Edit'
import Share from '@material-ui/icons/Share'
import Comment from '@material-ui/icons/Comment'
import Report from '@material-ui/icons/Report';
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { Dropdown } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { likeMemory, deleteMemory } from '../../../action/memories';
import SocialMedia from '../../socialMedia/SocialMedia'
import Comments from '../../comments/Comments';
import ReportPage from '../../reportPage/ReportPage';


const Memory = ({memory, setCurrentId, currentId}) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile')).result
    const userId = user?._id || user?.googleId
    const [trigger, setTrigger] = useState(false)
    const [commentClicked, setCommentClicked] = useState(false)
    const [carActions, setCarActions] = useState(true)
    const [report, setReport] = useState(false)
    
    
    const openComments = () =>{
      setCommentClicked(true)
      setCarActions(false)
    }


    const Likes = () => {
        if (memory.likes.length > 0) {
          return memory.likes.find((like) => like === (user?.googleId || user?._id))
            ? (
              <><FavoriteOutlinedIcon color='red' fontSize="small" />&nbsp;{memory.likes.length > 2 ? `You and ${memory.likes.length - 1} others` : `${memory.likes.length} like${memory.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><FavoriteBorderIcon fontSize="small" />&nbsp;{memory.likes.length} {memory.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><FavoriteBorderIcon fontSize="small" />&nbsp;Like</>;
      };

      const editMemo = (id) =>{
        navigate(`/${userId}/creatememory`)
        setCurrentId(id)
      }

  const vistOne = () =>{
    navigate(`/${memory.creatorId}/persoprofile`)
  }

    return (
      <div>
        <Card className={classes.card}>
            <CardMedia 
            className={classes.media}
            image={memory.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            title={memory.title}
            />
            <div className={classes.overlay}>
              <Typography variant="h6" onClick={vistOne} style={{cursor:'pointer'}}>{memory.creator || user.name}</Typography>
              <Typography>{moment(memory.createdAt).fromNow()}</Typography>  
            </div>
            
            <div className={classes.overlay2}>
                <Dropdown >
                    <Dropdown.Toggle style={{backgroundColor:'transparent',color:'black',border:'none'}} className="dropdown-basic">
                      <MoreHorizIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{backgroundColor:'gray'}}>
                      { 
                        user._id === memory.creatorId && <Dropdown.Item onClick={()=>editMemo(memory._id)}><EditIcon/> Edit</Dropdown.Item>
                      }
                        <Dropdown.Item onClick={()=>setTrigger(true)}>
                        <Share style={{marginRight:'5px'}}/>Share
                        </Dropdown.Item>
                        {
                           (user?._id !== memory?.creatorId || user?.googleId) && (
                             
                             <Dropdown.Item onClick={()=>setReport(true)}> <Report/> report</Dropdown.Item>
                           )
                        }
                      {
                        (user?._id === memory?.creatorId || user?.googleId) &&
                        (
                          <Dropdown.Item size="small" style={{color:'red'}} onClick={()=>dispatch(deleteMemory(memory._id))}>
                            <DeleteIcon/> Delete
                      </Dropdown.Item>
                        )
                      }
                      </Dropdown.Menu>
              </Dropdown>
            </div>
            <Typography className={classes.title}  gutterBottom variant="h5" component="h2">
                {memory.title}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="black" component="p">
                    {memory.message}
                </Typography>
            <div className={classes.details}>
                <Typography variant="body2" color="primary" component="h2">
                    {memory?.tags?.map(tag=>tag.length === 0 ? ` ` : `#${tag} `)}
                </Typography>
            </div>
            <div className={classes.commentsContainer}>
            <div className={classes.socialContainer}>
               <SocialMedia trigger={trigger} setTrigger={setTrigger} memory={memory}/>
               <ReportPage report={report} setReport={setReport} memory={memory}/>
            </div>
           <Comments commentClicked={commentClicked} setCommentClicked={setCommentClicked} setCarActions={setCarActions} memory={memory} currentId={currentId}/>
            </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
            {
              carActions &&
              <>
                <Button size="small" color="primary" disabled={!user} onClick={() => dispatch(likeMemory(memory._id))}>
                    <Likes/> 
                </Button>
              <Button size="small" color="primary" disabled={!user} onClick={openComments}>
                <Comment/>
                 { memory.comments?.length > 0 ? (
                   memory.comments?.length > 1 ? `${memory.comments?.length} comments` : `${memory?.comments?.length} comment`
                 ) : (
                   'comment'
                 )
                }
              </Button>
              </>
            }
            </CardActions>
        </Card>
    </div>
    )
}

export default Memory
