import PropTypes from 'prop-types';

const Logo = ({ size="small" }) => {
    const sizeClasses = {
        small: 'w-10 h-5', 
        medium: 'w-20 h-15',
        large: 'w-50 h-40'
    };

    const appliedSize = sizeClasses[size] || sizeClasses.medium;

    return (
        <div className="flex-1 max-w-lg">
            <img
                className={`${appliedSize} mx-auto`}
                src="https://www.mp.gob.gt/wp-content/uploads/2021/07/MP_logo.png"
                alt="Logo"
            />
        </div>
    );
};

Logo.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Logo;