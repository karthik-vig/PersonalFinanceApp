import { createSlice } from '@reduxjs/toolkit'; 

export const currentSelectedItemSlice = createSlice({
    name: "financialEntityPage/currentSelectedItemState",
    initialState: {
        itemId: null,
        focusOnItem: false,
    },
    reducers: {
        setCurrentSelectedItem: (state, action) => {
            //action.payload = {display: boolean, message: string}
            state.itemId = action.payload.itemId;
            state.focusOnItem = action.payload.focusOnItem;
            // return state;
        },
        resetCurrentSelectedItem: (state) => {
            //action.payload = {display: boolean, message: string}
            state.itemId = null;
            state.focusOnItem = false;
            // return state;
        },
    }
});

export const {  setCurrentSelectedItem,
                resetCurrentSelectedItem,
             } = currentSelectedItemSlice.actions;

export default currentSelectedItemSlice.reducer;