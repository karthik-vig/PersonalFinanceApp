//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import PropTypes from 'prop-types';
import '../../index.css';
import GenericSideBar from '../../pageLayoutComponents/genericSideBar.jsx';
import { handleSelectItemClick } from '../../stateManagement/financialEntityPageStates/selectedItem.js';
import { showFailBox } from '../../stateManagement/financialEntityPageStates/failBoxDisplay.js';
//import { triggerSearch } from '../../stateManagement/financialEntityPageStates/triggerSearch.js';
import { setCurrentSelectedItem } from '../../stateManagement/financialEntityPageStates/currentSelectedItem.js';
import { useSelector,
         useDispatch,
 } from 'react-redux';
import { useEffect, useRef } from 'react';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items
import { faSignInAlt,
        faSignOutAlt,
        faEllipsisH,
        faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(
    faSignInAlt,
    faSignOutAlt,
    faTimes,
    faEllipsisH,
    );

function SideBar() {

    //mapping of transaction categories to font awesome icons
    //nad colors
    const svgIcons = useRef({
        "Internal": { icon: faSignInAlt, color: "#00FF00" },
        "External": { icon: faSignOutAlt, color: "#FF0000" },
         "Other": { icon: faEllipsisH, color: "#607D8B" },
    });


    const sideBarItems = useSelector((state) => state.financialEntityPageStates.sideBarItems);
    const currentSelectedItemState = useSelector((state) => state.financialEntityPageStates.currentSelectedItemState);
    const dispatch = useDispatch();

    //get the selecteded item data from the main process
    useEffect(() => {
        if (currentSelectedItemState === null) return;
        console.log("currentSelectedItemState is not null, triggering getSelectedItem")
        console.log(currentSelectedItemState);
        window.financialEntityOperations.getSelectedItem(currentSelectedItemState).then((selectedItem) => {
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
        let fontColor = "text-gray-500";
        if (sideBarItem.type === "External") fontColor = "text-red-500";
        if (sideBarItem.type === "Internal") fontColor = "text-green-500";
        
        console.log("setting sidebaritem: ", sideBarItem.id);
        console.log("setting sidebaritem cat: ", sideBarItem.transactionCategory);
        console.log("setting svg icons cat: ", svgIcons.current[sideBarItem.transactionCategory]);

        let icon = faTimes;
        let iconColor = "#FF0000";

        const financialEntityTypes = new Set(Object.keys(svgIcons.current));
        if (financialEntityTypes.has(sideBarItem.type)) {
            icon = svgIcons.current[sideBarItem.type].icon
            iconColor = svgIcons.current[sideBarItem.type].color
        }

        return (
            {
                id: sideBarItem.id, //uuid4
                title: sideBarItem.title, 
                subTitle: sideBarItem.type,//"Transaction Date: " + sideBarItem.transactionDate + " . " + "Value: " + sideBarItem.value, 
                titleFontColor: fontColor, 
                icon: icon, 
                iconColor: iconColor,
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


export default SideBar;