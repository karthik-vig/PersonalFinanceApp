import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from './mainPageStates/selectedItem.js';
import sideBarItemReducer from './mainPageStates/sideBarItems.js';

export default configureStore({
  reducer: {
    selectedItem: selectedItemReducer,
    sideBarItems: sideBarItemReducer,
  }
})