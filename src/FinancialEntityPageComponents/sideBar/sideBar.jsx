//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../../index.css';
import GenericSideBar from '../../pageLayoutComponents/genericSideBar.jsx';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items

function SideBar({ items, handleItemClick}) {

    const genericItems = items.map((item) => {
        let fontColor = "text-green-500";
        if (item.transactionType === "out") fontColor = "text-red-500";
        return (
            {
                id: item.id, //uuid4
                title: item.title + " (" + item.transactionType + ")", 
                subTitle: "Transaction Date: " + item.transactionDate + " . " + "Value: " + item.value, 
                titleFontColor: fontColor, 
                icon: item.icon
            }
        );
    
    } );

    return (
        <GenericSideBar 
            items={genericItems} 
            handleItemClick={handleItemClick}
        />
    
    );
}

SideBar.propTypes = {
    items: PropTypes.array,
    handleItemClick: PropTypes.func,
};

export default SideBar;