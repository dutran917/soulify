import React from 'react'
import {FaUserAlt,FaFacebookF} from 'react-icons/fa'
import {AiTwotoneLock, AiOutlineGooglePlus,AiOutlineTwitter} from 'react-icons/ai'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from './AlertMessage'
const Register = () => {
    const [registerForm,setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const {registerUser} = useContext(AuthContext)
    const [alert,setAlert] = useState(null)
    
    const {username,password,confirmPassword} = registerForm
    const onChangeRegisterForm = event => setRegisterForm({...registerForm,[event.target.name]: event.target.value})
    const register = async event => {
        event.preventDefault()
        if(password != confirmPassword)
        {
            setAlert({type:'danger',message:'Password do not match'})
            setTimeout(()=>setAlert(null),3000)
            return
        }
        try {
            const registerData = await registerUser(registerForm)
            if(!registerData.success)
            {
                setAlert({
                    type: "danger",
                    message: registerData.message
                })
                setTimeout(()=>setAlert(null),3000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="login-form" onSubmit={register}>
            <h1>REGISTER</h1>
            <AlertMessage info={alert}></AlertMessage>
            <div className="input-login">
                <FaUserAlt size="25px"></FaUserAlt>
                
                <input type="text" placeholder="username" name="username" required value={username} onChange={onChangeRegisterForm}/>
            </div>
            <div className="input-login">
                <AiTwotoneLock size="25px"></AiTwotoneLock>
                <input type="password" placeholder="password" name="password" required value={password} onChange={onChangeRegisterForm}/>
            </div>
            <div className="input-login">
                <AiTwotoneLock size="25px"></AiTwotoneLock>
                <input type="password" placeholder="confirm password" name="confirmPassword" required value={confirmPassword} onChange={onChangeRegisterForm}/>
            </div>
            <input className="btn-login" type="submit" value="Register"/>

            <div className="sns-login">
                <div> <AiOutlineGooglePlus size="30px"></AiOutlineGooglePlus> </div>
                <div> <FaFacebookF size="30px"></FaFacebookF> </div>
                <div> <AiOutlineTwitter size="30px"></AiOutlineTwitter> </div>
            </div>
            <a href='/login'> Already have an account? </a>
            </form> 
    )
}

export default Register
