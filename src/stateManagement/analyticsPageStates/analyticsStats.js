import { createSlice } from "@reduxjs/toolkit";

const analyticsStatsSlice = createSlice({
    name: "analyticsPageStates/analyticsStatsState",
    initialState: {
        plotData : {
            labels: [""],
            datasets: [
                        {id: 0, label: "In", data: [0]},
                        {id: 1, label: "Out", data: [0]},
                        {id: 2, label: "Expenditure", data: [0]},
                    ]
        },
        transactionType: "All", //In, Out, Expenditure, All
        currency: "",
        dateRangeSelection: false,
        startDate: "yyyy-mm-ddThh:mm",
        endDate: "yyyy-mm-ddThh:mm",
    },
    reducers: {
        setPlotData: (state, action) => {
            //action.payload = an object with the following properties: labels, datasets
            state.plotData = action.payload;
        },
        setTransactionType: (state, action) => {
            //action.payload = a string, which is a transaction type
            state.transactionType = action.payload;
        },
        setCurrency: (state, action) => {
            //action.payload = a string, which is a currency abbreviation
            state.currency = action.payload;
        },
        toggleDateRangeSelection: (state) => {
            //action.payload = a boolean
            state.dateRangeSelection = !state.dateRangeSelection;
        },
        setStartDate: (state, action) => {
            //action.payload = a string, which is a date
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            //action.payload = a string, which is a date
            state.endDate = action.payload;
        },
    },
});

export const {
    setPlotData,
    setTransactionType,
    setCurrency,
    toggleDateRangeSelection,
    setStartDate,
    setEndDate,
} = analyticsStatsSlice.actions;

export default analyticsStatsSlice.reducer;