import { useState } from "react"





export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(()=>{

        try{
           const item = localStorage.getItem(key);
           return item ? (JSON.parse(item) as T) : initialValue;

        }catch(error){
           console.error(error);
           return initialValue;
        }
    });


    const setValue = (value: T | ((val:T)=> T)) => {

        try{
         const valueToStore = value instanceof Function ? value(storedValue) : value;
         setStoredValue(valueToStore);
         localStorage.setItem(key, JSON.stringify(valueToStore));
    }
    catch(err){
       console.error(err)
    }
}

    return [storedValue, setValue] as const;

}

