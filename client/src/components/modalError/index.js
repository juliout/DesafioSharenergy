
import './erro.css'

export default function ModalError({closeModal, message, conclusao, reload, redirect}) {
  
  function isReload(value){
    if(value === true){
      window.location.reload();
    }
  }
  
  function isRedirect(value){
    if(value === true){
      window.location.href = '/'
    }  
  }

 return (
   <div className='erroModal'>
       <div className="modalE">
            <h1>{conclusao}</h1>
            <span>{message}</span>
            <button className='btnClose' onClick={()=>{
              closeModal(false)
              isReload(reload)
              isRedirect(redirect)            
            }}>Ok</button>
       </div>
   </div>
 );
}