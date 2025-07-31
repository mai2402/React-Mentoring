import { useState } from "react";
import { useSearchParams } from "react-router-dom";



export function useSessionsFilterSort (){
 
    const[searchParams, setSearchParams] = useSearchParams();
    const initialFilter = searchParams.get("filter") || "All";
    const initialSort = searchParams.get("sort") || "date_desc";

    const [filter, setFilter] = useState(initialFilter);
    const [sort, setSort] = useState(initialSort);


    const handleFilterChange = (value: string) => {
            setFilter(value);
            setSearchParams((prev)=>{
                const newFilterParams = new URLSearchParams(prev);
                newFilterParams.set("filter", value);
                return newFilterParams;
            })
        }
    
        const handleSortChange = (value: string) => {
            setSort(value);
            setSearchParams((prev)=>{
                const newSortParams = new URLSearchParams(prev);
                newSortParams.set("sort", value);
                return newSortParams;
            })
        }

    return{filter, sort, handleFilterChange, handleSortChange};
}