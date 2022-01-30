import { Typography, Button, Avatar } from "@material-ui/core"
import InputIcon from '@material-ui/icons/Input'
import GitHubIcon from '@material-ui/icons/GitHub'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create'
import { NavStyles } from "./styles"
import memories from '../../images/memories.png'
import { Link, useNavigate } from 'react-router-dom'
import { LOGOUT } from "../../types"
import { useDispatch } from "react-redux"
import { Dropdown } from "react-bootstrap"



const Navbar = ({setUser}) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result._id || user?.result.googleId
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = async() =>{
        dispatch({type:LOGOUT})
        navigate('/')
        setUser(null)
    }
    
    

    return (
        <>
        <NavStyles/>
        <div className='container'>
            <div className='memosImg'>
            <img  src={memories} alt="icon" height="60" />
            <Typography  variant="h2">Memos</Typography>
            </div>
            <div className="userInfo">
                <Typography className='log' >
                  { !user ? 
                  (<Button component={Link} to="/"  variant="contained">login</Button>) 
                  : (
                    <Dropdown >
                    <Dropdown.Toggle style={{backgroundColor:'#E1D9D1',color:'black'}} className="dropdown-basic">
                          <Avatar alt={user?.result.name} src={user?.result.imageUrl} style={{marginRight:'10px',backgroundColor:'blue'}}>
                          {user?.result.name.charAt(0)}
                        </Avatar>
                      {user.result.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='dropItems'>
                      <Dropdown.Item href={`${userId}/creatememory`} className='item'><CreateIcon/> create memo</Dropdown.Item>
                      <Dropdown.Item href="https://github.com/Dawoud2297" target="blank" className='item'><GitHubIcon/> Author</Dropdown.Item>
                      <Dropdown.Item href={`/${userId}/persoprofile`} className='item'><HomeIcon/> proflie</Dropdown.Item>
                      <Dropdown.Item onClick={logout} className='item'><InputIcon/> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                      )}
                </Typography>
            </div>
       </div>
       </> 
    )
}

export default Navbar
