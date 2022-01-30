import { useState } from 'react';
import { Typography } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import { ComStyles } from './comStyles';
import Send from '@material-ui/icons/Send'
import {Form, Button } from 'react-bootstrap';
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { commentOnMemory, likeComm, replyOComment, likeRep, debateCom, likeDeb } from '../../action/memories'
import { useDispatch } from 'react-redux';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'

export default function Comments(props) {
  const [allcomments, setAllcomments] = useState({comment : ''})
  const [reply, setReply] = useState({reply : ''})
  const [debate, setDebate] = useState({debate : ''})
  const [theReply, setTheReply] = useState(false)
  const [replyField, setReplyField] = useState(false)
  const [commentId, setCommentId] = useState(0)
  const [replyId, setReplyId] = useState(0)
  const [debateId, setDebateId] = useState(0)
  const [barOfComment, setBarOfComment] = useState(true)
  const [commentForm, setCommentForm] = useState(true)
  const [commentOnReply, setCommentOnReply] = useState(false)
  const [debateOnDebate, setDebateOnDebate] = useState(false)
  
  const user = JSON.parse(localStorage.getItem('profile')).result
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const closeBut = () =>{
    props.setCommentClicked(false)
    props.setCarActions(true)
    setCommentId(0)
    setReplyField(false)
    setTheReply(false)
    setBarOfComment(true)
    setCommentForm(true)
    setCommentOnReply(false)
  }

  const clear = () =>{
    setAllcomments({comment:''})
  }

  const handleForm = (e) =>{
    e.preventDefault()
    dispatch(commentOnMemory(props.memory._id,allcomments))
    clear()
  }

  const ReplyField = ({name,dispathThings}) => {
    
    const replyForm = (e) =>{
      e.preventDefault()
      dispatch(dispathThings)
      setReply({reply:''})
    }
    
    return (replyField) ? (
      <form onSubmit={replyForm} className='replyform'>
            <textarea
              className='input-group replyfield'
              autoFocus 
              placeholder={`reply to ${name}`}
              style={{resize:'none'}}
              onChange={(e)=>setReply({reply: e.target.value})}
              value={reply.reply}
              >
              </textarea>
            <Button type='submit' className='input-group-append buttonReply'>
              <Send/> Reply
            </Button>
      </form>
    ) : ''
  }
  
  const popupSupportDebate = (id) =>{
    setDebateId(id)
    setCommentOnReply(false)
    setDebateOnDebate(true)
    if(debateOnDebate){
      setDebateOnDebate(false)
    }
  }
  
  const Debates = ({rep,comment}) =>{
    return (
      <div>
          {
            rep?.debates?.length > 0 && (
              rep.debates.map(deb=>(
                <div className='replies'>
                  <div className='replyerName'>
                    {deb.name}
                  </div>
                  <div className='reply'>
                  {deb.debate}
                  </div>
                  <div className='actions'>
            <Button variant='outline' onClick={()=>dispatch(likeDeb(props.memory._id, comment._id,rep._id,deb._id))} className='button'>
            {
              (deb.suporters?.length > 0) ? ( 
                deb.suporters.find((like) => like === (user?.googleId || user?._id))
                ? (
                  <><ThumbUpAltIcon fontSize="small" />&nbsp;{deb.suporters?.length > 2 ? `You and ${deb.suporters?.length - 1} others` : `${deb.suporters?.length} like${deb.suporters?.length > 1 ? 's' : ''}` }</>
                ) : (
                  <><ThumbUpAltOutlined fontSize="small" />&nbsp;{deb.suporters?.length} {deb.suporters?.length === 1 ? 'Like' : 'Likes'}</>
                )
                ) : (
                  <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
                  )
              }   
              </Button>
            <Button variant='outline' className='button' onClick={()=>popupSupportDebate(deb._id)}>
              {
               (deb.suporters?.length > 0) ? 
               (deb.suporters?.length > 1 ? (`${deb.suporters?.length} debate`
               ) : (
                 `${deb.suporters?.length} debate`)
                 ) : (`debate`)
              }
              </Button>
          </div>
                          <div className='replyStuff'>
                            {
                            (debateId === deb._id) && debateOnDebate && (
                                <div className='replyStuffer'>
                                  <DebateField
                                  name={deb.name}
                                  dispathThings={debateCom(props.memory._id,comment._id,rep._id,{debate:`@${deb.name.replace(/ /g,"_")} ${debate.debate}`})}
                                  /> 
                                  </div>
                              )
                            }
                            </div>   
                </div>
              ))
            )
          }
      </div>
    )
  }
  const DebateField = ({name, dispathThings}) =>{
    const debateForm = (e) =>{
      e.preventDefault()
      dispatch(dispathThings)
      setDebate({debate: ''})
    }
    return (   
    <form onSubmit={debateForm} className='replyform'>
    <textarea
      className='input-group replyfield'
      autoFocus 
      placeholder={`Debate with ${name}`}
      style={{resize:'none'}}
      onChange={(e)=>setDebate({debate: e.target.value})}
      value={debate.debate}
      >
      </textarea>
    <Button type='submit' className='input-group-append buttonReply'>
      <Send/> Reply
    </Button>
</form>
    )
    
  }
    
  const EveryReply = ({comment}) =>{
    return (
      <>
      {
      comment.replies?.length > 0 ? (comment.replies.map(rep=>(
        <div className='replies'>
          <div className='replyerName'>
            {rep.name}
          </div>
          <div className='reply'>
            {rep.reply}
          </div>
          <div className='actions'>
            <Button variant='outline' onClick={()=>dispatch(likeRep(props.memory._id,comment._id,rep._id))} className='button'>
            {
              (rep.loves?.length > 0) ? ( 
                rep.loves.find((like) => like === (user?.googleId || user?._id))
                ? (
                  <><ThumbUpAltIcon fontSize="small" />&nbsp;{rep.loves?.length > 2 ? `You and ${rep.loves?.length - 1} others` : `${rep.loves?.length} like${rep.loves?.length > 1 ? 's' : ''}` }</>
                ) : (
                  <><ThumbUpAltOutlined fontSize="small" />&nbsp;{rep.loves?.length} {rep.loves?.length === 1 ? 'Like' : 'Likes'}</>
                )
                ) : (
                  <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
                  )
              }   
              </Button>
            <Button variant='outline' className='button' onClick={()=>popupCommentOnReply(rep._id)}>
              {
               (rep.debates?.length > 0) ? 
               (rep.debates?.length > 1 ? (`${rep.debates?.length} comments`
               ) : (
                 `${rep.debates?.length} comment`)
                 ) : (`comment`)
              }
              </Button>
          </div>
          <div className='replyStuff'>
          {
           (replyId === rep._id)  && (
              <div className='debates'>
              <div>
                <Debates comment={comment} rep={rep}/>
              </div>
              <div className='replyStuffer'>
                {
                   commentOnReply && (
                     <DebateField
                     name={rep.name}
                     dispathThings={debateCom(props.memory._id,comment._id,rep._id,{debate:`@${rep.name.replace(/ /g,"_")} ${debate.debate}`})}
                     /> 
                   )
                }
                </div>
                </div>
            )
          }
          </div>
        </div>
        ))) : (
          <div className='replies'>
            <p>No replies yet</p>
            <div className='replyStuff'>
            </div>
          </div>
        )
      }
      </>
    )
  }

  const popupReplyField = (id) => {
    setCommentId(id)
    setReplyField(true)
    setTheReply(true)
    setCommentForm(false)
    setCommentOnReply(false)
    if(id && theReply){
      setTheReply(false)
      setCommentForm(true)
    } 
  }

  const popupCommentOnReply = (id) => {
    setReplyId(id)
    setCommentOnReply(true)
    setTheReply(false)
    if((id === replyId) && commentOnReply){
      setCommentOnReply(false)
      setTheReply(true)
    }
  }

  return (props.commentClicked) ?
     (
       <div className='popup'>
        <ComStyles/>
       <div className='popup-inner'>
        <div className='comContainer'>
          <div className='commentsTab' id='commentsTab'>
            <Typography>
                    {
                      props.memory.comments ? (props.memory.comments.map(com=>(
                        <>
                        <div className='comments'>
                        <>
                              <div className='commenterName'>
                           <span onClick={()=>navigate(`/${com.id}/persoprofile`)} style={{cursor:'pointer'}}> {com.name}</span> <span style={{fontWeight:'bold',fontSize:'15px',marginLeft:'320px'}}>{moment(com.commentedAt).fromNow()}</span>
                              </div>
                            <div className='comment'>
                            {com.comment} 
                            </div>
                            
                            <div className='actions' key={com._id}>
                                {
                                      (barOfComment) &&  (
                                        <>
                                  <Button variant='outline' className='button'
                                  onClick={() => dispatch(likeComm(props.memory._id,com._id))}>
                                      {
                                        (com.loves?.length > 0) ? ( 
                                          com.loves.find((like) => like === (user?.googleId || user?._id))
                                          ? (
                                            <><ThumbUpAltIcon fontSize="small" />&nbsp;{com.loves?.length > 2 ? `You and ${com.loves?.length - 1} others` : `${com.loves?.length} like${com.loves?.length > 1 ? 's' : ''}` }</>
                                          ) : (
                                            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{com.loves?.length} {com.loves?.length === 1 ? 'Like' : 'Likes'}</>
                                          )
                                          ) : (
                                            <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
                                            )
                                          }
                                  </Button>
                                  <Button variant='outline' className='button' onClick={()=>{popupReplyField(com._id)}}> 
                                  <span style={{marginLeft:'20px'}}>{
                                  com.replies.length > 1 ? `${com.replies.length} replies` : `${com.replies.length} reply`
                                  }</span>
                                  </Button>
                                  </>
                                  )
                                    }
                                  
                            </div>
                        </>
                      </div>
                      {
                        (commentId === com._id) && (
                          <div className='repliesHome'>
                              <EveryReply comment={com}/>
                              {
                                theReply && (
                          <div className='replyStuffOne'>
                                <ReplyField 
                                  name={com.name}
                                  dispathThings={replyOComment(props.memory._id,com._id,{reply:`@${com.name.replace(/ /g,"_")} ${reply.reply}`})}
                                  />
                                </div>
                                  
                                )
                              }
                        </div>
                          )
                        }
                            </>
                    ))) : (<p style={{margin:'20px'}}>No comments yet!</p>)
                  }
            </Typography>
          </div>
          {
            commentForm && (    
          <Form onSubmit={handleForm}>
            <div className='input-group fixed-bottom inputContainer'> 
                        <textarea 
                        className='form-control input' 
                        autoFocus 
                        placeholder='comment'
                        onChange={(e)=>setAllcomments({comment:e.target.value})}
                        value={allcomments.comment}
                        >
                          </textarea> 
                          <Button type='submit' className='input-group-append buttonSub'>
                          <Send/> comment
                          </Button>
            </div>
          </Form>
            )
          }
        </div>
        <div className='kickup'>
             <Button size="small" className='close-btn closeOrder' onClick={closeBut}><ArrowDownward/></Button>                  
        </div>
       </div>
     </div>
  ) : ""   
}