import { createSlice } from "@reduxjs/toolkit";

const expenditureStatsSlice = createSlice({
    name: "analyticsPageStates/expenditureStats",
    initialState: {
        plotData : {
            labels: [""],
            datasets: [
                        {id: 0, label: "In", data: [0]},
                        {id: 1, label: "Out", data: [0]},
                        {id: 2, label: "Expenditure", data: [0]},
                    ]
        },
    },
    reducers: {
        setPlotData: (state, action) => {
            //action.payload = an object with the following properties: labels, datasets
            state.plotData = action.payload;
        },
    },
});

export const {
    setPlotData,
} = expenditureStatsSlice.actions;

export default expenditureStatsSlice.reducer;