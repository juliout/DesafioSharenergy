
import './erro.css'

export default function ModalError({closeModal, message, conclusao, reload}) {
  
  function isReload(value){
    if(value === true){
      window.location.reload();
    }
  }
  isReload()
 return (
   <div className='erroModal'>
       <div className="modalE">
            <h1>{conclusao}</h1>
            <span>{message}</span>
            <button className='btnClose' onClick={()=>{
              closeModal(false)
              isReload(reload)            
            }}>Ok</button>
       </div>
   </div>
 );
}