import PropTypes from 'prop-types';
import './index.css';


function SideSectionButton({ children }) {
    return (
            <button className="m-[10%] p-[0%] w-[80%] h-[5%] rounded-lg border-2" onClick={() => {} }>
                {children}
            </button>
    );
}

SideSectionButton.propTypes = {
    children: PropTypes.node,
};

export default SideSectionButton;