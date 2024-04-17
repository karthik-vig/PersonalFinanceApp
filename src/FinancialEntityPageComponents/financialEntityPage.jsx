//import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
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
import SelectOptionMenu from '../pageLayoutComponents/selectOptionMenu.jsx';
import {    toggleDisplayState as toggleDeleteSettingsDisplayState,
            setDisplayMessage as setDeleteSettingsDisplayMessage,
            setOption as setDeleteSettingsOption,
            reset as resetDeleteSettings,
} from '../stateManagement/financialEntityPageStates/deleteSettings.js';
// import { current } from 'immer';
  

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
    const currentSelectedItemState = useSelector(state => state.financialEntityPageStates.currentSelectedItemState);
    const deleteSettings = useSelector(state => state.financialEntityPageStates.deleteSettings);
    const scrollRef = useRef(null);
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
            console.log("financialEntity page : currentSelectedItem is: ", currentSelectedItemState);
            if (currentSelectedItemState === null) dispatch(setCurrentSelectedItem(items && items.length > 0 ? items[0].id : null));
            dispatch(setSideBarItems(items));
        }).catch((err) => {
            if (err) dispatch(showFailBox(err.title));
        });
    }, [dispatch, currentSelectedItemState]);

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
            dispatch(showFailBox(err.title));
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
            if (err) dispatch(showFailBox("Could not create a new entry; The title needs to be unique!"));
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
        scrollRef.current.scrollTop = 0;
        //modify the database
        console.log("The Modify Entry trigger selected item is: ");
        console.log(selectedItem);
        window.financialEntityOperations.modifyItem(selectedItem).then(modifiedItem => {
            dispatch(modifySideBarItem({id: selectedItem.id, modifiedItem: modifiedItem }));
            dispatch(showSuccessBox("Saved the Details to Disk"));
        }).catch((err) => {
            if (err.additionalInfo.value.modifyStatus === false)
            dispatch(showFailBox(err.title));
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
        scrollRef.current.scrollTop = 0;
        if (deleteSettings.selectState.replaceOnDelete === "choose") {
            dispatch(showFailBox("Please select a value to replace the deleted entry with!"));
            return;
        }
        //replace the entry with the selected option in the necessary transaction rows/entries
        console.log("The Delete Entry trigger selected item is: ", deleteSettings.selectState.replaceOnDelete);
        //get id of the selected item from financialEntities table
        window.financialEntityOperations.getReferenceIdOnTitle(deleteSettings.selectState.replaceOnDelete).then((referenceID) => { 
            //give both the current selected item id and the id to be replace with to the transactionOperations
            window.transactionOperations.updateFinancialEntityReferenceID(selectedItem.id, referenceID).then(() => {
                console.log("The Delete Entry trigger selected item ID is: ", selectedItem.id);
                //dispatch(showSuccessBox("Updated the Financial Entity reference for all transactions"));
            }).catch((err) => {
                if (err) dispatch(showFailBox(err.title));
            });
            //give both the selected item id and the id to be replace with to the recurringTransactionOperations
            window.recurringTransactionOperations.updateFinancialEntityReferenceID(selectedItem.id, referenceID).then(() => {
                console.log("The Delete Entry trigger selected item ID is: ", selectedItem.id);
            }).catch((err) => {
                if (err) dispatch(showFailBox(err.title));
            });
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
                dispatch(showFailBox(err.title));
            });
        }).catch((err) => { 
            if (err) dispatch(showFailBox(err.title));
        });
        dispatch(resetDeleteSettings());
        dispatch(resetTriggerDeleteEntry());       
    }, [triggerDeleteEntryState,
        dispatch,
        selectedItem.id,
        deleteSettings,
    ]);

    // functions to handle the delete menu - proceed btn click for SelectOptionMenu
    const handleDeleteOptionsProceedBtnClick = () => {
        if (deleteSettings.selectState.replaceOnDelete === "choose"){
            dispatch(setDeleteSettingsDisplayMessage("Please select a value to replace the deleted entry with:"));
            return;
        }
        dispatch(toggleDeleteSettingsDisplayState());
        dispatch(setWarningBoxDisplayDeleteState("block"));
    };

    // functions to handle the delete menu - cancel btn click for SelectOptionMenu
    const handleDeleteOptionsCancelBtnClick = () => {
        dispatch(toggleDeleteSettingsDisplayState());
    };
 
    // function to change the scroll position of the scrollRef to the top
    useEffect(() => {
        if (warningBoxDisplayState.modifyBtn === "block" ||
            warningBoxDisplayState.deleteBtn === "block" ||
            successBoxDisplayState.state === "block" ||
            failBoxDisplayState.state === "block" ||
            deleteSettings.displayState.state === "block")
            scrollRef.current.scrollTop = 0;
    }, [warningBoxDisplayState.modifyBtn, 
        warningBoxDisplayState.deleteBtn, 
        successBoxDisplayState.state, 
        failBoxDisplayState.state,
        deleteSettings.displayState.state,
    ]);

    return (
        <div 
            className={"relative z-0 flex flex-row flex-wrap \
                        sm:h-auto md:h-auto lg:h-[100%] w-[100%] p-4 \
                        bg-background-cl overflow-x-hidden \
                         " + (warningBoxDisplayState.modifyBtn === "block" || 
                              warningBoxDisplayState.deleteBtn === "block" ||
                              successBoxDisplayState.state === "block" ||
                              failBoxDisplayState.state === "block" ||
                              deleteSettings.displayState.state === "block"
                              ? " overflow-y-hidden" : " overflow-y-scroll")
                        }
            ref={scrollRef}
        >
            <SelectOptionMenu 
                selectOptions={deleteSettings.options}
                selectState={deleteSettings.selectState}
                setOptions={setDeleteSettingsOption}
                handleProceed={handleDeleteOptionsProceedBtnClick}
                displayState={deleteSettings.displayState}
                handleCancel={handleDeleteOptionsCancelBtnClick}
            />
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
