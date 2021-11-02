import React from 'react';
import './erro.css'

export default function ModalError({closeModal, message, conclusao}) {
 return (
   <div className='erroModal'>
       <div className="modalE">
            <h1>{conclusao}</h1>
            <span>{message}</span>
            <button className='btnClose' onClick={()=>{closeModal(false)}}>Ok</button>
       </div>
   </div>
 );
}