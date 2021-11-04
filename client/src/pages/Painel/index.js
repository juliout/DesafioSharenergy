import React, { useState, useContext } from 'react';
import './painel.css'
import { Link } from 'react-router-dom'
import HamburgerMenu from '../../components/HamburgerMenu';
import { AuthContext } from '../../contexts/auth';

export default function Painel() {

  const { Sair } = useContext(AuthContext)
  const [hamburger, setHamburger] = useState(false)
  
  function openHamburger(){
    if(hamburger === false){
      setHamburger(true)
    }
    if(hamburger === true){
      setHamburger(false)
    }
  }
  return (
    <>
    <img src="/images/menu.png" alt="Menu" className='menuHam' onClick={()=>{openHamburger()}}/>

    {hamburger ? <HamburgerMenu/> : null}

    <div className='perfilContainer'>
      <Link to='/user/usina'>
        <div className='link'>
          <img src="/images/usina.png" alt="" className='imgLink'/>
          <span className='spanLink'>Setor de progresso da usina</span>
        </div>
      </Link>
      <Link to='/user/clients'>
        <div className='link'>
          <img src="/images/users.png" alt="" className='imgLink'/>
          <span className='spanLink'>Especificações dos Usuarios</span>
        </div>
      </Link>
      <Link to='/user/registrar'>
        <div className='link'>
          <img src="/images/registrar.png" alt="" className='imgLink'/>
          <span className='spanLink'>Registrar novo cliente</span>
        </div>
      </Link>
      <div onClick={()=>{Sair()}}>
        <div className='link'>
          <img src="/images/exit.png" alt="" className='imgLink'/>
          <span className='spanLink'>Sair</span>
        </div>
      </div>

    </div>
    </>
  );
}