import { createSlice } from "@reduxjs/toolkit";

export const triggerUpdateFileSlice = createSlice({
    name: "triggerUpdateFileState",
    initialState: {
        addFile: false,
        deleteFile: false,
        getFile: false,
    },
    reducers: {
        triggerAddFile: (state) => {
            state.addFile = true;
            return state;
        },
        resetTriggerAddFile: (state) => {
            state.addFile = false;
            return state;
        },
        triggerDeleteFile: (state) => {
            state.deleteFile = true;
            return state;
        },
        resetTriggerDeleteFile: (state) => {
            state.deleteFile = false;
            return state;
        },
        triggerGetFile: (state) => {
            state.getFile = true;
            return state;
        },
        resetTriggerGetFile: (state) => {
            state.getFile = false;
            return state;
        }
    }
});

export const {  triggerAddFile,
                resetTriggerAddFile,
                triggerDeleteFile,
                resetTriggerDeleteFile,
                triggerGetFile,
                resetTriggerGetFile,
             } = triggerUpdateFileSlice.actions;

export default triggerUpdateFileSlice.reducer;