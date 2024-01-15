import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from './mainPageStates/selectedItem.js';
import sideBarItemReducer from './mainPageStates/sideBarItems.js';
import warningBoxDisplayReducer from './mainPageStates/warningBoxDisplay.js';
import successBoxDisplayReducer from './mainPageStates/successBoxDisplay.js';
import failBoxDisplayReducer from './mainPageStates/failBoxDisplay.js';
import searchParamsReducer from './mainPageStates/searchParams.js';
import filterParamsVisibilityReducer from './mainPageStates/filterParamsVisibility.js';
import filterDisplayReducer from './mainPageStates/filterDisplay.js';
import triggerModifyEntryReducer from './mainPageStates/triggerModifyEntry.js';
import triggerDeleteEntryReducer from './mainPageStates/triggerDeleteEntry.js';
import triggerAddEntryReducer from './mainPageStates/triggerAddEntry.js';
import triggerSearchReducer from './mainPageStates/triggerSearch.js';
import currentSelectedItemReducer from './mainPageStates/currentSelectedItem.js';
import triggerUpdateFileReducer from './mainPageStates/triggerUpdateFile.js';
import additionalInformationReducer from './mainPageStates/additionalInformation.js';


export default configureStore({
  reducer: {
    selectedItem: selectedItemReducer,
    sideBarItems: sideBarItemReducer,
    warningBoxDisplayState: warningBoxDisplayReducer,
    successBoxDisplayState: successBoxDisplayReducer,
    failBoxDisplayState: failBoxDisplayReducer,
    searchParams: searchParamsReducer,
    filterParamsVisibility: filterParamsVisibilityReducer,
    filterDisplayState: filterDisplayReducer,
    triggerModifyEntryState: triggerModifyEntryReducer,
    triggerDeleteEntryState: triggerDeleteEntryReducer,
    triggerAddEntryState: triggerAddEntryReducer,
    triggerSearchState: triggerSearchReducer,
    currentSelectedItemState: currentSelectedItemReducer,
    triggerUpdateFileState: triggerUpdateFileReducer,
    additionalInformationState: additionalInformationReducer,
  }
})