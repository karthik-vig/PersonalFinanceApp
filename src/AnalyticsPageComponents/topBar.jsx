import { useSelector, useDispatch } from 'react-redux';
import {
    // setPlotData,
    setTransactionType,
    setTransactionCategory,
    setCurrency,
    // toggleDateRangeSelection,
    setStartDate,
    setEndDate,
} from '../stateManagement/analyticsPageStates/filterMenu.js';
import { setExpenditurePlotData, setStatsByCategoryPlotData } from '../stateManagement/analyticsPageStates/plotData.js';
import { showFailBox } from '../stateManagement/financialEntityPageStates/failBoxDisplay.js';


function Topbar() {

    const dispatch = useDispatch();

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const currencies = useSelector(state => state.sharedStates.additionalInformationState.currencies);
    const transactionCategories = useSelector(state => state.sharedStates.additionalInformationState.transactionCategories);



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
        const plotData = {
            labels: ['Jun', 'Jul', 'Aug'],
            datasets: [
                        {
                            id: 1,
                            label: 'In',
                            color: 'green',
                            data: [5, 6, 7],
                        },
                        {
                            id: 2,
                            label: 'Out',
                            color: 'red',
                            data: [3, 2, 1],
                        },
                        {
                            id: 3,
                            label: 'Expenditure',
                            color: 'yellow',
                            data: [1, 2, 3],
                        }
                    ],
        }
        const doughnutPlotData = {
            labels: ['Food', 'Transport', 'Entertainment'],
            datasets: [
                        {
                            data: [5, 6, 7],
                        }
                    ],
        };
        dispatch(setExpenditurePlotData(plotData));
        dispatch(setStatsByCategoryPlotData(doughnutPlotData));
    };



    return (
        <div 
            className="flex flex-col flex-nowrap items-center h-36 mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg "
            style={{ width: 'calc(100% - 56px)' }}
        >
            <h2>Filter Menu</h2>
            <section
                className="flex flex-row flex-nowrap justify-evenly w-[100%] h-[95%] p-1"
            >
                <section
                    className="mb-1 p-1 flex flex-col items-center flex-nowrap justify-start w-[15%] h-[100%]"
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
                    className="mb-1 p-1 flex flex-col flex-nowrap items-center w-[15%] h-auto"
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
                    className="mb-1 p-1 flex flex-col flex-nowrap items-center w-[15%] h-auto"
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
                        {currencies.map((currency, index) => {
                            return <option key={index} value={currency}>{currency}</option>
                        })}
                    </select>
                </section>
                <section
                    className="p-1 flex flex-col flex-nowrap items-center w-[30%] h-auto"
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