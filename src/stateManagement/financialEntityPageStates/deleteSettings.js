import { createSlice } from "@reduxjs/toolkit";

const deleteSettingsSlice = createSlice({
    name: "financialEntityPage/deleteSettings",
    initialState: {
        displayState: { state: "hidden", message: "Delete Options:"},
        options: {
            replaceOnDelete: {
                label: "On Delete Replace this reference in transaction entries with: ",
                options: [],
            },
        },
        selectState: {
            replaceOnDelete: "choose",
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
        setDisplayMessage: (state, action) => {
            state.displayState.message = action.payload;
            return state;
        },
        setOption: (state, action) => {
            state.selectState[action.payload.id] = action.payload.value;
            return state;
        },
        setAllPossibleOptions: (state, action) => {
            // action.payload = {replaceOnDelete: ["Empty Value", "someValue1", ...]}
            Object.keys(action.payload).forEach((id) => { 
                state.options[id].options = action.payload[id];
                state.options[id].options.unshift("Empty Value");                
            });
            return state;
        },
        reset: (state) => {
            state = {
                displayState: { state: "hidden", message: "Delete Options:"},
                options: {
                    replaceOnDelete: {
                        label: "On Delete Replace this reference in transaction entries with: ",
                        options: [],
                    },
                },
                selectState: {
                    replaceOnDelete: "choose",
                },
            }
            return state;
        }
    }
});

export const {  toggleDisplayState,
                setDisplayMessage,
                setOption,
                setAllPossibleOptions,
                reset,
            } = deleteSettingsSlice.actions;

export default deleteSettingsSlice.reducer;