import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
    // setPlotData,
    setTransactionType,
    setTransactionCategory,
    setCurrency,
    // toggleDateRangeSelection,
    setStartDate,
    setEndDate,
} from '../stateManagement/analyticsPageStates/filterMenu.js';
import {
    toggleUpdateExpenditurePlot, toggleUpdateStatsByCategoryPlot,
    // toggleUpdateStatsByCategoryPlot,
    // toggleUpdateStatBox,
} from '../stateManagement/analyticsPageStates/generateAnalytics.js';
import { 
    setExpenditurePlotData, 
    setStatsByCategoryPlotData, 
    setStatBoxData,
} from '../stateManagement/analyticsPageStates/plotData.js';
import { showFailBox } from '../stateManagement/financialEntityPageStates/failBoxDisplay.js';


function Topbar() {

    const dispatch = useDispatch();

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const currencies = useSelector(state => state.sharedStates.additionalInformationState.currencies);
    const transactionCategories = useSelector(state => state.sharedStates.additionalInformationState.transactionCategories);
    // the plotData state might have to be removed; it is only used for testing purposes
    //const plotData = useSelector(state => state.analyticsPageStates.plotData);
    const generateAnalytics = useSelector(state => state.analyticsPageStates.generateAnalytics);

    // set the line plot data
    useEffect(() => {
        //get the plot data from the backend
        if (!generateAnalytics.updateExpenditurePlot) return;
        window.transactionOperations.getLinePlotData(filterMenuStates).then((expenditurePlotData) => {
            dispatch(setExpenditurePlotData(expenditurePlotData));
        }).catch((err) => {
            console.log("Error getting the plot data: ", err);
        });
        dispatch(toggleUpdateExpenditurePlot());
    }, [generateAnalytics.updateExpenditurePlot,
        filterMenuStates,
        dispatch,
    ]);

    // set the stats by category plot data
    useEffect(() => {
        //get the plot data from the backend
        if (!generateAnalytics.updateStatsByCategoryPlot) return;
        window.transactionOperations.getStatsByCategoryPlotData(filterMenuStates).then((statsByCategoryPlotData) => {
            dispatch(setStatsByCategoryPlotData(statsByCategoryPlotData));
        }).catch((err) => {
            console.log("Error getting the plot data: ", err);
        });
        dispatch(toggleUpdateStatsByCategoryPlot());
    }, [generateAnalytics.updateStatsByCategoryPlot,
        filterMenuStates,
        dispatch,
    ]);

    const handleSetCurrency = (event) => {
        //dispatch set currency action
        console.log(event.target.value);
        dispatch(setCurrency(event.target.value));
    };

    const handleSetTransactionType = (event) => {
        //dispatch set transaction type action
        console.log(event.target.value);
        dispatch(setTransactionType(event.target.value));
    };

    const handleSetTransactionCategory = (event) => {
        //dispatch set transaction category action
        console.log(event.target.value);
        dispatch(setTransactionCategory(event.target.value));
    };

    // const handleToggleDateRangeSelection = () => {
    //     //dispatch toggle date range selection action
    //     // console.log(event.target.checked);
    //     console.log("toggle date range selection: ", filterMenuStates.dateRangeSelection);
    //     if (filterMenuStates.dateRangeSelection) {
    //         dispatch(setStartDate("yyyy-mm-ddThh:mm"));
    //         dispatch(setEndDate("yyyy-mm-ddThh:mm"));
    //     }
    //     dispatch(toggleDateRangeSelection());
    // };

    const handleSetStartDate = (event) => {
        //dispatch set start date action
        console.log(event.target.value);
        dispatch(setStartDate(event.target.value));
    };

    const handleSetEndDate = (event) => {
        //dispatch set end date action
        console.log(event.target.value);
        dispatch(setEndDate(event.target.value));
    };

    const handleGenerateAnalytics = () => {
        //dispatch generate analytics action
        console.log("generate analytics");
        //send the analytics States state to the backend
        //get the plot data from the backend
        if ( filterMenuStates.startDate > filterMenuStates.endDate) {
                dispatch(showFailBox("Start date cannot be greater than End date"));
                return;
            }
        // const plotData = {
        //     labels: ['Jun', 'Jul', 'Aug'],
        //     datasets: [
        //                 {
        //                     id: 1,
        //                     label: 'In',
        //                     color: 'green',
        //                     data: [5, 6, 7],
        //                 },
        //                 {
        //                     id: 2,
        //                     label: 'Out',
        //                     color: 'red',
        //                     data: [3, 2, 1],
        //                 },
        //                 {
        //                     id: 3,
        //                     label: 'Expenditure',
        //                     color: 'yellow',
        //                     data: [1, 2, 3],
        //                 }
        //             ],
        // }
        
        // const doughnutPlotData = {
        //     labels: ["Groceries", "Restaurants and Dining", "Shopping", "Utilities", "Telecommunication",
        //              "Transportation", "Rent or Mortgage", "Insurance", "Healthcare", "Education", "Entertainment",
        //              "Travel and Lodging", "Personal Care", "Fitness and Wellness", "Investments and Savings", "Loans and Credit Payments",
        //              "Charity and Donations", "Home Improvement and Maintenance", "Childcare and Education", "Pet Care", "Taxes", 
        //              "Legal Services", "Other"],
        //     datasets: [
        //                 {
        //                     data: Array(23).fill(1).map(() => Math.floor(Math.random() * 1000) + 1),
        //                     backgroundColor: [
        //                         '#4CAF50', '#FF5722', '#9C27B0',
        //                         '#607D8B', '#3F51B5', '#FFEB3B',
        //                         '#795548', '#9E9E9E', '#F44336',
        //                         '#03A9F4', '#E91E63', '#00BCD4',
        //                         '#FFC107', '#8BC34A', '#CDDC39',
        //                         '#FF9800', '#673AB7', '#9E9D24',
        //                         '#2196F3', '#4CAF50', '#F44336',
        //                         '#3F51B5', '#607D8B'
        //                       ],
        //                     hoverBackgroundColor: [
        //                         '#1A7D1E', '#CD2500', '#6A007E',
        //                         '#2E4B59', '#0D1F83', '#CDB909',
        //                         '#472316', '#6C6C6C', '#C21104',
        //                         '#0077C2', '#B70031', '#008AA2',
        //                         '#CD8F00', '#599118', '#9BAA07',
        //                         '#CD6600', '#350885', '#6C6B00',
        //                         '#0064C1', '#1A7D1E', '#C21104',
        //                         '#0D1F83', '#2E4B59'
        //                       ],
        //                 },
        //             ]
        // };
        // const someStatBoxData = [
        //     {
        //       title: "Total Expenditure",
        //       value: "1000",
        //       color: "red",
        //     },
        //     {
        //       title: "Transaction In - Amount",
        //       value: "2000",
        //       color: "green",
        //     },
        //     {
        //       title: "Transaction Out - Amount",
        //       value: "1000",
        //       color: "green",
        //     },
        //     {
        //       title: "Transaction In - Number",
        //       value: "1000",
        //       color: "green",
        //     },
        //     {
        //       title: "Transaction Out - Number",
        //       value: "500",
        //       color: "green",
        //     },
        //     {
        //       title: "Number of Transactions",
        //       value: "1500",
        //       color: "green",
        //     },
        //     {
        //       title: "Number of Financial Entities",
        //       value: "10",
        //       color: "blue",
        //     },
        //     {
        //       title: "Number of Recurring Transactions Entities",
        //       value: "10",
        //       color: "orange",
        //     },
        //     {
        //       title: "Number of Transactins using Internal Financial Entities as Source",
        //       value: "10",
        //       color: "purple",
        //     },
        //     {
        //       title: "Number of Transactins using External Financial Entities as Source",
        //       value: "10",
        //       color: "pink",
        //     },
        //     {
        //       title: "Number of Transactins using Internal Financial Entities as Destination",
        //       value: "10",
        //       color: "yellow",
        //     },
        //     {
        //       title: "Number of Transactins using External Financial Entities as Destination",
        //       value: "10",
        //       color: "brown",
        //     },
        //   ];

        const someStatBoxData = [
            {
              title: "Total Exp.",
              value: "1000",
              color: "#FF0000", // Red
            },
            {
              title: "In - Amount",
              value: "2000",
              color: "#008000", // Green
            },
            {
              title: "Out - Amount",
              value: "1000",
              color: "#800000", // Maroon
            },
            {
              title: "In - Num",
              value: "1000",
              color: "#00FF00", // Lime
            },
            {
              title: "Out - Num",
              value: "500",
              color: "#808000", // Olive
            },
            {
              title: "Num Trans.",
              value: "1500",
              color: "#008080", // Teal
            },
            {
              title: "Num Fin. Entities",
              value: "10",
              color: "#0000FF", // Blue
            },
            {
              title: "Num Recur. Trans. Entities",
              value: "10",
              color: "#FF00FF", // Fuchsia
            },
            {
              title: "Num Trans. Int. Source",
              value: "10",
              color: "#800080", // Purple
            },
            {
              title: "Num Trans. Ext. Source",
              value: "10",
              color: "#FFA500", // Orange
            },
            {
              title: "Num Trans. Int. Dest.",
              value: "10",
              color: "#FFFF00", // Yellow
            },
            {
              title: "Num Trans. Ext. Dest.",
              value: "10",
              color: "#A52A2A", // Brown
            },
          ];
        // dispatch(setExpenditurePlotData(plotData.expenditurePlotData));
        dispatch(toggleUpdateExpenditurePlot());
        //dispatch(setStatsByCategoryPlotData(plotData.statsByCategoryPlotData));
        dispatch(toggleUpdateStatsByCategoryPlot());
        dispatch(setStatBoxData(someStatBoxData));
    };



    return (
        <div 
            className="flex flex-col flex-nowrap items-center h-auto mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg "
            style={{ width: 'calc(100% - 56px)' }}
        >
            <h2
                className="text-bold text-xl my-1 w-[100%] h-8 text-center"
            >
                Filter Menu
            </h2>
            <section
                className="flex flex-row flex-wrap justify-evenly w-[100%] h-auto p-1"
            >
                <section
                    className="mb-1 p-1 flex flex-col flex-nowrap items-center justify-start w-auto h-auto"
                >
                    <p
                        className="truncate"
                    >
                        Set Transaction Type
                    </p>
                    <select
                        className="border rounded-md bg-slate-100 text-semibold text-black-800 w-[100%] h-8 hover:bg-slate-200 border-slate-200 ml-2"
                        value={filterMenuStates.transactionType}
                        onChange={handleSetTransactionType}
                    >
                        <option key={0} value="All">All</option>
                        <option key={1} value="In">In</option>
                        <option key={2} value="Out">Out</option>
                        <option key={3} value="Expenditure">Expenditure</option>
                    </select>
                </section>
                <section
                    className="mb-1 p-1 flex flex-col flex-nowrap items-center w-auto h-auto"
                >
                    <p
                        className="truncate"
                    >
                        Transaction Category
                    </p>
                    <select
                        className="border rounded-md bg-slate-100 text-semibold text-black-800 w-[100%] h-8 hover:bg-slate-200 border-slate-200 ml-2"
                        value={filterMenuStates.transactionCategory}
                        onChange={handleSetTransactionCategory}
                    >
                        <option key={0} value="All">All</option>
                        {transactionCategories.map((category, index) => {
                            return <option key={index + 1} value={category}>{category}</option>
                        })}
                    </select>
                </section>
                <section
                    className="mb-1 p-1 flex flex-col flex-nowrap items-center w-auto h-auto"
                >
                    <p
                        className="truncate"
                    >
                        Currency
                    </p>
                    <select
                        className="border rounded-md bg-slate-100 text-semibold text-black-800 w-[100%] h-8 hover:bg-slate-200 border-slate-200 ml-2"
                        value={filterMenuStates.currency}
                        onChange={handleSetCurrency}
                    >
                        <option key={0} value="All">All</option>
                        {currencies.map((currency, index) => {
                            return <option key={index + 1} value={currency}>{currency}</option>
                        })}
                    </select>
                </section>
                <section
                    className="p-1 flex flex-col flex-nowrap items-center w-auto h-auto"
                >
                    <p
                        className="truncate"
                    >
                        Transaction Date Range
                    </p>
                    <section
                        className="flex flex-row flex-nowrap justify-start w-[100%] h-auto"
                    >
                        <label 
                            className="truncate w-[50%]"
                            htmlFor="analyticsStatsStartDate"
                        >
                            Start
                        </label>
                        <input 
                            className="h-[100%] w-[50%] py-1 text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back"
                            type="datetime-local" 
                            id="analyticsStatsStartDate"
                            value={filterMenuStates.startDate}
                            onChange={handleSetStartDate}
                        />
                        <label 
                            className="truncate w-[50%]"
                            htmlFor="analyticsStatsEndDate"
                        >
                            End
                        </label>
                        <input 
                            className="h-[100%] w-[50%] py-1 text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back"
                            type="datetime-local" 
                            id="analyticsStatsEndDate"
                            value={filterMenuStates.endDate}
                            onChange={handleSetEndDate}
                        />
                    </section>
                </section>
            </section>
            <button
                className="truncate border rounded-md bg-green-600 text-semibold text-white my-1 w-[15%] h-12 hover:bg-green-700 border-green-700"
                onClick={handleGenerateAnalytics}
            >
                Generate Analytics
            </button>
        </div>
    );
}

export default Topbar;