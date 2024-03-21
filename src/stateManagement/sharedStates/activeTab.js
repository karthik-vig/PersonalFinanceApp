import { createSlice } from "@reduxjs/toolkit";

const activeTabSlice = createSlice({
    name: "sharedStates/activeTabState",
    initialState: {
        mainPage: true,
        analyticPage: false,
        financialEntityPage: false,
        recurringTransactionPage: false,
        settingsPage: false,
    },
    reducers: {
        selectTab: (state, action) => {
            //action.payload = a string, which is the name of the active tab
            Object.keys(state).forEach(key => {
                state[key] = false;
            });
            state[action.payload] = true;
        },
    },
});

export const { selectTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;