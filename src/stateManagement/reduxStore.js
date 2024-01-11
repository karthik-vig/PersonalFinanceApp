import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from './mainPageStates/selectedItem.js';

export default configureStore({
  reducer: {
    selectedItem: selectedItemReducer,
  }
})