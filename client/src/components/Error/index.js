import React from 'react';
import './erro.css'

export default function Error({closeModal}) {
 return (
   <div className='erroModal'>
       <div className="modalE">
            <h1>Error</h1>
            <span>mensagem</span>
            <button className='btnClose' onClick={()=>{closeModal(false)}}>Ok</button>
       </div>
   </div>
 );
}