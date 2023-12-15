import PropTypes from 'prop-types';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function GenericIconButton({ svgIcon, btnName, onClickHandler }) {
    
    let currentBGColor = "bg-primary-cl";
    let marginTop = "mt-0.5";

    return (
            <button className={marginTop + " mb-0.5 mx-0.5 p-0.5 w-10 h-10 rounded-lg border-0 hover:border-spacing-1 hover:bg-hover-cl " + currentBGColor} onClick={ ()=>{onClickHandler(btnName)}}>
                <FontAwesomeIcon className="m-[0%] p-[0%] w-[100%] h-[100%]" icon={svgIcon} />
            </button>
    );
}


GenericIconButton.propTypes = {
    svgIcon: PropTypes.object,
    btnName: PropTypes.string,
    onClickHandler: PropTypes.func,
};

export default GenericIconButton;