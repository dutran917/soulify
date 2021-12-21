import { createContext, useReducer,useEffect } from "react"
import axios from "axios"
import {authReducer} from '../reducer/authReducer'
import setAuthToken from "../utils/setAuthToken"
export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer,{
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    //authenticated user
    const loadUser = async () => {
        if(localStorage['spotify']){
            setAuthToken(localStorage['spotify'])
        }
        try {
            const response = await axios.get('http://localhost:5000/api/auth')
            if(response.data.success)
            {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user : response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem('spotify')
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user : null
                }
            })
        }
    }

    useEffect(()=> loadUser(),[])

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',userForm)
            if(response.data.success)
                localStorage.setItem('spotify',response.data.accessToken)

            await loadUser()    
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data  
            else return {success: false, message: error.message}
        }
    }

    //register
    const registerUser = async userForm => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register',userForm)
            if(response.data.success)
                localStorage.setItem('spotify',response.data.accessToken)

            await loadUser()    
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data  
            else return {success: false, message: error.message}
        }
    }

    //logout
    const logoutUser = () => {
        localStorage.removeItem('spotify')
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user : null
            }
        })
    }

    const authContextData = {loginUser, registerUser, logoutUser , authState}

    return (
        <AuthContext.Provider value = {authContextData}>
            {children}
        </AuthContext.Provider>
    )
    
        // <AuthContext.Provider value={authContextData}>
        //     {children}
        // </AuthContext.Provider>
    
}

export default AuthContextProvider