import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getLoggedInStatus } from '../api/user-service';



const PrivateRoute = ({ component: Component, data, ...rest }: any) => (
    <Route {...rest} render={props => {
        const isLoggedIn: boolean = getLoggedInStatus()
        console.log("isLoggedIn:-", isLoggedIn);

        if (!isLoggedIn) {
            // not authorized redirect to login page
            return <Redirect to={'/auth'} />
        }

        // authorised so return component
        return <Component {...props} {...data} />
    }} />
)

export default PrivateRoute