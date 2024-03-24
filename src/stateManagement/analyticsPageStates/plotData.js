import { createSlice } from "@reduxjs/toolkit";

const expenditureStatsSlice = createSlice({
    name: "analyticsPageStates/plotData",
    initialState: {
        expenditurePlotData : {
            labels: [""],
            datasets: [
                        {id: 0, label: "In", data: [0], backgroundColor: "#008000", borderColor:"#008000"},
                        {id: 1, label: "Out", data: [0], backgroundColor: "#800000", borderColor:"#800000"},
                        {id: 2, label: "Expenditure", data: [0], backgroundColor: "#ff5f1f", borderColor:"#ff5f1f"},
                    ]
        },
        statsByCategoryPlotData: {
            labels: ["Groceries", "Restaurants and Dining", "Shopping", "Utilities", "Telecommunication",
                     "Transportation", "Rent or Mortgage", "Insurance", "Healthcare", "Education", "Entertainment",
                     "Travel and Lodging", "Personal Care", "Fitness and Wellness", "Investments and Savings", "Loans and Credit Payments",
                     "Charity and Donations", "Home Improvement and Maintenance", "Childcare and Education", "Pet Care", "Taxes", 
                     "Legal Services", "Other"],
            datasets: [
                        {
                            data: Array(23).fill(1),
                            backgroundColor: [
                                '#4CAF50', '#FF5722', '#9C27B0',
                                '#607D8B', '#3F51B5', '#FFEB3B',
                                '#795548', '#9E9E9E', '#F44336',
                                '#03A9F4', '#E91E63', '#00BCD4',
                                '#FFC107', '#8BC34A', '#CDDC39',
                                '#FF9800', '#673AB7', '#9E9D24',
                                '#2196F3', '#4CAF50', '#F44336',
                                '#3F51B5', '#607D8B'
                              ],
                            hoverBackgroundColor: [
                                '#1A7D1E', '#CD2500', '#6A007E',
                                '#2E4B59', '#0D1F83', '#CDB909',
                                '#472316', '#6C6C6C', '#C21104',
                                '#0077C2', '#B70031', '#008AA2',
                                '#CD8F00', '#599118', '#9BAA07',
                                '#CD6600', '#350885', '#6C6B00',
                                '#0064C1', '#1A7D1E', '#C21104',
                                '#0D1F83', '#2E4B59'
                              ],
                        },
                    ]
        },
        statBoxData: [
            {
              title: "Total Exp.",
              value: "N/A",
              color: "#ff5f1f", // Red
            },
            {
              title: "In - Amount",
              value: "N/A",
              color: "#008000", // Green
            },
            {
              title: "Out - Amount",
              value: "N/A",
              color: "#800000", // Maroon
            },
            {
              title: "In - Num",
              value: "N/A",
              color: "#00FF00", // Lime
            },
            {
              title: "Out - Num",
              value: "N/A",
              color: "#808000", // Olive
            },
            {
              title: "Num Trans.",
              value: "N/A",
              color: "#008080", // Teal
            },
            {
              title: "Num Fin. Entities",
              value: "N/A",
              color: "#0000FF", // Blue
            },
            {
              title: "Num Recur. Trans. Entities",
              value: "N/A",
              color: "#FF00FF", // Fuchsia
            },
            {
              title: "Num Trans. Int. Source",
              value: "N/A",
              color: "#800080", // Purple
            },
            {
              title: "Num Trans. Ext. Source",
              value: "N/A",
              color: "#FFA500", // Orange
            },
            {
              title: "Num Trans. Int. Dest.",
              value: "N/A",
              color: "#FFFF00", // Yellow
            },
            {
              title: "Num Trans. Ext. Dest.",
              value: "N/A",
              color: "#A52A2A", // Brown
            },
          ],
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