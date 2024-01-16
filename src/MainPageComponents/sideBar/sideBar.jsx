//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import PropTypes from 'prop-types';
import '../../index.css';
import GenericSideBar from '../../pageLayoutComponents/genericSideBar.jsx';
import { handleSelectItemClick } from '../../stateManagement/mainPageStates/selectedItem.js';
import { showFailBox } from '../../stateManagement/mainPageStates/failBoxDisplay.js';
//import { triggerSearch } from '../../stateManagement/mainPageStates/triggerSearch.js';
import { setCurrentSelectedItem } from '../../stateManagement/mainPageStates/currentSelectedItem.js';
import { useSelector,
         useDispatch,
 } from 'react-redux';
import { useEffect } from 'react';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items

function SideBar() {

    const sideBarItems = useSelector((state) => state.sideBarItems);
    const currentSelectedItemState = useSelector((state) => state.currentSelectedItemState);
    const dispatch = useDispatch();

    //get the selecteded item data from the main process
    useEffect(() => {
        if (currentSelectedItemState === null) return;
        console.log("currentSelectedItemState is not null, triggering getSelectedItem")
        console.log(currentSelectedItemState);
        window.transactionOperations.getSelectedItem(currentSelectedItemState).then((selectedItem) => {
            if (selectedItem === null) {
                console.log("selectedItem is null, triggering fail box");
                dispatch(showFailBox());
            }
            dispatch(handleSelectItemClick(selectedItem));
        });
    }, [currentSelectedItemState,
        dispatch,
    ]);


    const genericItems = sideBarItems.map((sideBarItem) => {
        let fontColor = "text-green-500";
        if (sideBarItem.transactionType === "out") fontColor = "text-red-500";
        return (
            {
                id: sideBarItem.id, //uuid4
                title: sideBarItem.title + " (" + sideBarItem.transactionType + ")", 
                subTitle: "Transaction Date: " + sideBarItem.transactionDate + " . " + "Value: " + sideBarItem.value, 
                titleFontColor: fontColor, 
                icon: sideBarItem.icon
            }
        );
    
    } );

    return (
        <GenericSideBar 
            items={genericItems} 
            handleItemClick={(uuid) => { //dispatch(triggerSearch());
                 dispatch(setCurrentSelectedItem(uuid));  
                }}
            currentSelectedItemState={currentSelectedItemState}
        />
    
    );
}

/*
SideBar.propTypes = {
    //items: PropTypes.array,
    setFailBoxDisplayState: PropTypes.func,
};
*/

export default SideBar;