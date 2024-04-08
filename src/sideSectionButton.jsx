import PropTypes from 'prop-types';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function shiftHexValue(hexValue, shiftValue) {
    const hexVal = parseInt(hexValue, 16);
    let shiftedHexVal = hexVal - shiftValue;
    shiftedHexVal = shiftedHexVal < 0 ? 0 : shiftedHexVal;
    return shiftedHexVal.toString(16).padStart(2, '0').toUpperCase();
}

function darkenHexValues(hexValue, shiftValue = 30) {
    const hexVal1 = shiftHexValue(hexValue.substring(1, 3), shiftValue);
    const hexVal2 = shiftHexValue(hexValue.substring(3, 5), shiftValue);
    const hexVal3 = shiftHexValue(hexValue.substring(5, 7), shiftValue);
    return ("#" + hexVal1 + hexVal2 + hexVal3);
}

function SideSectionButton({ svgIcon, onClickHandler, iconColour="#000000", isActive=false}) {
    
    let currentBGColor = "bg-surface-cl";
    let marginTop = "mt-5";
    if (isActive) { 
        currentBGColor = "bg-slate-200";
        iconColour = darkenHexValues(iconColour, 70);
    }

    return (
            <button className={marginTop + " mb-4 mx-0.5 p-0.5 w-[50px] h-[50px] hover:bg-slate-200  " + currentBGColor} onClick={ onClickHandler }>
                <FontAwesomeIcon className="m-[0%] p-[0%] w-[100%] h-[100%]" icon={svgIcon} color={iconColour}/>
            </button>
    );
}


SideSectionButton.propTypes = {
    svgIcon: PropTypes.object,
    onClickHandler: PropTypes.func,
    iconColour: PropTypes.string,
    isActive: PropTypes.bool,
};

export default SideSectionButton;