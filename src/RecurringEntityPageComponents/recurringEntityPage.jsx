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
         } from '../stateManagement/recurringEntityPageStates/selectedItem.js';
import { showFailBox, hideFailBox } from '../stateManagement/recurringEntityPageStates/failBoxDisplay.js';
import { hideSuccessBox, showSuccessBox } from '../stateManagement/recurringEntityPageStates/successBoxDisplay.js';
import {  setWarningBoxDisplayModifyState,
          //setWarningBoxDisplayAddState,
          setWarningBoxDisplayDeleteState,
          //setWarningBoxDisplayRefreshState,
    } from '../stateManagement/recurringEntityPageStates/warningBoxDisplay.js';
import { resetTriggerModifyEntry, triggerModifyEntry,
         //resetTriggerModifyEntry,
 } from '../stateManagement/recurringEntityPageStates/triggerModifyEntry.js';
import { resetTriggerDeleteEntry, triggerDeleteEntry,
            //resetTriggerDeleteEntry,
    } from '../stateManagement/recurringEntityPageStates/triggerDeleteEntry.js';
import {  removeSideBarItem,
    modifySideBarItem,
    addSideBarItem,
    setSideBarItems,
 } from '../stateManagement/recurringEntityPageStates/sideBarItems.js';
 import {  //triggerAddEntry,
            resetTriggerAddEntry,
 } from '../stateManagement/recurringEntityPageStates/triggerAddEntry.js';
import {  //triggerSearch,
        resetTriggerSearch,
} from '../stateManagement/recurringEntityPageStates/triggerSearch.js';
import { setCurrentSelectedItem, resetCurrentSelectedItem } from '../stateManagement/recurringEntityPageStates/currentSelectedItem.js';

function RecurringEntityPage() {

    const selectedItem = useSelector(state => state.recurringEntityPageStates.selectedItem);
    const warningBoxDisplayState = useSelector(state => state.recurringEntityPageStates.warningBoxDisplayState);
    const failBoxDisplayState = useSelector(state => state.recurringEntityPageStates.failBoxDisplayState);
    const successBoxDisplayState = useSelector(state => state.recurringEntityPageStates.successBoxDisplayState);
    const triggerModifyEntryState = useSelector(state => state.recurringEntityPageStates.triggerModifyEntryState);
    const triggerDeleteEntryState = useSelector(state => state.recurringEntityPageStates.triggerDeleteEntryState);
    const triggerAddEntryState = useSelector(state => state.recurringEntityPageStates.triggerAddEntryState);
    const triggerSearchState = useSelector(state => state.recurringEntityPageStates.triggerSearchState);
    const searchParams = useSelector(state => state.recurringEntityPageStates.searchParams);
    const filterParamsVisibility = useSelector(state => state.recurringEntityPageStates.filterParamsVisibility);   
    const dispatch = useDispatch();


    //tigger getAllItems on page load
    useEffect(() => {
        window.recurringTransactionOperations.getAllItems().then(items => {
            dispatch(setCurrentSelectedItem(items && items.length > 0 ? items[0].id : null));
            dispatch(setSideBarItems(items));
        }).catch((err) => {
            if (err)
            dispatch(showFailBox("Could not load the items from the database"));
        });
    }, [dispatch]);

   //trigger on search params set and enter key pressed
    useEffect(() => {
        if (!triggerSearchState) return;
        window.recurringTransactionOperations.getItems(searchParams, filterParamsVisibility).then(items => {
            dispatch(setSideBarItems(items));
        }).catch((err) => {
            if (err === null)
            dispatch(showFailBox("Search Operation Failed"));
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
        window.recurringTransactionOperations.createEntry().then(newEntrySideBarItem => {
            dispatch(addSideBarItem(newEntrySideBarItem));
        }).catch((err) => {
            if (err)
            dispatch(showFailBox("Could not create the entry in the database"));
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
        window.recurringTransactionOperations.modifyItem(selectedItem).then(modifiedItem => {
            dispatch(modifySideBarItem({id: selectedItem.id, modifiedItem: modifiedItem }));
            dispatch(showSuccessBox("Saved the Details to Disk"));
        }).catch((err) => {
            if (err.modifyStatus === false)
            dispatch(showFailBox("Could not Modify the Entry"));
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
        window.recurringTransactionOperations.deleteItem(selectedItem.id).then(() => {
            console.log("The Delete Entry trigger selected item ID is: ");
            console.log(selectedItem.id);
            dispatch(removeSideBarItem(selectedItem.id));
            dispatch(resetSelectedItem());
            dispatch(resetCurrentSelectedItem());
            dispatch(showSuccessBox("Removed the Entry from Disk"));
        }).catch((err) => {
            if (err)
            dispatch(showFailBox("Could not Delete the Entry"));
        });
        dispatch(resetTriggerDeleteEntry());       
    }, [triggerDeleteEntryState,
        dispatch,
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


export default RecurringEntityPage;