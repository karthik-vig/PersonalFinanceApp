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
         } from '../stateManagement/financialEntityPageStates/selectedItem.js';
import { showFailBox, hideFailBox } from '../stateManagement/financialEntityPageStates/failBoxDisplay.js';
import { hideSuccessBox, showSuccessBox } from '../stateManagement/financialEntityPageStates/successBoxDisplay.js';
import {  setWarningBoxDisplayModifyState,
          //setWarningBoxDisplayAddState,
          setWarningBoxDisplayDeleteState,
          //setWarningBoxDisplayRefreshState,
    } from '../stateManagement/financialEntityPageStates/warningBoxDisplay.js';
import { resetTriggerModifyEntry, triggerModifyEntry,
         //resetTriggerModifyEntry,
 } from '../stateManagement/financialEntityPageStates/triggerModifyEntry.js';
import { resetTriggerDeleteEntry, triggerDeleteEntry,
            //resetTriggerDeleteEntry,
    } from '../stateManagement/financialEntityPageStates/triggerDeleteEntry.js';
import {  removeSideBarItem,
    modifySideBarItem,
    addSideBarItem,
    setSideBarItems,
 } from '../stateManagement/financialEntityPageStates/sideBarItems.js';
 import {  //triggerAddEntry,
            resetTriggerAddEntry,
 } from '../stateManagement/financialEntityPageStates/triggerAddEntry.js';
import {  //triggerSearch,
        resetTriggerSearch,
} from '../stateManagement/financialEntityPageStates/triggerSearch.js';
import { setCurrentSelectedItem, resetCurrentSelectedItem } from '../stateManagement/financialEntityPageStates/currentSelectedItem.js';
import { setTransactionEntities } from '../stateManagement/sharedStates/additionalInformation.js';
  

function FinancialEntityPage() {

    const selectedItem = useSelector(state => state.financialEntityPageStates.selectedItem);
    const warningBoxDisplayState = useSelector(state => state.financialEntityPageStates.warningBoxDisplayState);
    const failBoxDisplayState = useSelector(state => state.financialEntityPageStates.failBoxDisplayState);
    const successBoxDisplayState = useSelector(state => state.financialEntityPageStates.successBoxDisplayState);
    const triggerModifyEntryState = useSelector(state => state.financialEntityPageStates.triggerModifyEntryState);
    const triggerDeleteEntryState = useSelector(state => state.financialEntityPageStates.triggerDeleteEntryState);
    const triggerAddEntryState = useSelector(state => state.financialEntityPageStates.triggerAddEntryState);
    const triggerSearchState = useSelector(state => state.financialEntityPageStates.triggerSearchState);
    const searchParams = useSelector(state => state.financialEntityPageStates.searchParams);
    const filterParamsVisibility = useSelector(state => state.financialEntityPageStates.filterParamsVisibility);   
    const dispatch = useDispatch();


    //tigger getAllItems on page load
    useEffect(() => {
        window.financialEntityOperations.getAllItems().then(items => {
            /*
            if (items === null) {
                dispatch(showFailBox("Could not load the items from the database"));
                return;
            }
            */
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
        window.financialEntityOperations.getItems(searchParams, filterParamsVisibility).then(items => {
            /*if (items === null) {
                dispatch(showFailBox("Search Operation Failed"));
                return;
            }*/
            dispatch(setSideBarItems(items));
        }).catch((err) => {
            if (err)
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
        window.financialEntityOperations.createEntry().then(newEntrySideBarItem => {
            /*if (newEntrySideBarItem === null) {
                dispatch(showFailBox("Could not create the entry in the database"));
                return;
            }*/
            dispatch(addSideBarItem(newEntrySideBarItem));
            //dispatch(showSuccessBox());
        }).catch((err) => {
            if (err === null)
            dispatch(showFailBox("Could not create the entry in the database"));
        });
        window.financialEntityOperations.getTransactionEntities().then((transactionEntities) => {
            dispatch(setTransactionEntities(transactionEntities));
        }).catch((err) => { 
            if (err) dispatch(setTransactionEntities([]));
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
        window.financialEntityOperations.modifyItem(selectedItem).then(modifiedItem => {
            dispatch(modifySideBarItem({id: selectedItem.id, modifiedItem: modifiedItem }));
            dispatch(showSuccessBox("Saved the Details to Disk"));
        }).catch((err) => {
            if (err.modifyStatus === false)
            dispatch(showFailBox("Could not Modify the Entry"));
        });
        window.financialEntityOperations.getTransactionEntities().then((transactionEntities) => {
            dispatch(setTransactionEntities(transactionEntities));
        }).catch((err) => { 
            if (err) dispatch(setTransactionEntities([]));
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
        window.financialEntityOperations.deleteItem(selectedItem.id).then(() => {
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


export default FinancialEntityPage;
