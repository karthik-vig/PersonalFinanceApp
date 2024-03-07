import { createSlice } from "@reduxjs/toolkit";

const expenditureStatsSlice = createSlice({
    name: "analyticsPageStates/plotData",
    initialState: {
        expenditurePlotData : {
            labels: [""],
            datasets: [
                        {id: 0, label: "In", data: [0]},
                        {id: 1, label: "Out", data: [0]},
                        {id: 2, label: "Expenditure", data: [0]},
                    ]
        },
        statsByCategoryPlotData: {
            labels: ["Default"],
            datasets: [
                        {data: [1]},
                    ]
        },
    },
    reducers: {
        setExpenditurePlotData: (state, action) => {
            //action.payload = an object with the following properties: labels, datasets
            state.expenditurePlotData = action.payload;
        },
        setStatsByCategoryPlotData: (state, action) => {
            //action.payload = an object with the following properties: labels, datasets
            state.statsByCategoryPlotData = action.payload;
        },
    },
});

export const {
    setExpenditurePlotData,
    setStatsByCategoryPlotData,
} = expenditureStatsSlice.actions;

export default expenditureStatsSlice.reducer;