import { createSlice } from "@reduxjs/toolkit";

export const deleteOptionsSlice = createSlice({
    name: "recurringEntityPage/deleteOptions",
    initialState: {
        displayState: { state: "hidden", message: "Delete Options:"},
        options: [
            {id: "deleteRetroactively", label: "Delete Associated Transaction Entries Retroactively"},
            {id: "deleteOnlyThis", label: "Delete this Recurring Entry"},
        ],
        selectOptions: {
            deleteRetroactively: false,
            deleteOnlyThis: false,
        },
    },
    reducers: {
        toggleDisplayState: (state) => {
            if (state.displayState.state === "hidden"){
                state.displayState.state = "block";
            } else {
                state.displayState.state = "hidden";
            }
            return state;
        },
        toggleSelectOptions: (state, action) => {
            console.log("toggleSelectOptions action.payload: ", action.payload);
            state.selectOptions[action.payload] = !state.selectOptions[action.payload];
            return state;
        },
        setDisplayMessage: (state, action) => {
            state.displayState.message = action.payload;
            return state;
        },
        reset: (state) => {
            state = {
                displayState: { state: "hidden", message: "Delete Options:"},
                options: [
                    {id: "deleteRetroactively", label: "Delete Associated Transaction Entries Retroactively"},
                    {id: "deleteOnlyThis", label: "Delete this Recurring Entry"},
                ],
                selectOptions: {
                    deleteRetroactively: false,
                    deleteOnlyThis: false,
                },
            }
            return state;
        }
    }
});

export const {  toggleDisplayState,
                toggleSelectOptions,
                setDisplayMessage,
                reset,
            } = deleteOptionsSlice.actions;

export default deleteOptionsSlice.reducer;