import PropTypes from 'prop-types';
import './index.css';


function SideSectionButton({ children, isActive=false }) {
    
    let currentBGColor = "bg-primary-cl";
    if (isActive) { 
        currentBGColor = "bg-secondary-cl";
    }

    return (
            <button className={"my-[30%] mx-[10%] p-[5%] w-[70%] h-[5%] rounded-lg border-0 hover:border-spacing-1 hover:bg-hover-cl " + currentBGColor} onClick={() => {} }>
                {children}
            </button>
    );
}

SideSectionButton.propTypes = {
    children: PropTypes.node,
};
SideSectionButton.propTypes = {
    isActive: PropTypes.bool,
};

export default SideSectionButton;