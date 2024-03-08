import { createSlice } from '@reduxjs/toolkit';

const generateAnalyticsSlice = createSlice({
    name: 'analyticsPageStates/generateAnalytics',
    initialState: {
        updateExpenditurePlot: false,
        updateStatsByCategoryPlot: false,
        updateStatBox: false,
    },
    reducers: {
        toggleUpdateExpenditurePlot: (state) => {
            state.updateExpenditurePlot = !state.updateExpenditurePlot;
        },
        toggleUpdateStatsByCategoryPlot: (state) => {
            state.updateStatsByCategoryPlot = !state.updateStatsByCategoryPlot;
        },
        toggleUpdateStatBox: (state) => {
            state.updateStatBox = !state.updateStatBox;
        },
    }
});

export const {
    toggleUpdateExpenditurePlot,
    toggleUpdateStatsByCategoryPlot,
    toggleUpdateStatBox,
} = generateAnalyticsSlice.actions;

export default generateAnalyticsSlice.reducer;