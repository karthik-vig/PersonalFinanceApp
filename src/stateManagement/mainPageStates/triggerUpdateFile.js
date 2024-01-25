import { createSlice } from "@reduxjs/toolkit";

export const triggerUpdateFileSlice = createSlice({
    name: "triggerUpdateFileState",
    initialState: {
        addFile: false,
        deleteFile: {status: false, fileName: null},
        getFile: {status: false, fileName: null},
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
        triggerDeleteFile: (state, action) => {
            state.deleteFile.status = true;
            state.deleteFile.fileName = action.payload;
            return state;
        },
        resetTriggerDeleteFile: (state) => {
            state.deleteFile.status = false;
            state.deleteFile.fileName = null;
            return state;
        },
        triggerGetFile: (state, action) => {
            state.getFile.status = true;
            state.getFile.fileName = action.payload;
            return state;
        },
        resetTriggerGetFile: (state) => {
            state.getFile.status = false;
            state.getFile.fileName = null;
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