import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
    ({ label, type = "text", required = false, ...rest }, ref) => {
        return (
            <div>
                <label className="font-medium">{label}</label>
                <input
                    type={type}
                    required={required}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    ref={ref}
                    {...rest}
                />
            </div>
        );
    }
);

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
};

Input.displayName = "Input";

export default Input;
