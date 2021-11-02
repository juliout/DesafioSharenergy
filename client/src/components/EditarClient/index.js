import React,{ useEffect, useState }  from 'react';
import './editar.css'
import { Api } from '../../api';
import ModalError from '../modalError';


export default function EditarClient({closeModal, idClients}) {
    
    const [idC, setIdC] = useState('')
    const [nomeC, setNomeC] = useState ('')
    const [usinaC, setUsinaC] = useState('')
    const [porcentagemC, setPorcentagemC] = useState('')
    const [status, setStatus] = useState({})

    const [modalErr, setModalErr] = useState(false)

    function atualizarDados(){
        try {        
            Api.post('/listarClientes/updateClient',{
                id: idC,
                nome: nomeC,
                usina : usinaC,
                porcent : porcentagemC
            }).then(()=>{
                setStatus({
                    status : 'Atualizado',
                    message : 'Atualizado com Sucesso'
                })
                setModalErr(true)
            }).catch(response=>{
                setStatus({
                    status : 'error',
                    message : response.data.message
                })
                setModalErr(true)
            })
        } catch (e) {
            setStatus({
                status: 'error',
                message: 'Erro ao atualizar'
            })
            setModalErr(true)
        }
    }

    useEffect(() => {
        function findClient(){
            try {
                Api.post('/listarClientes/findone',{
                    id : idClients
                }).then(data=>{
                    setIdC(data.data._id)
                    setNomeC(data.data.nome)
                    setUsinaC(data.data.usina)
                    setPorcentagemC(data.data.porcentagem)
                })
            } catch (e) {
                
            }           
        }
        findClient()
    },[idClients])
    return (
        <>
        <div className='editarContaine'>
            <div className='editarModal'>
                <h1>Editar</h1>
                <form>
                    
                    <input type="text" value={idC} onChange={(e)=>{setIdC(e.target.value)}} disabled/>
                    <input type="text" value={nomeC} onChange={(e)=>{setNomeC(e.target.value)}}/>
                    <input type="number" max='1' min='0' value={usinaC} onChange={(e)=>{setUsinaC(e.target.value)}}/>
                    <input type="number" max='100' min='1' value={porcentagemC} onChange={(e)=>{setPorcentagemC(e.target.value)}}/>
                </form>
                <div>
                    <button className='btnAtualizar' onClick={()=>{atualizarDados()}}>Atualizar</button>
                    <button className='btnCancelar' onClick={()=>{closeModal(false)}}>Cancelar</button>
                </div>
            </div>

        </div>
        {modalErr === false ? null : <ModalError closeModal={setModalErr} message={status.message} conclusao={status.status} reload={status.status === 'error' ? false : true}/>}
        </>
    );
}