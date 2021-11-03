import React, { useState, useContext } from 'react';
 
import './login.css'
import ModalError from '../../components/modalError'

import { AuthContext } from '../../contexts/auth';



export default function Login() {

  const { Login } = useContext(AuthContext)

  const [typeInput, setTypeInput] = useState({
    type : 'password',
    img : 'openpassIcon'
  })

  const [loginUser, setLoginUser] = useState('')
  const [passWordUser, setPassWordUser] = useState('')

  const [deuErro, setDeuError] = useState(false)
  const [status, setStatus] = useState('')
  

  function changeImg(){
    
    if(typeInput.type === 'password'){
     return setTypeInput({
        type : 'text',
        img : 'closepassIcon'
      })
    }
    if(typeInput.type === 'text'){
      return setTypeInput({
        type : 'password',
        img : 'openpassIcon'
      })
    }
  }

  async function fazerLogin(){

    try {
      if(loginUser !== '' || passWordUser !== ''){
        Login(loginUser,passWordUser)
      }
    } catch (e) {
      setStatus({
        status: 'Error',
        message: 'não foi possivel logar'
      })
      setDeuError(true)
    }

  }
  return (

  <div className="container">
     <div className="imagemLogo">
        <img src="/images/8590.jpg" alt="" />
     </div>
     <div className="partLogin">
        <h1>Sign in</h1>

        <form className='formLogin'>
          <div className='divInputLogin'>
            <img src="/images/loginLogo.png" alt="" className='loginIcon' />
            <input type="email" name="login" id="ILogin" autoComplete='off' onChange={(e)=>{setLoginUser(e.target.value)}} placeholder='nome de Usuario'/>
          </div>

          <div className='divInputPass'>
            <img src="/images/passIcon.png" alt="" className='passIcon'/>
            <input type={typeInput.type} name="pass" id="IPassword" onChange={(e)=>{setPassWordUser(e.target.value)}} placeholder='digite sua senha'autoComplete="off" />
            <img src={`/images/${typeInput.img}.png`} alt="" className='eyeIcon' onClick={()=>{changeImg()}}/>
          </div>
        </form>
        <button className='buttonLogin' onClick={()=>{fazerLogin()}}>Login</button>
     </div>
    {deuErro === true ? <ModalError closeModal={setDeuError} conclusao={status.status} message={status.message}/> : null}
   </div>
  );
}