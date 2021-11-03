import React,{useContext} from 'react';
import { Link } from 'react-router-dom'
import './index.css'
import { AuthContext } from '../../contexts/auth';

export default function HamburgerMenu() {

    const { Sair } = useContext(AuthContext)

 return (
    <div className='admLogado'>
        <img src='/images/logado.jpg' alt="" />
        <span>Olá, Usuario</span>

        <ul className='ultPerfilAdm'>
            <Link to='/user/usina'><li>Usina</li></Link>
            <Link to='/user/clients'><li>Clients</li></Link>
            <Link to='/user/registrar'><li>Registrar</li></Link>
            <Link to='/user/painel'><li>Painel</li></Link>
        </ul>
        <button onClick={()=> Sair()} >Sair</button>
    </div>
 );
}