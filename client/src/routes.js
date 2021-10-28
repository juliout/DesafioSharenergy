import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './pages/Login'
import Painel from './pages/Painel'
import Usina from './pages/Usina';
import Clients from './pages/Clients'

export default function Routes() {
    return (
    <BrowserRouter>
    <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/user/painel' component={Painel}/>
        <Route exact path='/user/usina' component={Usina}/>
        <Route exact path='/user/clients' component={Clients}/>        
    </Switch>
    </BrowserRouter>
    );
}