import { useRef } from "react";
import { ModalHandler } from "../types/types";



export function useModal(){
   const modalRef = useRef<ModalHandler>(null);
  
   const handleOpenModal = () => {
  
      modalRef.current?.onOpen();
   }
  
   const handleCloseModal = () => {
  
      modalRef.current?.onClose();
   }
  
 

   return {modalRef, handleOpenModal, handleCloseModal};
}