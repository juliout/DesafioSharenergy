import React, {useState} from 'react';
 
import './login.css'
import { Api } from '../../api'
import Error from '../../components/Error'


export default function Login() {

  const [typeInput, setTypeInput] = useState({
    type : 'password',
    img : 'openpassIcon'
  })
  const [loginUser, setLoginUser] = useState('')
  const [passWordUser, setPassWordUser] = useState('')
  const [deuErro, setDeuError] = useState(false)

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
    try{
      const response = await Api.post('/user',{
        usuario : loginUser,
        senha : passWordUser
      })
    }catch (e){
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
            <input type="text" name="login" id="ILogin" autoComplete='off' onChange={(e)=>{setLoginUser(e.target.value)}}/>
          </div>

          <div className='divInputPass'>
            <img src="/images/passIcon.png" alt="" className='passIcon'/>
            <input type={typeInput.type} name="password" id="IPassword" onChange={(e)=>{setPassWordUser(e.target.value)}}/>
            <img src={`/images/${typeInput.img}.png`} alt="" className='eyeIcon' onClick={()=>{changeImg()}}/>
          </div>
        </form>
        <button className='buttonLogin' onClick={()=>{fazerLogin()}}>Login</button>
     </div>
    {deuErro === true ? <Error closeModal={setDeuError}/> : null}
   </div>
 );
}