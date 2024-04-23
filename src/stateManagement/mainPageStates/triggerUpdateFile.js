import { createSlice } from "@reduxjs/toolkit";

export const triggerUpdateFileSlice = createSlice({
    name: "mainPage/triggerUpdateFileState",
    initialState: {
        addFile: false,
        deleteFile: {status: false, fileid: null},
        getFile: {status: false, fileid: null},
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
            state.deleteFile.fileid = action.payload;
            return state;
        },
        resetTriggerDeleteFile: (state) => {
            state.deleteFile.status = false;
            state.deleteFile.fileid = null;
            return state;
        },
        triggerGetFile: (state, action) => {
            state.getFile.status = true;
            state.getFile.fileid = action.payload;
            return state;
        },
        resetTriggerGetFile: (state) => {
            state.getFile.status = false;
            state.getFile.fileid = null;
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