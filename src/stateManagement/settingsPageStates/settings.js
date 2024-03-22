import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settingsPage/settings",
    initialState: {
        timezone: null,
        filePath: null,
        triggerFileUpdate: false,
        triggerConfigUpdate: false,
    },
    reducers: {
        setTimezone: (state, action) => {
            state.timezone = action.payload;
        },
        setFilePath: (state, action) => {
            state.filePath = action.payload;
        },
        toggleFileUpdate: (state) => {
            state.triggerFileUpdate = !state.triggerFileUpdate;
        },
        toggleConfigUpdate: (state) => {
            state.triggerConfigUpdate = !state.triggerConfigUpdate;
        },
    },
});

export const { 
    setTimezone, 
    setFilePath,
    toggleFileUpdate,
    toggleConfigUpdate,
} = settingsSlice.actions;

export default settingsSlice.reducer;