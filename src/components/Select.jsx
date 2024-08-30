import React from "react";
import PropTypes from "prop-types";

const Select = React.forwardRef(
    ({ label, options, onChange, placeholder, ...rest }, ref) => {
    return (
        <div>
            <label className="font-medium">{label}</label>
        <select
            required={true}
            onChange={onChange}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ref={ref}
            {...rest}
        >
            <option disabled>
                {placeholder}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </div>
    );
});

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
};

Select.displayName = "Select";

export default Select;
