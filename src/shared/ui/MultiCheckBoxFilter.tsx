interface MultiCheckBoxFilterProps {
    options : string[];
    selectedOptions : string[];
    onOptionChange : (value : string[]) => void;
    label?: string;
    className?: string;
}

export function MultiCheckBoxFilter({options, selectedOptions, onOptionChange, label} : MultiCheckBoxFilterProps) {

    const handleChange = (value : string) => {
        const isSelected = selectedOptions.includes(value);
        const newSelectedOptions = isSelected
            ? selectedOptions.filter(option => option !== value)
            : [
                ...selectedOptions,
                value
            ];
        onOptionChange(newSelectedOptions);
    }

    return (
        <div className="multi-checkbox-filter">
            { label &&
             <p className="multi-checkbox-filter__label">
                <strong>{label}</strong>
             </p>
            }

            <div className="multi-checkbox-filter__options">
                {options.map((option) => (
                    <label key={option} className="multi-checkbox-filter__item">
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleChange(option)}/>
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>

    )
}