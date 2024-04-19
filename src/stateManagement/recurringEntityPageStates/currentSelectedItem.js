import { createSlice } from '@reduxjs/toolkit'; 

export const currentSelectedItemSlice = createSlice({
    name: "recurringEntityPage/currentSelectedItemState",
    initialState: {
        itemId: null,
        focusOnItem: false,
    },
    reducers: {
        setCurrentSelectedItem: (state, action) => {
            //action.payload = {display: boolean, message: string}
            state = action.payload;
            return state;
        },
        resetCurrentSelectedItem: (state) => {
            //action.payload = {display: boolean, message: string}
            state = {
                itemId: null,
                focusOnItem: false,
            };
            return state;
        },
    }
});

export const {  setCurrentSelectedItem,
                resetCurrentSelectedItem,
             } = currentSelectedItemSlice.actions;

export default currentSelectedItemSlice.reducer;