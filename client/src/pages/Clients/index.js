import React, {useState, useEffect} from 'react';
import './clients.css'
import HamburgerMenu from '../../components/HamburgerMenu';
import { Api } from '../../api'
import ModalError from '../../components/modalError';
import DeletConfirm from '../../components/DeletConfirm';
import EditarClient from '../../components/EditarClient';

export default function Clients() {
  const [hamburger, setHamburger] = useState(false)
  const [clients, setClients] = useState([])
  const [sInput, setSIput] = useState('')

  const [modal, setModal] = useState(false)
  const [status, setStatus] = useState(false)

  const [modalDeletar, setmodalDeletar] = useState(false)
  const [idClient, setIdClient] = useState('')

  const [modalEditar, setModalEditar] = useState(false)
  
  const [producaoTotal , setProducaoTotal] = useState('')


  function openHamburger(){
    if (hamburger === false){
      setHamburger(true)
    }
    if (hamburger === true){
      setHamburger(false)
    }
  }

  function buscarClient(value){
    try {
      Api.post('/listarClientes/find',{
        name: value
      }).then( data => {
        setClients(data.data)
      })
    } catch (e) {
      setStatus({
        status:'Error',
        message: e.response.data.message
      })
      setModal(true)      
    }
  }

  function dividir( base, divisor ){
    return base / divisor
  }

  function calcularGanhos(){
    
    
    
    Api.get('/dadosUsina').then((response)=>{
    
    const data = response.data
    
    const arrayIntervalo = []
    const arrayPotencia = []

    let count = 1
    let indexTotal = 0
    
    data.forEach((rest) => {

      if(data[count]){
        let resultado = data[count].tempo_h - rest.tempo_h

        arrayIntervalo.push(resultado)
        arrayPotencia.push(rest.potencia_kW)

        count++
        indexTotal++
      }else{
        arrayIntervalo.push(0)
      }

    })
    

    const somaIntervalo = arrayIntervalo.reduce((acc, elem) => acc + elem , 0)
    const mediaIntervalo = somaIntervalo / indexTotal

    const somaPotencia = arrayPotencia.reduce((acc, elem) => acc + elem , 0)
    
    const producaoTotal = mediaIntervalo * somaPotencia
    
    const valorTotal =  producaoTotal * 0.95    
    setProducaoTotal(valorTotal)
    })
  }
  
  useEffect(() => {

    function findClient(){

      Api.get('/listarClientes').then(response => { 
        setClients(response.data)
        calcularGanhos()
      }).catch( e =>{
        setStatus({
          status:'Error',
          message: e.response.data.message
        })
        setModal(true)
      })
    }
    findClient() 

  },[])

  return (
    <>
    <img src="/images/menu.png" alt="Menu" className='menuHam' onClick={()=>{openHamburger()}}/>

    {hamburger ? <HamburgerMenu/> : null}

      <div className="clientsContainer">
        
        <div className="cInput">
          <input type="text" placeholder={'buscar usuario'} onChange={(e)=>setSIput(e.target.value)} />
          <button onClick={()=>{buscarClient(sInput)}}><img src="/images/lupa.png" alt="" className='cImgBusca' /></button>
        </div>

        <div className="cListar">
          <table className='cTable'>
            <thead>
              <tr>
                <th>id</th>
                <th>Nome</th>
                <th>id_Usina</th>
                <th>Percentual</th>
                <th>Ganhos</th>
                <th>Editar</th>
              </tr>
            </thead>

            {clients.map( client => {
              return(
                <tbody className='cTrLista' key={client._id}>
                  <tr>
                    <td>{client._id}</td>
                    <td>{client.nome}</td>
                    <td>{client.usina}</td>
                    <td>{client.porcentagem}%</td>
                    <td>R$ {Math.round(dividir(producaoTotal, client.porcentagem))}</td>
                    <td>
                      <button onClick={()=>{
                        setIdClient(client._id)
                        setmodalDeletar(true)
                      }}>x</button>
                      <button onClick={()=>{
                        setIdClient(client._id)
                        setModalEditar(true)
                      }}
                      
                      >
                        editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              )
            })
            }

          </table>

        </div>

      </div>
      {modal === false ? null : <ModalError closeModal={setModal} message={status.message} conclusao={status.status}/>}
      {modalDeletar === false ? null : <DeletConfirm idClients={idClient} closeModal={setmodalDeletar}/>}
      {modalEditar === false ? null : <EditarClient closeModal={setModalEditar} idClients={idClient}/>}
    </>
  );
}