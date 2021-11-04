import React, { useState } from 'react';
import './signup.css'
import { Api } from '../../api';
import ModalError from '../../components/modalError';



export default function SignUp() {
    const [sUsuario, setSUsuario] = useState('')
    const [sSenha, setSSenha] = useState('')
    const [modalErro, setModalErro] = useState(false)
    const [status, setStatus] = useState('')

    function salvarCadastro(){
        
        Api.post('/registrar',{
            usuario : sUsuario,
            senha : sSenha
        }).then((data)=>{
            setStatus({
                status : 'Sucesso',
                message : 'salvo com sucesso'
            })
            setModalErro(true)
        }).catch(()=>{
            setStatus({
                status : 'Erro',
                message : 'Erro ao salvar'
            })
            setModalErro(true)
        })
    }





    return (
        <div className='sigContainer'>
            <div className='modalsigUp'>
                <h1>signUp</h1>
                <form>
                    <input type="text" placeholder='digite o usuario' onChange={(e)=>setSUsuario(e.target.value)}/>
                    <input type="password" placeholder='digite a senha' onChange={(e)=>setSSenha(e.target.value)} autoComplete='off'/>
                </form>
                <button onClick={()=>salvarCadastro()}>Save</button>
            </div>
            {modalErro === false ? null : <ModalError closeModal={setModalErro} conclusao={status.status} message={status.message} redirect={status.status === 'Erro' ? false : true}/>}
        </div>
    );
}