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
        window.financialEntityOperations.getItems(searchParams, filterParamsVisibility).then(items => {
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
        window.financialEntityOperations.createEntry().then(newEntrySideBarItem => {
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
        window.financialEntityOperations.modifyItem(selectedItem).then(modifiedItem => {
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
        window.financialEntityOperations.deleteItem(selectedItem.id).then(deleteStatus => {
            if (deleteStatus){
                console.log("The Delete Entry trigger selected item ID is: ");
                console.log(selectedItem.id);
                dispatch(removeSideBarItem(selectedItem.id));
                dispatch(resetSelectedItem());
                dispatch(resetCurrentSelectedItem());
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


export default FinancialEntityPage;
