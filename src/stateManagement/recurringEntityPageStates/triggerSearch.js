import { createSlice } from "@reduxjs/toolkit";

export const triggerSearchSlice = createSlice({
    name: "recurringEntityPage/triggerSearchState",
    initialState: false,
    reducers: {
        triggerSearch: (state) => {
            state = true;
            return state;
        },
        resetTriggerSearch: (state) => {
            state = false;
            return state;
        },
    }
});

export const {  triggerSearch,
                resetTriggerSearch,
             } = triggerSearchSlice.actions;

export default triggerSearchSlice.reducer;