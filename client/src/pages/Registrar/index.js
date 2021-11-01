import React, {useState} from 'react';
import './registrar.css'
import HamburgerMenu from '../../components/HamburgerMenu';

export default function Registrar() {
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


            <div className="rContainer">
                <img src="/images/registrar.png" alt="" className='rImagemLogo'/>
                <form className='rForm'>
                    <input type="text" placeholder='Nome'/>
                    <input type="text" placeholder='Usina'/>
                    <input type="text" placeholder='percentual'/>
                </form>
                <button>Salvar</button>

            </div>


        </>
    );
}