import { useCallback, useState } from "react";


export function useModal<T = void> (){

    const [isOpenModal , setIsOpenModal] = useState(false);
    const [payload, setPayload] = useState<T | null>(null);


    const open = useCallback((data:T)=>{
        setIsOpenModal(true);
        if(data) setPayload(data)

    },[]);

    const close = useCallback(()=>{
        setIsOpenModal(false);
        setPayload(null)
    },[]);

    return {close, open, isOpenModal, payload}
    
}