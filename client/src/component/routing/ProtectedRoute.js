import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Route, Redirect } from 'react-router'
import { Spinner } from 'react-bootstrap'
const ProtectedRoute = ({component: Component, ...rest}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    if(authLoading)
    return (
        <div>
            <Spinner animation="border" variant="info"></Spinner>
        </div>
    )

    else return (
        <Route {...rest} render={props => isAuthenticated ? (<> 
            <Component {...rest} {...props} />
        </>) : (<>
            <Redirect to='/login'></Redirect>
        </>) }/>
    )
}

export default ProtectedRoute
