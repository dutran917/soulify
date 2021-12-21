import React from 'react'
import {FaUserAlt,FaFacebookF} from 'react-icons/fa'
import {AiTwotoneLock, AiOutlineGooglePlus,AiOutlineTwitter} from 'react-icons/ai'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Redirect } from 'react-router'
import { Spinner } from 'react-bootstrap'
import AlertMessage from './AlertMessage'
import Register from './Register'
function Login({auth}) {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    const {loginUser} = useContext(AuthContext)

    const [loginForm,setLoginForm] = useState({
        username: '',
        password: ''
    })
  
    const [alert,setAlert] = useState(null)

    const {username,password} = loginForm

    const onChangeLoginForm = event => setLoginForm({...loginForm,[event.target.name]: event.target.value})
    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success)
            {     
              
            }
            else{
                setAlert({
                    type: "danger",
                    message: loginData.message
                })
                setTimeout(()=>setAlert(null),3000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //register form

  
    let body
    if(authLoading)
    body = (
        <div className="d-flex justify-content-center mt-2">
            <Spinner animation="border" variant="info"></Spinner>
        </div>
    )
    else if(isAuthenticated) return <Redirect to='/home' />
    else
    body = (
        <>
        {auth === 'login' && 
            <form className="login-form" onSubmit = {login}>
            <h1>LOG IN</h1>
            <AlertMessage info={alert}></AlertMessage>
            <div className="input-login">
                <FaUserAlt size="25px"></FaUserAlt>
                
                <input type="text" placeholder="username" name="username" required value={username} onChange={onChangeLoginForm}/>
            </div>
            <div className="input-login">
                <AiTwotoneLock size="25px"></AiTwotoneLock>
                <input type="password" placeholder="password" name="password" required value={password} onChange={onChangeLoginForm}/>
            </div>
            <input className="btn-login" type="submit" value="Login"/>

            <div className="sns-login">
                <div> <AiOutlineGooglePlus size="30px"></AiOutlineGooglePlus> </div>
                <div> <FaFacebookF size="30px"></FaFacebookF> </div>
                <div> <AiOutlineTwitter size="30px"></AiOutlineTwitter> </div>
            </div>
            <a href='/register'><p> Don't have an account? </p> </a>
            </form> }



            {auth === 'register' && <Register></Register>
            }
        </>
    )

    return (
        <div className="login-register">
            {body}
        </div>
    )
}

export default Login
