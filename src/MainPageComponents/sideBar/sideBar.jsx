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
import { useEffect, useRef } from 'react';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items
import { faShoppingBasket,
         faUtensils,
         faShoppingCart,
         faTools,
         faPhone,
         faBus,
         faHome,
         faShieldAlt,
         faHeartbeat,
         faGraduationCap,
         faFilm,
         faPlane,
         faSpa,
         faDumbbell,
         faPiggyBank,
         faCreditCard,
         faHandHoldingHeart,
         faHammer,
         faBaby,
         faPaw,
         faFileInvoiceDollar,
         faBalanceScale,
         faEllipsisH,
         faTimes,
         faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(
    faShoppingBasket,
    faUtensils,
    faShoppingCart,
    faTools,
    faPhone,
    faBus,
    faHome,
    faShieldAlt,
    faHeartbeat,
    faGraduationCap,
    faFilm,
    faPlane,
    faSpa,
    faDumbbell,
    faPiggyBank,
    faCreditCard,
    faHandHoldingHeart,
    faHammer,
    faBaby,
    faPaw,
    faFileInvoiceDollar,
    faBalanceScale,
    faEllipsisH,
    faTimes,
    faDollarSign,
    );

function SideBar() {

    //mapping of transaction categories to font awesome icons
    //nad colors
    const svgIcons = useRef({
         "Groceries": { icon: faShoppingBasket, color: "#4CAF50" },
         "Restaurants and Dining": { icon: faUtensils, color: "#FF5722" },
         "Shopping": { icon: faShoppingCart, color: "#9C27B0" },
         "Utilities": { icon: faTools, color: "#607D8B" },
         "Telecommunication": { icon: faPhone, color: "#3F51B5" },
         "Transportation": { icon: faBus, color: "#FFEB3B" },
         "Rent or Mortgage": { icon: faHome, color: "#795548" },
         "Insurance": { icon: faShieldAlt, color: "#9E9E9E" },
         "Healthcare": { icon: faHeartbeat, color: "#F44336" },
         "Education": { icon: faGraduationCap, color: "#03A9F4" },
         "Entertainment": { icon: faFilm, color: "#E91E63" },
         "Travel and Lodging": { icon: faPlane, color: "#00BCD4" },
         "Personal Care": { icon: faSpa, color: "#FFC107" },
         "Fitness and Wellness": { icon: faDumbbell, color: "#8BC34A" },
         "Investments and Savings": { icon: faPiggyBank, color: "#CDDC39" },
         "Loans and Credit Payments": { icon: faCreditCard, color: "#FF9800" },
         "Charity and Donations": { icon: faHandHoldingHeart, color: "#673AB7" },
         "Home Improvement and Maintenance": { icon: faHammer, color: "#9E9D24" },
         "Childcare and Education": { icon: faBaby, color: "#2196F3" },
         "Pet Care": { icon: faPaw, color: "#4CAF50" },
         "Taxes": { icon: faFileInvoiceDollar, color: "#F44336" },
         "Legal Services": { icon: faBalanceScale, color: "#3F51B5" },
         "Other": { icon: faEllipsisH, color: "#607D8B" },
    });


    const sideBarItems = useSelector((state) => state.mainPageStates.sideBarItems);
    const currentSelectedItemState = useSelector((state) => state.mainPageStates.currentSelectedItemState);
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
        let fontColor = "text-gray-500";
        if (sideBarItem.transactionType === "out") fontColor = "text-red-500";
        if (sideBarItem.transactionType === "in") fontColor = "text-green-500";
        console.log("setting sidebaritem: ", sideBarItem.id);
        console.log("setting sidebaritem cat: ", sideBarItem.transactionCategory);
        console.log("setting svg icons cat: ", svgIcons.current[sideBarItem.transactionCategory]);

        let icon = faTimes;
        let iconColor = "#FF0000";

        if (sideBarItem.transactionCategory !== null) {
            icon = svgIcons.current[sideBarItem.transactionCategory].icon
            iconColor = svgIcons.current[sideBarItem.transactionCategory].color
        }

        const subTitle = <section className='flex flex-row flex-nowrap justify-stretch items-center'>
            <FontAwesomeIcon 
                className='mx-1'
                icon={['fas', 'shopping-cart']} 
            />
            {sideBarItem.transactionDate.substring(0, 10)}
            <FontAwesomeIcon 
                className='mr-1 ml-2'
                icon={['fas', 'dollar-sign']} 
            />
            {sideBarItem.value}
        </section>

        return (
            {
                id: sideBarItem.id, //uuid4
                title: sideBarItem.title + " (" + sideBarItem.transactionType + ")", 
                subTitle: subTitle,//"Transaction Date: " + sideBarItem.transactionDate + " . " + "Value: " + sideBarItem.value, 
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