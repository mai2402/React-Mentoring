import { useState } from "react";
import { useSearchParams } from "react-router-dom";



export function useSessionsFilterSort (){
 
    const[searchParams, setSearchParams] = useSearchParams();
    
    const initialSort = searchParams.get("sort") || "date_desc";

    // Parse initial filter from search params
    const initialFilters: string[] = searchParams.get("level")
        ? searchParams.get("level")!.split(",")
        : [];

    const [filters, setFilter] = useState<{level: string[]}>({
        level: initialFilters
    });

    const [sort, setSort] = useState(initialSort);

 // Function to handle multi filter changes
    const handleFilterChange = (updatedFilters: string[]) => {
            setFilter((prev)=> ({...prev, level: updatedFilters}));
            
            setSearchParams((prev)=>{
                const newFilterParams = new URLSearchParams(prev);

                // Update the 'level' parameter with the new filters
                newFilterParams.set("level", updatedFilters.join(","));

                 // Remove the parameter if no filters are selected
                if (updatedFilters.length === 0) {
                    newFilterParams.delete("level");
                }
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

    return{filters, sort, handleFilterChange, handleSortChange};
}