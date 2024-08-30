import PropTypes from 'prop-types';

const Title = ({ text }) => {
    return (
        <h1 className="text-2xl font-semibold text-center text-gray-800 my-4">
            {text}
        </h1>
    );
};

Title.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Title;