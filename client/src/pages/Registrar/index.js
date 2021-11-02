import React, {useState} from 'react';
import './registrar.css'
import HamburgerMenu from '../../components/HamburgerMenu';
import { Api } from '../../api'
import ModalError from '../../components/modalError';

export default function Registrar() {

    const [hamburger, setHamburger] = useState(false)
    const [nome, setNome] = useState('')
    const [usina, setUsina] = useState('')
    const [percentual, setPercentual] = useState(0)
    const [modal, setModal] = useState(false)
    const [status, setStatus] = useState({})

    const novoCliente = {
      name: nome,
      usina : parseInt(usina),
      porcent : parseInt(percentual)
    }

    function openHamburger(){
        if (hamburger === false){
          setHamburger(true)
        }
        if (hamburger === true){
          setHamburger(false)
        }
    }
    
    function CadastrarCliente(value){

      try {
        if(value.name === '' || value.usina === '' || value.porcent === '' ){
          throw new Error('nenhum campo pode estar vazio')
        } 
        if(value.name.length > 50){
          throw new Error('Nome com no max 50 caracters')
        }
        if(isNaN(value.usina)){
          throw new Error('valor de usina deve ser numerico')
        }
        if(isNaN(value.porcent)){
          throw new Error('valor de porcentagem deve ser numerico')
        }
        if(value.porcent > 100){
          throw new Error('porcentagem no maximo 100')
        }

        Api.post('/novoUsuario',{
          name : value.name,
          usina : value.usina,
          percentual : value.porcent
        }).then(()=>{
            setStatus({
              status: 'Concluido',
              message: 'Cliente Cadastrado'
            })
            setModal(true)
        }).catch( e =>{
            setStatus({
              status: 'Error',
              message: e.response.data.message
            })
            setModal(true)
        })

      } catch (e) {
        setStatus({
          status: 'Error',
          message: e.message
        })
        setModal(true)
        
      }
    }      

    return (
        <>
          <img src="/images/menu.png" alt="Menu" className='menuHam' onClick={()=>{openHamburger()}}/>

          {hamburger ? <HamburgerMenu/> : null}


          <div className="rContainer">
              <img src="/images/registrar.png" alt="" className='rImagemLogo'/>
              <form className='rForm'>
                  <input type="text" placeholder='Nome' onChange={(e)=>{ setNome(e.target.value) }}/>
                  <input type="number" placeholder='Usina' onChange={(e)=>{ setUsina(e.target.value) }}/>
                  <input type="number" max='100' placeholder='percentual' onChange={(e)=>{ setPercentual(e.target.value) }}/>
              </form>
              <button onClick={()=>{CadastrarCliente(novoCliente)}}>Salvar</button>

          </div>

          {modal === true ? <ModalError closeModal={setModal} message={status.message} conclusao={status.status}/> : null}
        </>
    );
}