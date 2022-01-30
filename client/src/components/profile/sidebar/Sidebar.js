import { useState } from "react"
import "./sidebar.css"
import React from 'react'
import { Typography } from '@material-ui/core'
import InputIcon from '@material-ui/icons/Input'
import { Avatar } from "@material-ui/core"
import { LOGOUT } from "../../../types"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Sidebar = ({memory}) => {
    const user = JSON.parse(localStorage.getItem('profile'))?.result
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = user?._id || user?.googleId
    const [userInfo, setUserInfo] = useState(false)
    const [visitor, setVisitor] = useState(false)
    
const info = () =>{
        setUserInfo(true)
    if(userInfo){
            setUserInfo(false)
    }
}

const info2 = () =>{
    setVisitor(true)
    if(visitor){
            setVisitor(false)
    }
}
    const logout = async() =>{
        dispatch({type:LOGOUT})
        navigate('/')
    }
    

    const createMemo = () =>{
        navigate(`/${userId}/creatememory`)
    } 

    
    return (
        <div className='container'>
            <Typography>
            <ul>
                <li className='userName'>
                <Avatar alt={user?.name} src={user?.imageUrl} style={{marginRight:'10px',backgroundColor:'blue'}}>
              {memory?.creator.charAt(0)} 
                </Avatar>
                    {memory?.creator}    
                </li>
                {
                    memory.creatorId === user._id && (
                        <>
                        <li className='li2' onClick={createMemo}>create memo</li>
                        </>
                    )
                }
                {
                    memory.creatorId === user._id ? (
                        <>
                        <li className='li2' onClick={info}> info </li>
                        </>
                    ) : (
                        <li className="li2" onClick={info2}>User's info</li>
                    )
                }
                {
                    userInfo && (
                        <div>
                        <li className='li2Child'>Email : {user?.email}</li>
                        <li className='li2Child'>Joined At : {user?.joinedAt}</li>
                        </div>
                    )
                }
                {
                    visitor && (
                        <div>
                        <li className='li2Child'>Joined At : {user?.joinedAt}</li>
                        </div>
                    )
                }
                {
                    memory.creatorId === user._id && (
                        <li onClick={logout} className='liOut'><span style={{marginRight:'20px'}}>logout</span> <InputIcon/></li>
                    )
                }
            </ul>
            </Typography>
        </div>
    )
}

export default Sidebar
