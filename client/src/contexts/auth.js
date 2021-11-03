import { useState, createContext, useEffect } from 'react'
import { Api } from '../api';
import ModalError from '../components/modalError';


export const AuthContext = createContext({})

export default function AuthProvider({ children }){
    const [usuario, setUsuario] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const[modalError, setModalError] = useState(false)
    const [status, setStatus] = useState('')

    useEffect(()=>{
        function loadUsuario(){

            const usuarioStorage = localStorage.getItem('UsuarioSitema')

            if(usuarioStorage){
                setUsuario(JSON.parse(usuarioStorage))
                setLoading(false);
            }
            setLoading(false)
        }
        loadUsuario()
    },[])

    async function Login(email, senha){
        try {
            const response = await Api.post('/login',{
                email: email,
                senha: senha
            })

            console.log(response)
            const data = {
                id: response.data._id,
                email: response.data.email                
            }
            setUsuario(data)
            storageSave(data)
            setLoadingAuth(false)

        } catch (e) {
            setStatus({
                status: 'error',
                message: 'Erro ao Logar'
            })
            setModalError(true)
        }
    }
    function Sair(){
        localStorage.removeItem('UsuarioSitema')
        window.location.reload();
    }

    function storageSave(data){
        localStorage.setItem('UsuarioSitema',JSON.stringify(data))
    }

    return(
        <>
        <AuthContext.Provider
            value={{ 
                signed: !!usuario, 
                usuario, 
                loading,
                Login,
                Sair,
                loadingAuth
                
            }}>
            {children}
        </AuthContext.Provider>
        {modalError === false ? null : <ModalError closeModal={setModalError} conclusao={status.status} message={status.message} /> }
        </>
    )
}