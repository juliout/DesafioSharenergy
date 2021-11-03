import { Switch } from 'react-router-dom'
import Route from './Route'

import Login from '../pages/Login'

import Painel from '../pages/Painel'
import Usina from '../pages/Usina';
import Clients from '../pages/Clients'
import Registrar from '../pages/Registrar';

export default function Routers() {
    return (    
        <Switch>
            <Route exact path='/' component={Login}/>

            <Route exact path='/user/painel' component={Painel} isPrivate/>
            <Route exact path='/user/usina' component={Usina} isPrivate/>
            <Route exact path='/user/clients' component={Clients} isPrivate/> 
            <Route exact path='/user/registrar' component={Registrar} isPrivate/>        
        </Switch>    
    );
}