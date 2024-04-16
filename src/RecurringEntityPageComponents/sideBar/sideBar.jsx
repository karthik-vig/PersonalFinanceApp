//import PropTypes from 'prop-types';
import '../../index.css';
import GenericSideBar from '../../pageLayoutComponents/genericSideBar.jsx';
import { handleSelectItemClick } from '../../stateManagement/recurringEntityPageStates/selectedItem.js';
import { showFailBox } from '../../stateManagement/recurringEntityPageStates/failBoxDisplay.js';
//import { triggerSearch } from '../../stateManagement/recurringEntityPageStates/triggerSearch.js';
import { setCurrentSelectedItem } from '../../stateManagement/recurringEntityPageStates/currentSelectedItem.js';
import { useSelector,
         useDispatch,
 } from 'react-redux';
import { useEffect, useRef } from 'react';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items
// import { faShoppingBasket,
//          faUtensils,
//          faShoppingCart,
//          faTools,
//          faPhone,
//          faBus,
//          faHome,
//          faShieldAlt,
//          faHeartbeat,
//          faGraduationCap,
//          faFilm,
//          faPlane,
//          faSpa,
//          faDumbbell,
//          faPiggyBank,
//          faCreditCard,
//          faHandHoldingHeart,
//          faHammer,
//          faBaby,
//          faPaw,
//          faFileInvoiceDollar,
//          faBalanceScale,
//          faEllipsisH,
//          faTimes,
//          faDollarSign,
//          faSync,
// } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(
//     faShoppingBasket,
//     faUtensils,
//     faShoppingCart,
//     faTools,
//     faPhone,
//     faBus,
//     faHome,
//     faShieldAlt,
//     faHeartbeat,
//     faGraduationCap,
//     faFilm,
//     faPlane,
//     faSpa,
//     faDumbbell,
//     faPiggyBank,
//     faCreditCard,
//     faHandHoldingHeart,
//     faHammer,
//     faBaby,
//     faPaw,
//     faFileInvoiceDollar,
//     faBalanceScale,
//     faEllipsisH,
//     faTimes,
//     faDollarSign,
//     faSync,
//     );

function SideBar() {

    //mapping of transaction categories to font awesome icons
    //nad colors
    // const svgIcons = useRef({
    //      "Groceries": { icon: faShoppingBasket, color: "#4CAF50" },
    //      "Restaurants and Dining": { icon: faUtensils, color: "#FF5722" },
    //      "Shopping": { icon: faShoppingCart, color: "#9C27B0" },
    //      "Utilities": { icon: faTools, color: "#607D8B" },
    //      "Telecommunication": { icon: faPhone, color: "#3F51B5" },
    //      "Transportation": { icon: faBus, color: "#FFEB3B" },
    //      "Rent or Mortgage": { icon: faHome, color: "#795548" },
    //      "Insurance": { icon: faShieldAlt, color: "#9E9E9E" },
    //      "Healthcare": { icon: faHeartbeat, color: "#F44336" },
    //      "Education": { icon: faGraduationCap, color: "#03A9F4" },
    //      "Entertainment": { icon: faFilm, color: "#E91E63" },
    //      "Travel and Lodging": { icon: faPlane, color: "#00BCD4" },
    //      "Personal Care": { icon: faSpa, color: "#FFC107" },
    //      "Fitness and Wellness": { icon: faDumbbell, color: "#8BC34A" },
    //      "Investments and Savings": { icon: faPiggyBank, color: "#CDDC39" },
    //      "Loans and Credit Payments": { icon: faCreditCard, color: "#FF9800" },
    //      "Charity and Donations": { icon: faHandHoldingHeart, color: "#673AB7" },
    //      "Home Improvement and Maintenance": { icon: faHammer, color: "#9E9D24" },
    //      "Childcare and Education": { icon: faBaby, color: "#2196F3" },
    //      "Pet Care": { icon: faPaw, color: "#4CAF50" },
    //      "Taxes": { icon: faFileInvoiceDollar, color: "#F44336" },
    //      "Legal Services": { icon: faBalanceScale, color: "#3F51B5" },
    //      "Other": { icon: faEllipsisH, color: "#607D8B" },
    // });

    const svgIcons = useRef({
        "Groceries": { icon: "fa-shopping-basket", color: "#4CAF50" },
        "Restaurants and Dining": { icon: "fa-utensils", color: "#FF5722" },
        "Shopping": { icon: "fa-shopping-cart", color: "#9C27B0" },
        "Utilities": { icon: "fa-tools", color: "#607D8B" },
        "Telecommunication": { icon: "fa-phone", color: "#3F51B5" },
        "Transportation": { icon: "fa-bus", color: "#FFEB3B" },
        "Rent or Mortgage": { icon: "fa-home", color: "#795548" },
        "Insurance": { icon: "fa-shield-alt", color: "#9E9E9E" },
        "Healthcare": { icon: "fa-heartbeat", color: "#F44336" },
        "Education": { icon: "fa-graduation-cap", color: "#03A9F4" },
        "Entertainment": { icon: "fa-film", color: "#E91E63" },
        "Travel and Lodging": { icon: "fa-plane", color: "#00BCD4" },
        "Personal Care": { icon: "fa-spa", color: "#FFC107" },
        "Fitness and Wellness": { icon: "fa-dumbbell", color: "#8BC34A" },
        "Investments and Savings": { icon: "fa-piggy-bank", color: "#CDDC39" },
        "Loans and Credit Payments": { icon: "fa-credit-card", color: "#FF9800" },
        "Charity and Donations": { icon: "fa-hand-holding-heart", color: "#673AB7" },
        "Home Improvement and Maintenance": { icon: "fa-hammer", color: "#9E9D24" },
        "Childcare and Education": { icon: "fa-baby", color: "#2196F3" },
        "Pet Care": { icon: "fa-paw", color: "#4CAF50" },
        "Taxes": { icon: "fa-file-invoice-dollar", color: "#F44336" },
        "Legal Services": { icon: "fa-balance-scale", color: "#3F51B5" },
        "Other": { icon: "fa-ellipsis-h", color: "#607D8B" },
    });


    const sideBarItems = useSelector((state) => state.recurringEntityPageStates.sideBarItems);
    const currentSelectedItemState = useSelector((state) => state.recurringEntityPageStates.currentSelectedItemState);
    const dispatch = useDispatch();

    //get the selecteded item data from the main process
    useEffect(() => {
        if (currentSelectedItemState === null) return;
        console.log("currentSelectedItemState is not null, triggering getSelectedItem")
        console.log(currentSelectedItemState);
        window.recurringTransactionOperations.getSelectedItem(currentSelectedItemState).then((selectedItem) => {
            dispatch(handleSelectItemClick(selectedItem));
        }).catch((err) => {
            if (err) {
                console.log("selectedItem is null, triggering fail box");
                dispatch(showFailBox(err.title));
            }
        });
    }, [currentSelectedItemState,
        dispatch,
    ]);


    const genericItems = sideBarItems.map((sideBarItem) => {
        let fontColor = "text-gray-500";
        if (sideBarItem.transactionType === "Out") fontColor = "text-red-500";
        if (sideBarItem.transactionType === "In") fontColor = "text-green-500";
        
        console.log("setting sidebaritem: ", sideBarItem.id);
        console.log("setting sidebaritem cat: ", sideBarItem.transactionCategory);
        console.log("setting svg icons cat: ", svgIcons.current[sideBarItem.transactionCategory]);

        let icon = "fa-times";
        let iconColor = "#FF0000";

        if (Object.keys(svgIcons.current).includes(sideBarItem.transactionCategory)) {
            icon = svgIcons.current[sideBarItem.transactionCategory].icon
            iconColor = svgIcons.current[sideBarItem.transactionCategory].color
        }

        const subTitle = <section className='flex flex-row flex-nowrap justify-stretch items-center'>
            <FontAwesomeIcon 
                className='mx-1'
                icon={['fas', 'sync']} 
            />
            {sideBarItem.recurringFrequency}
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