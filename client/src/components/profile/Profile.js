import "./profile.css"
import React,{useEffect} from 'react'
import Sidebar from "./sidebar/Sidebar";
import PersoPosts from './persoPosts/PersoPosts';
import { Grid} from "@material-ui/core"
import { useSelector, useDispatch } from 'react-redux'
import { displayMemories } from '../../action/memories'
import { useParams } from "react-router-dom";

const Profile = ({setCurrentId,currentId}) => {
    const memories = useSelector(state=>state.memories)
    
    const dispatch = useDispatch()
    const {  id } = useParams()
    const user = {id}
    console.log({id})
    useEffect(()=>{
        dispatch(displayMemories())
    },[dispatch])


    return (
    <div className='bigestContainer'>
        <Grid container alignItems="stretch" spacing={3}>
                {
                        memories.map(memo=>(
        <>
        <div className='motherContainer'>
                                {user.id === memo.creatorId && (
                                    <Sidebar memory={memo} />
                                )}
                            </div>
                            <div className='posts'>
                                        {user.id === memo.creatorId && ( 
                                            <Grid key={memo._id} item xs={12} sm={6} md={6}>
                                            <PersoPosts memory={memo} setCurrentId={setCurrentId} currentId={currentId}/>
                                            </Grid>
                                         )} 
                                </div>
                                <div style={{float:'right'}}>
                                   
                                </div>
                     </>
                        
                        ))
                    }      
                    </Grid>
    </div>
    )
}

export default Profile
