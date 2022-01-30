import React from 'react'
import { NavStyles } from './NavStyles'
import { Typography } from '@material-ui/core'
import a2m from '../../images/a2m.jpg'


const Navbar = () => {
    return (
        <>
        <NavStyles/>
        <div className="navContainer">
                <Typography>
            <div className="logo">
            <img src={a2m} alt="icon" height="60" style={{marginRight:'2px'}} />
            <span style={{color:'red'}}>A2M</span>BROTHERS
            </div>
                </Typography>
        </div>
        </>
    )
}

export default Navbar
