import { createSlice } from "@reduxjs/toolkit";

const filterMenuSlice = createSlice({
    name: "analyticsPageStates/filterMenuState",
    initialState: {
        transactionType: "All", //In, Out, Expenditure, All
        transactionCategory: "All", //All, Food, Transport, etc
        currency: "All",
        // dateRangeSelection: false,
        startDate: "yyyy-mm-ddThh:mm",
        endDate: "yyyy-mm-ddThh:mm",
        informationPopUp: {
            state: "hidden",
            information: [],
        },
    },
    reducers: {
        // setPlotData: (state, action) => {
        //     //action.payload = an object with the following properties: labels, datasets
        //     state.plotData = action.payload;
        // },
        setTransactionType: (state, action) => {
            //action.payload = a string, which is a transaction type
            state.transactionType = action.payload;
        },
        setTransactionCategory: (state, action) => {
            //action.payload = a string, which is a transaction category
            state.transactionCategory = action.payload;
        },
        setCurrency: (state, action) => {
            //action.payload = a string, which is a currency abbreviation
            state.currency = action.payload;
        },
        // toggleDateRangeSelection: (state) => {
        //     //action.payload = a boolean
        //     state.dateRangeSelection = !state.dateRangeSelection;
        // },
        setStartDate: (state, action) => {
            //action.payload = a string, which is a date
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            //action.payload = a string, which is a date
            state.endDate = action.payload;
        },
        toggleInformationPopUp: (state) => {
            if (state.informationPopUp.state === "hidden") {
                state.informationPopUp.state = "block";
            } else {
                state.informationPopUp.state = "hidden";
            }
        },
        setInformationPopUpInformation: (state, action) => {
            state.informationPopUp.information = action.payload;
        },
    },
});

export const {
    // setPlotData,
    setTransactionType,
    setTransactionCategory,
    setCurrency,
    // toggleDateRangeSelection,
    setStartDate,
    setEndDate,
    toggleInformationPopUp,
    setInformationPopUpInformation,
} = filterMenuSlice.actions;

export default filterMenuSlice.reducer;