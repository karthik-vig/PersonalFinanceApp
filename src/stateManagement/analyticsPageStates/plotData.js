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
        statBoxData: [],
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
        setStatBoxData: (state, action) => {
            //action.payload = an array of objects with the following properties: label, data
            state.statBoxData = action.payload;
        },
    },
});

export const {
    setExpenditurePlotData,
    setStatsByCategoryPlotData,
    setStatBoxData,
} = expenditureStatsSlice.actions;

export default expenditureStatsSlice.reducer;