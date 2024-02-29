import { configureStore, combineReducers } from '@reduxjs/toolkit';

//import all the reducers for the the main page states
import mainPageSelectedItemReducer from './mainPageStates/selectedItem.js';
import mainPageSideBarItemReducer from './mainPageStates/sideBarItems.js';
import mainPageWarningBoxDisplayReducer from './mainPageStates/warningBoxDisplay.js';
import mainPageSuccessBoxDisplayReducer from './mainPageStates/successBoxDisplay.js';
import mainPageFailBoxDisplayReducer from './mainPageStates/failBoxDisplay.js';
import mainPageSearchParamsReducer from './mainPageStates/searchParams.js';
import mainPageFilterParamsVisibilityReducer from './mainPageStates/filterParamsVisibility.js';
import mainPageFilterDisplayReducer from './mainPageStates/filterDisplay.js';
import mainPageTriggerModifyEntryReducer from './mainPageStates/triggerModifyEntry.js';
import mainPageTriggerDeleteEntryReducer from './mainPageStates/triggerDeleteEntry.js';
import mainPageTriggerAddEntryReducer from './mainPageStates/triggerAddEntry.js';
import mainPageTriggerSearchReducer from './mainPageStates/triggerSearch.js';
import mainPageCurrentSelectedItemReducer from './mainPageStates/currentSelectedItem.js';
import mainPageTriggerUpdateFileReducer from './mainPageStates/triggerUpdateFile.js';
// import mainPageAdditionalInformationReducer from './mainPageStates/additionalInformation.js';
import mainPageSelectFilterFinancialEntityReducer from './mainPageStates/selectFilterFinancialEntity.js';

//import all the reducers for the the financial entity page states
import financialEntityPageSelectedItemReducer from './financialEntityPageStates/selectedItem.js';
import financialEntityPageCurrentSelectedItemReducer from './financialEntityPageStates/currentSelectedItem.js';
import financialEntityPageFailBoxDisplayReducer from './financialEntityPageStates/failBoxDisplay.js';
import financialEntityPageFilterDisplayReducer from './financialEntityPageStates/filterDisplay.js';
import financialEntityPageFilterParamsVisibilityReducer from './financialEntityPageStates/filterParamsVisibility.js';
import financialEntityPageSearchParamsReducer from './financialEntityPageStates/searchParams.js';
import financialEntityPageSideBarItemReducer from './financialEntityPageStates/sideBarItems.js';
import financialEntityPageSuccessBoxDisplayReducer from './financialEntityPageStates/successBoxDisplay.js';
import financialEntityPageTriggerAddEntryReducer from './financialEntityPageStates/triggerAddEntry.js';
import financialEntityPageTriggerDeleteEntryReducer from './financialEntityPageStates/triggerDeleteEntry.js';
import financialEntityPageTriggerModifyEntryReducer from './financialEntityPageStates/triggerModifyEntry.js';
import financialEntityPageTriggerSearchReducer from './financialEntityPageStates/triggerSearch.js';
import financialEntityPageWarningBoxDisplayReducer from './financialEntityPageStates/warningBoxDisplay.js';

//import all the reducers for the recurring entity page states
import recurringEntityPageSelectedItemReducer from './recurringEntityPageStates/selectedItem.js';
//import recurringEntityPageAdditionalInformationReducer from './recurringEntityPageStates/additionalInformation.js';
import recurringEntityPageCurrentSelectedItemReducer from './recurringEntityPageStates/currentSelectedItem.js';
import recurringEntityPageFailBoxDisplayReducer from './recurringEntityPageStates/failBoxDisplay.js';
import recurringEntityPageFilterParamsVisibilityReducer from './recurringEntityPageStates/filterParamsVisibility.js';
import recurringEntityPageSearchParamsReducer from './recurringEntityPageStates/searchParams.js';
import recurringEntityPageSelectFilterFinancialEntityReducer from './recurringEntityPageStates/selectFilterFinancialEntity.js';
import recurringEntityPageSideBarItemReducer from './recurringEntityPageStates/sideBarItems.js';
import recurringEntityPageSuccessBoxDisplayReducer from './recurringEntityPageStates/successBoxDisplay.js';
import recurringEntityPageTriggerAddEntryReducer from './recurringEntityPageStates/triggerAddEntry.js';
import recurringEntityPageTriggerDeleteEntryReducer from './recurringEntityPageStates/triggerDeleteEntry.js';
import recurringEntityPageTriggerModifyEntryReducer from './recurringEntityPageStates/triggerModifyEntry.js';
import recurringEntityPageTriggerSearchReducer from './recurringEntityPageStates/triggerSearch.js';
import recurringEntityPageWarningBoxDisplayReducer from './recurringEntityPageStates/warningBoxDisplay.js';
import recurringEntityPageFilterDisplayReducer from './recurringEntityPageStates/filterDisplay.js';

//import all the reducers for the shared states
import sharedStatesAdditionalInformationReducer from './sharedStates/additionalInformation.js';
import sharedStatesActiveTabReducer from './sharedStates/activeTab.js';

const mainPageStates = combineReducers({
  selectedItem: mainPageSelectedItemReducer,
  sideBarItems: mainPageSideBarItemReducer,
  warningBoxDisplayState: mainPageWarningBoxDisplayReducer,
  successBoxDisplayState: mainPageSuccessBoxDisplayReducer,
  failBoxDisplayState: mainPageFailBoxDisplayReducer,
  searchParams: mainPageSearchParamsReducer,
  filterParamsVisibility: mainPageFilterParamsVisibilityReducer,
  filterDisplayState: mainPageFilterDisplayReducer,
  triggerModifyEntryState: mainPageTriggerModifyEntryReducer,
  triggerDeleteEntryState: mainPageTriggerDeleteEntryReducer,
  triggerAddEntryState: mainPageTriggerAddEntryReducer,
  triggerSearchState: mainPageTriggerSearchReducer,
  currentSelectedItemState: mainPageCurrentSelectedItemReducer,
  triggerUpdateFileState: mainPageTriggerUpdateFileReducer,
  // additionalInformationState: mainPageAdditionalInformationReducer,
  selectFilterFinancialEntityState: mainPageSelectFilterFinancialEntityReducer,
});

const financialEntityPageStates = combineReducers({
  selectedItem: financialEntityPageSelectedItemReducer,
  currentSelectedItemState: financialEntityPageCurrentSelectedItemReducer,
  failBoxDisplayState: financialEntityPageFailBoxDisplayReducer,
  filterDisplayState: financialEntityPageFilterDisplayReducer,
  filterParamsVisibility: financialEntityPageFilterParamsVisibilityReducer,
  searchParams: financialEntityPageSearchParamsReducer,
  sideBarItems: financialEntityPageSideBarItemReducer,
  successBoxDisplayState: financialEntityPageSuccessBoxDisplayReducer,
  triggerAddEntryState: financialEntityPageTriggerAddEntryReducer,
  triggerDeleteEntryState: financialEntityPageTriggerDeleteEntryReducer,
  triggerModifyEntryState: financialEntityPageTriggerModifyEntryReducer,
  triggerSearchState: financialEntityPageTriggerSearchReducer,
  warningBoxDisplayState: financialEntityPageWarningBoxDisplayReducer,
});

const recurringEntityPageStates = combineReducers({
  selectedItem: recurringEntityPageSelectedItemReducer,
  //additionalInformationState: recurringEntityPageAdditionalInformationReducer,
  currentSelectedItemState: recurringEntityPageCurrentSelectedItemReducer,
  failBoxDisplayState: recurringEntityPageFailBoxDisplayReducer,
  filterParamsVisibility: recurringEntityPageFilterParamsVisibilityReducer,
  searchParams: recurringEntityPageSearchParamsReducer,
  selectFilterFinancialEntityState: recurringEntityPageSelectFilterFinancialEntityReducer,
  sideBarItems: recurringEntityPageSideBarItemReducer,
  successBoxDisplayState: recurringEntityPageSuccessBoxDisplayReducer,
  triggerAddEntryState: recurringEntityPageTriggerAddEntryReducer,
  triggerDeleteEntryState: recurringEntityPageTriggerDeleteEntryReducer,
  triggerModifyEntryState: recurringEntityPageTriggerModifyEntryReducer,
  triggerSearchState: recurringEntityPageTriggerSearchReducer,
  warningBoxDisplayState: recurringEntityPageWarningBoxDisplayReducer,
  filterDisplayState: recurringEntityPageFilterDisplayReducer,
});

const sharedStates = combineReducers({
  additionalInformationState: sharedStatesAdditionalInformationReducer,
  activeTabState: sharedStatesActiveTabReducer,
});

const rootReducer = combineReducers({
  mainPageStates,
  financialEntityPageStates,
  recurringEntityPageStates,
  sharedStates,
});

export default configureStore({
  reducer: rootReducer,
})