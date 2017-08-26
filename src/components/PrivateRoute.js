import {Redirect,Route} from 'react-router-dom';
import React from 'react';
import {isAuthorized} from '../Firebase';

export default function PrivateRoute  ({component:Component, ...rest})  {
    return(  <Route {...rest} render={(props)=>{
            if(isAuthorized()) {
              //console.log("Access to private route granted.");
              return <Component {...rest} {...props}/>;
            } else {
              //console.log("Access to private route denied. Redirecting to login.");
              return  <Redirect to='/login'/>;
            }
          }
        } />
       );
}
