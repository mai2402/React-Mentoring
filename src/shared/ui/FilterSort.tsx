import DropDownItem from "./DropDownItem";
import { DropDownMenu } from "./DropDownMenu";

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

    const selectedLabel = options.find((option)=> option.value === selectedOption)?.label || "Select an option";

    if (!options || options.length === 0) {
        return <div className="filter-sort-bar">No options available</div>;
    }

    return (
    <DropDownMenu
      trigger={<div className="filter-btn">{label || "Sort by"} {selectedLabel} ▾</div>}
     >
      {options.map((option) => (
        <DropDownItem
          key={option.value}
          onClick={() => onOptionChange(option.value)}
          textOnly
        >
          {option.label} {option.value === selectedOption ? "✔" : ""}
        </DropDownItem>
      ))}

         </DropDownMenu>
    
    );


}