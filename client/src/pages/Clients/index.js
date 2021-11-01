import React, {useState, useEffect} from 'react';
import './clients.css'
import HamburgerMenu from '../../components/HamburgerMenu';

export default function Clients() {
  const [hamburger, setHamburger] = useState(false)

  function openHamburger(){
    if (hamburger === false){
      setHamburger(true)
    }
    if (hamburger === true){
      setHamburger(false)
    }
  }
  
  return (
    <>
    <img src="/images/menu.png" alt="Menu" className='menuHam' onClick={()=>{openHamburger()}}/>

    {hamburger ? <HamburgerMenu/> : null}

      <div className="clientsContainer">
        
        <div className="cInput">
          <input type="text" placeholder={'buscar usuario'} />
          <button><img src="/images/lupa.png" alt="" className='cImgBusca' /></button>
        </div>

        <div className="cListar">
          <table className='cTable'>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>id_Usina</th>
              <th>Percentual</th>
              <th>Editar</th>
            </tr>
            <tr className='cTrLista'>
              <td>1</td>
              <td>ana</td>
              <td>1</td>
              <td>30</td>
              <td>
                <button>x</button>
                <button>editar</button>
              </td>
            </tr>
            

          </table>

        </div>

      </div>
    </>
  );
}