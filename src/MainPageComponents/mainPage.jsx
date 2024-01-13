//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
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
//import { handleItemClick,
//         } from '../stateManagement/mainPageStates/selectedItem.js';
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

function MainPage({svgIcons}) {

    const selectedItem = useSelector(state => state.selectedItem);
    const warningBoxDisplayState = useSelector(state => state.warningBoxDisplayState);
    const failBoxDisplayState = useSelector(state => state.failBoxDisplayState);
    const successBoxDisplayState = useSelector(state => state.successBoxDisplayState);
    const triggerModifyEntryState = useSelector(state => state.triggerModifyEntryState);
    const triggerDeleteEntryState = useSelector(state => state.triggerDeleteEntryState);
    const triggerAddEntryState = useSelector(state => state.triggerAddEntryState);
    const triggerSearchState = useSelector(state => state.triggerSearchState);
    const searchParams = useSelector(state => state.searchParams);
    const filterParamsVisibility = useSelector(state => state.filterParamsVisibility);   
    const dispatch = useDispatch();


    //tigger getAllItems on page load
    useEffect(() => {
        window.electronAPI.getAllItems().then(items => {
            if (items === null) {
                dispatch(showFailBox());
                return;
            }
            dispatch(setSideBarItems(items));
        });
    }, [dispatch]);

   //trigger on search params set and enter key pressed
    useEffect(() => {
        if (triggerSearchState) {
            window.electronAPI.getItems(searchParams).then(items => {
                if (items === null) {
                    dispatch(showFailBox());
                    return;
                }
                dispatch(setSideBarItems(items));
                dispatch(resetTriggerSearch());
            });
        }
    }, [triggerSearchState,
        dispatch,
        //resetTriggerSearch,
        searchParams,
        filterParamsVisibility,
    ]);

   //trigger on add entry
    useEffect(() => {
        if (triggerAddEntryState) {
            window.electronAPI.createEntry().then(newEntrySideBarItem => {
                if (newEntrySideBarItem === null) {
                    dispatch(showFailBox());
                    return;
                }
                dispatch(addSideBarItem(newEntrySideBarItem));
                dispatch(showSuccessBox());
                dispatch(resetTriggerAddEntry());
            });
        }
    }, [triggerAddEntryState,
        dispatch,
        //resetTriggerAddEntry,
    ]);

   //trigger on modify entry
   useEffect(() => {
        if (!triggerModifyEntryState) {
            //modify the database
            window.electronAPI.modifyItem(selectedItem).then(modifiedItem => {
                if (modifiedItem.modifyStatus){
                    //wrong
                    dispatch(modifySideBarItem({id: selectedItem.id, item: modifiedItem }));
                    dispatch(showSuccessBox());
                }
                else {
                    dispatch(showFailBox());
                }
                dispatch(resetTriggerModifyEntry());
            });
        }
   }, [triggerModifyEntryState,
        dispatch,
        //resetTriggerModifyEntry,
        selectedItem,
    ]);


    //trigger on delete entry
    useEffect(() => {
        if (triggerDeleteEntryState) {
            //delete the entry from the database
            window.electronAPI.deleteItem(selectedItem.id).then(deleteStatus => {
                if (deleteStatus){
                    dispatch(removeSideBarItem(selectedItem.id));
                }
                dispatch(resetTriggerDeleteEntry());
            });       
        }
    }, [triggerDeleteEntryState,
        dispatch,
        //resetTriggerDeleteEntry,
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
            <TopBar 
                svgIcons={svgIcons}  
            />
            <SideBar />
            <DetailSection />
        </div>
    );
}

MainPage.propTypes = {
    svgIcons: PropTypes.object,
};

export default MainPage;
