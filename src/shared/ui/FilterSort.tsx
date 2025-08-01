type option = {
    value: string;
    label: string;
};

interface FilterSortProps {
    options: option[];
    selectedOption: string;
    onOptionChange: (value: string) => void;
    label?: string;
    classname?: string;

}

export function FilterSort({
    options,
    selectedOption, 
    onOptionChange,
    label,
} : FilterSortProps) {

    return (
         <>
      
     <div className="filter-sort-bar">
        <label>
               {label && <span>{label}</span>}
            <select value={selectedOption} onChange={(e) => onOptionChange(e.target.value)}>
                {options?.map((option)=>(
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>))
                    }
            </select>
        </label>

       
    </div> 
    </>
    );


}