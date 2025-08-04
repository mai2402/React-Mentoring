import { useEffect, useState } from "react";
import { DropDownMenu } from "./DropDownMenu";

interface MultiCheckBoxFilterProps {
    options : string[];
    selectedOptions : string[];
    onOptionChange : (value : string[]) => void;
    label?: string;
    className?: string;
}

export function MultiCheckBoxFilter({options, selectedOptions, onOptionChange, label} : MultiCheckBoxFilterProps) {
  const [tempSelectedOptions, setTempSelectedOptions] = useState<string[]>(selectedOptions);

  // Update the local state when selectedOptions prop changes
    useEffect(()=>{
        setTempSelectedOptions(selectedOptions);
    },[selectedOptions])




    const handleChange = (value : string) => {
        const isSelected = tempSelectedOptions.includes(value);
        const newSelectedOptions = isSelected
            ? tempSelectedOptions.filter(option => option !== value)
            : [
                ...tempSelectedOptions,
                value
            ];
        setTempSelectedOptions(newSelectedOptions);
    }

    
    const handleApply = () =>{
         onOptionChange(tempSelectedOptions)
    }

     const selectedLabel = selectedOptions.length > 0
    ? selectedOptions.join(", ")
    : "All";

    return (
   <DropDownMenu
      trigger={
        <div className="filter-btn">
          {label ? `${label}: ` : ""}{selectedLabel} ▾
        </div>
      }
    >
     
        {options.map((option) => (
      <div className="full-width" key={option}>
          <label >
            <input
              type="checkbox"
              checked={tempSelectedOptions.includes(option)}
              onChange={() => handleChange(option)}
              />
            <span>{option}</span>
          </label>
              </div>
       
        ))}
          <button className="apply-btn" onClick={handleApply}>
             Apply Filters
          </button>
     
    </DropDownMenu>


    )
}