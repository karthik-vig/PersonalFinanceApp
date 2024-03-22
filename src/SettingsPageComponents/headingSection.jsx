import PropTypes from 'prop-types';

function Heading({titleText}){
    return (
        <h6
            className="text-lg font-bold text-black/75 my-2"
        >
            {titleText}
        </h6>
    );
}

Heading.propTypes = {
    titleText: PropTypes.string.isRequired,
};

export default Heading;