import React, {useState, useEffect} from 'react';
import './clients.css'
import HamburgerMenu from '../../components/HamburgerMenu';
import { Api } from '../../api'

export default function Clients() {
  const [hamburger, setHamburger] = useState(false)
  const [clients, setClients] = useState([])
  const [sInput, setSIput] = useState('')

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
      
    }
  }
  
  useEffect(() => {

    function findClient(){

      Api.get('/listarClientes').then(response => { 
        setClients(response.data)
        console.log(response.data)
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
                    <td>
                      <button>x</button>
                      <button>editar</button>
                    </td>
                  </tr>
                </tbody>
              )
            })
            }

          </table>

        </div>

      </div>
    </>
  );
}