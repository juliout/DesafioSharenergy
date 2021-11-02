import React from 'react';
import './deletarConfirm.css'
import { Api } from '../../api';

export default function DeletConfirm({closeModal, idClients}) {

function deletarCliente(id){
    try {
        Api.post('/listarClientes/deletarCliet',{
            id: id
        }).then(()=>{
            window.location.reload();
            closeModal(false)
        })
    } catch (e) {
        
    }
}
    return (
        <div className='deletContainer'>
            <div className="dModal">
                <h1>Deseja deletar?</h1>
                <div>
                    <button className='btnConfirm' 
                    onClick={()=>{deletarCliente(idClients)}}>
                    Confirmar
                    </button>
                    
                    <button 
                    className='btnCancel' 
                    onClick={()=>{closeModal(false)}}>
                    Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}