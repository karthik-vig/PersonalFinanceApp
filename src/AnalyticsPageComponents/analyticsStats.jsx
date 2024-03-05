import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import {
    setPlotData,
    setTransactionType,
    setCurrency,
    toggleDateRangeSelection,
    setStartDate,
    setEndDate,
} from '../stateManagement/analyticsPageStates/analyticsStats.js';


function AnalyticsStats() {

    // mock data; replace with data from redux store
    // const linePlotData = {
    //     labels: ['Jun', 'Jul', 'Aug'],
    //     datasets: [
    //       {
    //         id: 1,
    //         label: 'Line 1',
    //         data: [5, 6, 7],
    //       },
    //       {
    //         id: 2,
    //         label: 'Line 2',
    //         data: [3, 2, 1],
    //       },
    //     ],
    //   };

    const dispatch = useDispatch();

    const analyticsStatsStates = useSelector(state => state.analyticsPageStates.analyticsStats);
    const currencies = useSelector(state => state.sharedStates.additionalInformationState.currencies);

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

    const handleToggleDateRangeSelection = (event) => {
        //dispatch toggle date range selection action
        console.log(event.target.checked);
        dispatch(toggleDateRangeSelection());
    };

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
        dispatch(setPlotData(plotData));
    };

    return (
        <section>
            <h2>Analytics Stats</h2>
            <section>
                <p>Set Transaction Type:</p>
                <select
                    value={analyticsStatsStates.transactionType}
                    onChange={handleSetTransactionType}
                >
                    <option value="All">All</option>
                    <option value="In">In</option>
                    <option value="Out">Out</option>
                    <option value="Expenditure">Expenditure</option>
                </select>
            </section>
            <section>
                <p>Set Currency:</p>
                <select
                    value={analyticsStatsStates.currency}
                    onChange={handleSetCurrency}
                >
                    {currencies.map((currency, index) => {
                        return <option key={index} value={currency}>{currency}</option>
                    })}
                </select>
            </section>
            <section>
                <section>
                    <input 
                        type="checkbox" 
                        id="analyticsStatsTransactionToggle"
                        checked={analyticsStatsStates.dateRangeSelection}
                        onChange={handleToggleDateRangeSelection}
                    />
                    <label 
                        htmlFor="analyticsStatsTransactionToggle"
                    >
                        All Date Selected; Toggle to Enable Date Range Selection
                    </label>
                </section>
                <section
                    hidden={!analyticsStatsStates.dateRangeSelection}
                >
                    <label 
                        htmlFor="analyticsStatsStartDate"
                    >
                        Start Date:
                    </label>
                    <input 
                        type="datetime-local" 
                        id="analyticsStatsStartDate"
                        value={analyticsStatsStates.startDate}
                        onChange={handleSetStartDate}
                    />
                    <label 
                        htmlFor="analyticsStatsEndDate"
                    >
                        Start Date:
                    </label>
                    <input 
                        type="datetime-local" 
                        id="analyticsStatsEndDate"
                        value={analyticsStatsStates.endDate}
                        onChange={handleSetEndDate}
                    />
                </section>
            </section>
            <button
                onClick={handleGenerateAnalytics}
            >
                Generate Analytics
            </button>
            <Line 
                datasetIdKey="someIDValueForTheLineChart"
                data={analyticsStatsStates.plotData} 
            />
        </section>
    );
}

export default AnalyticsStats;