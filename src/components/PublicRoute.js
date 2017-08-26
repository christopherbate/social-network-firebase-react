import {Redirect,Route} from 'react-router-dom';
import React from 'react';
import {isAuthorized} from '../Firebase';

export default function PublicRoute ({component:Component, authorized, ...rest})  {
    return(  <Route {...rest} render={ function(props){
            if(isAuthorized()) {
              //console.log("Redirecting to map.");
              return <Redirect to="/map" {...props}/>;
            } else {
              //console.log("Loading target public route.");
              return <Component {...props}/>;
            }
          }
        }
      /> );
}
