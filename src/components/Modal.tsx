import { ModalProps } from "../interfaces/interfaces";
import { createPortal } from "react-dom";



export default function Modal ({children, title,scrollable, isOpen, onClose}: ModalProps){
    

    if (!isOpen) return null;


    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
           <div  onClick={(e) => e.stopPropagation()} className="modal-container">

            <h2 className="modal-title">
            {title}
            </h2>
            <div  className={`modal-content ${scrollable ? 'modal-content--scrollable' : ''}`}>
                {children}
            </div>
         
           </div>
        </div>
        ,
        document.getElementById("modal-root") as HTMLElement

    )



}


