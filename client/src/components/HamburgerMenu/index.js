import React from 'react';
import { Link } from 'react-router-dom'
import './index.css'

export default function HamburgerMenu() {
 return (
    <div className='admLogado'>
        <img src='/images/logado.jpg' alt="" />
        <span>Olá, Usuario</span>

        <ul className='ultPerfilAdm'>
            <Link to='/user/usina'><li>Usina</li></Link>
            <Link to='/user/clients'><li>Clients</li></Link>
            <Link><li>Gerenciar</li></Link>
        </ul>
        <button>Sair</button>
    </div>
 );
}