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
import CheckboxOptionsMenu from '../pageLayoutComponents/CheckboxOptionsMenu.jsx';
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
import { setRecurringTransactions } from '../stateManagement/sharedStates/additionalInformation.js';
import { toggleDisplayState as toggleDeleteOptionsDisplayState,
        toggleSelectOptions as toggleDeleteOptionsSelectOptions,
        setDisplayMessage as setDeleteOptionsDisplayMessage,
        reset as resetDeleteOptions,
     } from '../stateManagement/recurringEntityPageStates/deleteOptions.js';
import { toggleDisplayState as toggleModifyOptionsDisplayState,
        toggleSelectOptions as toggleModifyOptionsSelectOptions,
        setDisplayMessage as setModifyOptionsDisplayMessage,
        reset as resetModifyOptions,
     } from '../stateManagement/recurringEntityPageStates/modifyOptions.js'; 
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
    const currentSelectedItemState = useSelector(state => state.recurringEntityPageStates.currentSelectedItemState);
    const deleteOptionsState = useSelector(state => state.recurringEntityPageStates.deleteOptionsState);
    const modifyOptionsState = useSelector(state => state.recurringEntityPageStates.modifyOptionsState);
    const scrollRef = useRef(null);
    const dispatch = useDispatch();


    //tigger getAllItems on page load
    useEffect(() => {
        window.recurringTransactionOperations.getAllItems().then(items => {
            if (currentSelectedItemState === null) dispatch(setCurrentSelectedItem(items && items.length > 0 ? items[0].id : null));
            dispatch(setSideBarItems(items));
        }).catch((err) => {
            if (err) dispatch(showFailBox(err.title));
        });
    }, [dispatch, currentSelectedItemState]);

   //trigger on search params set and enter key pressed
    useEffect(() => {
        if (!triggerSearchState) return;
        window.recurringTransactionOperations.getItems(searchParams, filterParamsVisibility).then(items => {
            dispatch(setSideBarItems(items));
        }).catch((err) => {
            if (err) dispatch(showFailBox(err.title));
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
            if (err) dispatch(showFailBox(err.title));
        });
        window.recurringTransactionOperations.getRecurringTransactions().then((retrievedRecurringTransactions) => {
            dispatch(setRecurringTransactions(retrievedRecurringTransactions));
        }).catch((err) => { 
            if (err) dispatch(setRecurringTransactions([]));
        });    
        dispatch(resetTriggerAddEntry());
    }, [triggerAddEntryState,
        dispatch,
        //resetTriggerAddEntry,
    ]);

   //trigger on modify entry
   useEffect(() => {
        if (!triggerModifyEntryState) return;
        console.log("The Modify Entry trigger selected item is: ");
        console.log(selectedItem);
        //modify the transaction table retroactively
        if (modifyOptionsState.selectOptions.modifyRetroactively) {
            console.log("Modify the entry associated with the recurring transaction retroactively in the transaction table");
            //back-end function to modify the transaction table retroactively
            window.transactionOperations.modifyTransactionReferenceID(selectedItem).then((status) => {
                if (status)
                dispatch(showSuccessBox("Modified the Associated Transaction Entries"));
            }).catch((err) => {
                if (err) dispatch(showFailBox("Could not modify the associated transaction entries"));
            });
        }
        //modify the database
        if (modifyOptionsState.selectOptions.modifyOnlyThis) {     
            window.recurringTransactionOperations.modifyItem(selectedItem).then(modifiedItem => {
                dispatch(modifySideBarItem(modifiedItem));
                dispatch(showSuccessBox("Saved the Details to Disk"));
            }).catch((err) => {
                if (err) dispatch(showFailBox(err.title));
            });
        }
        window.recurringTransactionOperations.getRecurringTransactions().then((retrievedRecurringTransactions) => {
            dispatch(setRecurringTransactions(retrievedRecurringTransactions));
        }).catch((err) => { 
            if (err) dispatch(setRecurringTransactions([]));
        });
        dispatch(resetModifyOptions());
        dispatch(resetTriggerModifyEntry());
   }, [triggerModifyEntryState,
        dispatch,
        selectedItem,
        modifyOptionsState.selectOptions,
    ]);


    //trigger on delete entry
    useEffect(() => {
        if (!triggerDeleteEntryState) return;
        //delete the entry from transaction table retroactively the database
        if (deleteOptionsState.selectOptions.deleteRetroactively) {
            console.log("Delete the entry associated with the recurring transaction retroactively from the transaction table");
            window.transactionOperations.deleteTransactionOnRecurringReferenceID(selectedItem.id).then((status) => {
                if (status)
                dispatch(showSuccessBox("Deleted the Associated Transaction Entries"));
            }).catch((err) => {
                if (err) dispatch(showFailBox("Could not delete the associated transaction entries"));
            });
        }
        //delete the entry from recrurring transaction table in the database
        if (deleteOptionsState.selectOptions.deleteOnlyThis) {
            console.log("Delete the recurring transaction entry from the database");
            window.recurringTransactionOperations.deleteItem(selectedItem.id).then(() => {
                console.log("The Delete Entry trigger selected item ID is: ");
                console.log(selectedItem.id);
                dispatch(removeSideBarItem(selectedItem.id));
                dispatch(resetSelectedItem());
                dispatch(resetCurrentSelectedItem());
                dispatch(showSuccessBox("Removed the Entry from Disk"));
            }).catch((err) => {
                if (err) dispatch(showFailBox(err.title));
            });
        }
        dispatch(resetDeleteOptions());
        dispatch(resetTriggerDeleteEntry());       
    }, [triggerDeleteEntryState,
        dispatch,
        selectedItem.id,
        deleteOptionsState.selectOptions,
    ]);

    //handler functions for delete options btn click
    //proceed btn
    const handleDeleteOptionsProceedBtnClick = () => {
        if (!deleteOptionsState.selectOptions.deleteRetroactively && 
            !deleteOptionsState.selectOptions.deleteOnlyThis) {
                dispatch(setDeleteOptionsDisplayMessage("Please select an option:"));
                return;
            }
        dispatch(toggleDeleteOptionsDisplayState()); 
        dispatch(setWarningBoxDisplayDeleteState("block"));
    };

    //cancel btn
    const handleDeleteOptionsCancelBtnClick = () => {
        dispatch(toggleDeleteOptionsDisplayState());
    };

    //handler functions for modify options btn click
    //proceed btn
    const handleModifyOptionsProceedBtnClick = () => {
        if (!modifyOptionsState.selectOptions.modifyRetroactively &&
            !modifyOptionsState.selectOptions.modifyOnlyThis) {
                dispatch(setModifyOptionsDisplayMessage("Please select an option:"));
                return;
            }
        dispatch(toggleModifyOptionsDisplayState());
        dispatch(setWarningBoxDisplayModifyState("block"));
    };

    //cancel btn
    const handleModifyOptionsCancelBtnClick = () => {
        dispatch(toggleModifyOptionsDisplayState());
    };


    // function to change the scroll position of the scrollRef to the top
    useEffect(() => {
        if (warningBoxDisplayState.modifyBtn === "block" ||
            warningBoxDisplayState.deleteBtn === "block" ||
            successBoxDisplayState.state === "block" ||
            failBoxDisplayState.state === "block" ||
            deleteOptionsState.displayState.state === "block")
            scrollRef.current.scrollTop = 0;
    }, [warningBoxDisplayState.modifyBtn, 
        warningBoxDisplayState.deleteBtn, 
        successBoxDisplayState.state, 
        failBoxDisplayState.state,
        deleteOptionsState.displayState.state,
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
                deleteOptionsState.displayState.state === "block" ?
                " overflow-y-hidden" : " overflow-y-scroll" )
            }
            ref={scrollRef}
        >
            {/*Delete option menu*/}
            <CheckboxOptionsMenu 
                checkBoxOptions={deleteOptionsState.options}
                checkBoxState={deleteOptionsState.selectOptions}
                setOptions={toggleDeleteOptionsSelectOptions} 
                handleProceed={handleDeleteOptionsProceedBtnClick} 
                displayState={deleteOptionsState.displayState}
                handleCancel={handleDeleteOptionsCancelBtnClick}
            />
            {/*Modify option menu*/}
            <CheckboxOptionsMenu 
                checkBoxOptions={modifyOptionsState.options}
                checkBoxState={modifyOptionsState.selectOptions}
                setOptions={toggleModifyOptionsSelectOptions} 
                handleProceed={handleModifyOptionsProceedBtnClick} 
                displayState={modifyOptionsState.displayState}
                handleCancel={handleModifyOptionsCancelBtnClick}
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


export default RecurringEntityPage;
