import PropTypes from 'prop-types';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SideSectionButton({ svgIcon, tabName, onClickHandler, isActive=false, isTop=false }) {
    
    let currentBGColor = "bg-primary-cl";
    let marginTop = "mt-5";
    if (isTop) {
        marginTop = "mt-10";
    }
    if (isActive) { 
        currentBGColor = "bg-secondary-cl";
    }

    return (
            <button className={marginTop + " mb-0.5 mx-0.5 p-0.5 w-10 h-10 rounded-lg border-0 hover:border-spacing-1 hover:bg-hover-cl " + currentBGColor} onClick={ ()=>{onClickHandler(tabName)}}>
                <FontAwesomeIcon className="m-[0%] p-[0%] w-[100%] h-[100%]" icon={svgIcon} />
            </button>
    );
}


SideSectionButton.propTypes = {
    svgIcon: PropTypes.object,
    tabName: PropTypes.string,
    onClickHandler: PropTypes.func,
    isActive: PropTypes.bool,
    isTop: PropTypes.bool,
};

export default SideSectionButton;