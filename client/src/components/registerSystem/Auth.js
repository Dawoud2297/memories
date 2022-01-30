import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Button,Paper,  Grid, Typography, Container } from '@material-ui/core'  //Paper,
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { signUp,singIn } from '../../action/register'
import Input from './Input'
import useStyles from './styles'
import Navbar from './Navbar'
import { AUTH } from '../../types'
import Icon from './Icons'

export default function Auth() {

    const initialStateData = {firstName : '', lastName : '', email : '', password : '', confirmPassword : ''}
    
    const [formData, setFormData] = useState(initialStateData)
    const [isRegister, setisRegister] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()

    const handleShowPassword = () => setshowPassword(!showPassword)

    
    const handleSubmit = e =>{
        e.preventDefault()
        if(isRegister){
            if(formData.password !== formData.confirmPassword){
                alert('Confirming password faild!')
            }else{
                dispatch(signUp(formData,navigate))
            }
        }else{
            dispatch(singIn(formData,navigate)) 
        }
    }
    


    const switchMode = () =>{
        setFormData(initialStateData)
        setisRegister(prev=>!prev)
        setshowPassword(false)
    }
    
    const loginUsingGoogle = async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type:AUTH, data : {result, token}})
            navigate('/memories')
        } catch (error) {
            console.log(error)
        }
    }
    const googleError = () =>alert('Google Signin was unSuccessfull, try again later')

    const handleChange = e =>{
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    return (
        <>
        <Navbar/>
        <Container>
            <Paper className={classes.div}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {
                        isRegister ? 'Register' : 'Login'
                    }
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            isRegister && (
                                <>
                                <Input name="firstName" label="firstName" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="lastName" handleChange={handleChange} autoFocus half/>
                                </>
                            )
                        }
                        <Input name="email" label="email" handleChange={handleChange} type="email"/>
                        <Input name="password" label="password" handleChange={handleChange} type={
                            showPassword ? 'text' : 'password'
                        }
                        handleShowPassword = {handleShowPassword}
                        />
                        {
                            isRegister && <Input name="confirmPassword" label="confirmPassword" handleChange={handleChange} type="password"/>
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" className={classes.submit} color="primary">
                        {isRegister ? 'register' : 'login'}
                    </Button>
                    {
                        !isRegister && 
                        <GoogleLogin
                        clientId='185710302711-cvtu4g5bl4jfp1un28hnjudg4hlmlpi6.apps.googleusercontent.com'
                        render={(renderProps)=>(
                            <Button 
                        className={classes.googleButton}
                        color='primary'
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon/>}
                        variant='contained'
                        >
                            Log in with Google
                        </Button>
                    )}
                    onSuccess={loginUsingGoogle}
                    onFailure={googleError}
                    cookiePolicy='single_host_origin'
                    />
                }
                            <Button 
                            onClick={switchMode} 
                            className={classes.switch}
                            >
                                {
                                    isRegister ? ' Already have an account? login' : ` Don't have an account? register`
                                }
                            </Button>
                </form>
            </Paper>
            { !isRegister && (
             <Typography>
            <div className={classes.welcome}>
              <span style={{fontSize:'100px'}}> World</span> is yours now.
            </div>
            </Typography>
            )}
        </Container>
    </>
    )
}
