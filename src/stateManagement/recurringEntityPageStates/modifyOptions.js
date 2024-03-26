import { createSlice } from "@reduxjs/toolkit";

export const modifyOptionsSlice = createSlice({
    name: "recurringEntityPage/modifyOptions",
    initialState: {
        displayState: { state: "hidden", message: "Modify Options:"},
        options: [
            {id: "modifyRetroactively", label: "Only modify the past transactions retroactively to reflect changes."},
            {id: "modifyOnlyThis", label: "Modify the select Recurring transaction Entry"},
        ],
        selectOptions: {
            modifyRetroactively: false,
            modifyOnlyThis: false,
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
            // console.log("toggleSelectOptions action.payload: ", action.payload);
            state.selectOptions[action.payload] = !state.selectOptions[action.payload];
            return state;
        },
        setDisplayMessage: (state, action) => {
            state.displayState.message = action.payload;
            return state;
        },
        reset: (state) => {
            state = {
                displayState: { state: "hidden", message: "Modify Options:"},
                options: [
                    {id: "modifyRetroactively", label: "Past transactions will be modified retroactively to reflect changes along with the information in this recurring transacton entry"},
                    {id: "modifyOnlyThis", label: "Only Modify the select Recurring transaction Entry"},
                ],
                selectOptions: {
                    modifyRetroactively: false,
                    modifyOnlyThis: false,
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
            } = modifyOptionsSlice.actions;

export default modifyOptionsSlice.reducer;