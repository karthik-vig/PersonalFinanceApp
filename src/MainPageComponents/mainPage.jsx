//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import PropTypes from 'prop-types';
import { useEffect } from 'react';
import '../index.css';
//import { useImmer } from 'use-immer';
import { useSelector,
         useDispatch,
         } from 'react-redux';
import SideBar from './sideBar/sideBar.jsx';
import TopBar from './topBar/topBar.jsx';
import DetailSection from './detailSection/detailSection.jsx';
import GenericWarningBox from '../pageLayoutComponents/genericWarningBox.jsx';
import GenericSuccess from '../pageLayoutComponents/genericSuccess.jsx';
import GenericFail from '../pageLayoutComponents/genericFail.jsx';
//import SideSectionButton from './sideSectionButton';
//import GenericIconButton from './genericIconBtn';
import { resetSelectedItem,
         } from '../stateManagement/mainPageStates/selectedItem.js';
import { showFailBox, hideFailBox } from '../stateManagement/mainPageStates/failBoxDisplay.js';
import { hideSuccessBox, showSuccessBox } from '../stateManagement/mainPageStates/successBoxDisplay.js';
import {  setWarningBoxDisplayModifyState,
          //setWarningBoxDisplayAddState,
          setWarningBoxDisplayDeleteState,
          //setWarningBoxDisplayRefreshState,
    } from '../stateManagement/mainPageStates/warningBoxDisplay.js';
import { resetTriggerModifyEntry, triggerModifyEntry,
         //resetTriggerModifyEntry,
 } from '../stateManagement/mainPageStates/triggerModifyEntry.js';
import { resetTriggerDeleteEntry, triggerDeleteEntry,
            //resetTriggerDeleteEntry,
    } from '../stateManagement/mainPageStates/triggerDeleteEntry.js';
import {  removeSideBarItem,
    modifySideBarItem,
    addSideBarItem,
    setSideBarItems,
 } from '../stateManagement/mainPageStates/sideBarItems.js';
 import {  //triggerAddEntry,
            resetTriggerAddEntry,
 } from '../stateManagement/mainPageStates/triggerAddEntry.js';
import {  //triggerSearch,
        resetTriggerSearch,
} from '../stateManagement/mainPageStates/triggerSearch.js';
import { setCurrentSelectedItem } from '../stateManagement/mainPageStates/currentSelectedItem.js';

function MainPage() {

    const selectedItem = useSelector(state => state.mainPageStates.selectedItem);
    const warningBoxDisplayState = useSelector(state => state.mainPageStates.warningBoxDisplayState);
    const failBoxDisplayState = useSelector(state => state.mainPageStates.failBoxDisplayState);
    const successBoxDisplayState = useSelector(state => state.mainPageStates.successBoxDisplayState);
    const triggerModifyEntryState = useSelector(state => state.mainPageStates.triggerModifyEntryState);
    const triggerDeleteEntryState = useSelector(state => state.mainPageStates.triggerDeleteEntryState);
    const triggerAddEntryState = useSelector(state => state.mainPageStates.triggerAddEntryState);
    const triggerSearchState = useSelector(state => state.mainPageStates.triggerSearchState);
    const searchParams = useSelector(state => state.mainPageStates.searchParams);
    const filterParamsVisibility = useSelector(state => state.mainPageStates.filterParamsVisibility);   
    const dispatch = useDispatch();


    //tigger getAllItems on page load
    useEffect(() => {
        window.transactionOperations.getAllItems().then(items => {
            if (items === null) {
                dispatch(showFailBox("Could not load the items from the database"));
                return;
            }
            dispatch(setCurrentSelectedItem(items && items.length > 0 ? items[0].id : null));
            dispatch(setSideBarItems(items));
        });
    }, [dispatch]);

   //trigger on search params set and enter key pressed
    useEffect(() => {
        if (!triggerSearchState) return;
        window.transactionOperations.getItems(searchParams, filterParamsVisibility).then(items => {
            if (items === null) {
                dispatch(showFailBox("Search Operation Failed"));
                return;
            }
            dispatch(setSideBarItems(items));
        });
        dispatch(resetTriggerSearch());
    }, [triggerSearchState,
        dispatch,
        //resetTriggerSearch,
        searchParams,
        filterParamsVisibility,
    ]);

   //trigger on add entry
    useEffect(() => {
        if (!triggerAddEntryState) return;
        window.transactionOperations.createEntry().then(newEntrySideBarItem => {
            if (newEntrySideBarItem === null) {
                dispatch(showFailBox("Could not create the entry in the database"));
                return;
            }
            dispatch(addSideBarItem(newEntrySideBarItem));
            //dispatch(showSuccessBox());
        });
        dispatch(resetTriggerAddEntry());
    }, [triggerAddEntryState,
        dispatch,
        //resetTriggerAddEntry,
    ]);

   //trigger on modify entry
   useEffect(() => {
        if (!triggerModifyEntryState) return;
        //modify the database
        console.log("The Modify Entry trigger selected item is: ");
        console.log(selectedItem);
        window.transactionOperations.modifyItem(selectedItem).then(modifiedItem => {
            if (modifiedItem.modifyStatus){
                //wrong
                dispatch(modifySideBarItem({id: selectedItem.id, modifiedItem: modifiedItem }));
                dispatch(showSuccessBox());
            }
            else {
                dispatch(showFailBox("Could not Modify the Entry"));
            }
        });
        dispatch(resetTriggerModifyEntry());
   }, [triggerModifyEntryState,
        dispatch,
        //resetTriggerModifyEntry,
        selectedItem,
    ]);


    //trigger on delete entry
    useEffect(() => {
        if (!triggerDeleteEntryState) return;
        //delete the entry from the database
        window.transactionOperations.deleteItem(selectedItem.id).then(deleteStatus => {
            if (deleteStatus){
                console.log("The Delete Entry trigger selected item ID is: ");
                console.log(selectedItem.id);
                dispatch(removeSideBarItem(selectedItem.id));
                dispatch(resetSelectedItem());
                dispatch(showSuccessBox());
            }
            else {
                dispatch(showFailBox("Could not Delete the Entry"));
            }
        });
        dispatch(resetTriggerDeleteEntry());       
    }, [triggerDeleteEntryState,
        dispatch,
        //resetTriggerDeleteEntry,
        //removeSideBarItem,
        selectedItem.id,
    ]);

    return (
        <div 
            className="relative z-0 flex flex-row flex-wrap h-[100%] w-[100%] bg-background-cl"
        >
            <GenericWarningBox 
                warningText="Are you sure you want to modify the Entry?"
                additionalClasses=""
                displayState={warningBoxDisplayState.modifyBtn}
                changeDisplayState={() => setWarningBoxDisplayModifyState("hidden")}
                setState={triggerModifyEntry}
            />
            <GenericWarningBox
                warningText="Are you sure you want to delete the Entry?"
                additionalClasses=""
                displayState={warningBoxDisplayState.deleteBtn}
                changeDisplayState={() => setWarningBoxDisplayDeleteState("hidden")}
                setState={triggerDeleteEntry}
            />
            <GenericSuccess
                additionalClasses=""
                displayState={successBoxDisplayState}
                changeDisplayState={hideSuccessBox}
            />
            <GenericFail
                additionalClasses=""
                displayState={failBoxDisplayState}
                changeDisplayState={hideFailBox}
            />
            <TopBar />
            <SideBar />
            <DetailSection />
        </div>
    );
}


export default MainPage;
