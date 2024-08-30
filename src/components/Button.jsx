import PropTypes from "prop-types"; // Importa prop-types

const Button = ({ text }) => {
    return (
        <button type="submit" className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;
