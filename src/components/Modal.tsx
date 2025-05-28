import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalHandler } from "../types/types";
import { ModalProps } from "../types/interfaces";
import { createPortal } from "react-dom";




const Modal = forwardRef<ModalHandler, ModalProps> (({children, title}, ref)=>{
    const[isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
    }))

    if (!isOpen) return null;


    return createPortal(
        <div className="modal-backdrop">
           <div  className="modal-container">

            <h2 className="modal-title">
            {title}
            </h2>
            <div >
                {children}
            </div>
         
           </div>
        </div>
        ,
        document.getElementById("modal-root") as HTMLElement

    )



})


export default Modal;