
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){

    const { signed } = useContext(AuthContext)
    
    const loading = false;

    if(loading){
        return(
        <div></div>
    )
    }

    if(!signed && isPrivate){
        return <Redirect to="/" />
    }

    if(signed && !isPrivate){
        return <Redirect to="/user/painel" />
    }


    return(
    <Route
        {...rest}
        render={ props => (
            <Component {...props} />
        )}
    />
    )
}