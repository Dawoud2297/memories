import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import Share from '@material-ui/icons/Share'
import Send from '@material-ui/icons/Send'
import Comment from '@material-ui/icons/Comment'
import EditIcon from '@material-ui/icons/Edit'
import Report from '@material-ui/icons/Report';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Dropdown } from "react-bootstrap"
import SocialMedia from '../../socialMedia/SocialMedia'
import Comments from '../../comments/Comments';
import moment from 'moment'
import useStyles from './styles'
import { likeMemory, deleteMemory } from '../../../action/memories';


const PersoPosts = ({memory,setCurrentId,currentId}) => {
  const [commentClicked, setCommentClicked] = useState(false)
  const [carActions, setCarActions] = useState(true)

    const user = JSON.parse(localStorage.getItem('profile')).result
    const userId = user?._id || user?.googleId
    const [trigger, setTrigger] = useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()
    const navigate = useNavigate()

    const Likes = () => {
        if (memory.likes.length > 0) {
          return memory.likes.find((like) => like === (user?.googleId || user?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{memory.likes.length > 2 ? `You and ${memory.likes.length - 1} others` : `${memory.likes.length} like${memory.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{memory.likes.length} {memory.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
 
      const openComments = () =>{
        setCommentClicked(true)
        setCarActions(false)
      }


      const editMemo = (id) =>{
        navigate(`/${userId}/creatememory`)
        setCurrentId(id)
      }


    return (
        <div>
            <div>
        <Card className={classes.card}>
            <CardMedia 
            className={classes.media}
            image={memory.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            title={memory.title}
            />
            <div className={classes.overlay}>
              <Typography variant="h6">{memory.creator || user.name}</Typography>
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
                      <Dropdown.Item href="#/action-1"><Report/> report </Dropdown.Item>
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
                <Typography variant="body2" color="textSecondary" component="p">
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
                <Comment/> Comment
              </Button>
                <Button size="small" color="primary" disabled={!user} >
                <Send/> Share
              </Button>
              </>
            }
            </CardActions>
        </Card>
    </div>
        </div>
    )
}

export default PersoPosts
