//------------------------------------------------------------------------
// PublicRoute.js
// Author: Christopher Bate
// Description: Used instead of <Route> in order to disallow users that
// are already logged in from seing a public view (usually, splash page, login page, etc)
//------------------------------------------------------------------------
import {Redirect,Route} from 'react-router-dom';
import React from 'react';
import {isAuthorized} from '../Firebase';

export default function PublicRoute ({component:Component, authorized, ...rest})  {
    return(  <Route {...rest} render={ function(props){
            if(isAuthorized()) {
              //console.log("Redirecting to map.");
              return <Redirect to="/main" {...props}/>;
            } else {
              //console.log("Loading target public route.");
              return <Component {...props}/>;
            }
          }
        }
      /> );
}
