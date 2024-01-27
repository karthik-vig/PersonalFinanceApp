import { createSlice } from '@reduxjs/toolkit'; 

export const currentSelectedItemSlice = createSlice({
    name: "financialEntityPage/currentSelectedItemState",
    initialState: null,
    reducers: {
        setCurrentSelectedItem: (state, action) => {
            //action.payload = {display: boolean, message: string}
            state = action.payload;
            return state;
        },
        resetCurrentSelectedItem: (state) => {
            //action.payload = {display: boolean, message: string}
            state = null;
            return state;
        },
    }
});

export const {  setCurrentSelectedItem,
                resetCurrentSelectedItem,
             } = currentSelectedItemSlice.actions;

export default currentSelectedItemSlice.reducer;