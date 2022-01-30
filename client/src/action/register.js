import { register, login } from "../http-common";
import { AUTH } from "../types";


export const signUp = (registerData,navigate) => async (dispatch) =>{
    try {
        const  { data } = await register(registerData)
        if(data === 'email already exist'){
            alert('email already exist')
        }else if(data === "\"password\" length must be at least 10 characters long"){
            alert('Password is too short')
        }else{
            dispatch({type: AUTH, data})
            alert('Successfully registered')
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
    }
}

export const singIn = (loginData, navigate) => async (dispatch) =>{
    try {
        const { data } = await login(loginData)
        if(data === "email does not exist!"){
            alert("email does not exist!")
            window.location.reload()
        }else if(data === "Wrong password"){
            alert("Wrong password")
        }else{
            dispatch({type:AUTH, data})
            navigate('/memories')
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
        
    }
}