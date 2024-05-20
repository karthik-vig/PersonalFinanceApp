import { useSelector, useDispatch } from 'react-redux';
import porpType from 'prop-types';
import { useEffect } from 'react';
import {
    // setPlotData,
    setTransactionType,
    setTransactionCategory,
    setCurrency,
    // toggleDateRangeSelection,
    setStartDate,
    setEndDate,
    toggleInformationPopUp,
    setInformationPopUpInformation,
} from '../stateManagement/analyticsPageStates/filterMenu.js';
import {
    toggleUpdateExpenditurePlot, 
    toggleUpdateStatsByCategoryPlot,
    toggleUpdateStatBox,
} from '../stateManagement/analyticsPageStates/generateAnalytics.js';
import { 
    setExpenditurePlotData, 
    setStatsByCategoryPlotData, 
    setStatBoxData,
} from '../stateManagement/analyticsPageStates/plotData.js';
import { 
    setFailBoxMessage,
    toggleFailBoxDisplay,
} from '../stateManagement/analyticsPageStates/failBox.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function DisplayInformationPopUp({ 
                                    data, 
                                    displayState = "hidden",
                                    toggleDisplayState,
                                 }) {

    const dispatch = useDispatch();

    return (
        <div
            className={"absolute z-10 \
                        top-[20%] sm:left-[15%] md:left[20%] lg:left-[30%] \
                        flex flex-col flex-nowrap sm:w-[80%] md:w-[70%] lg:w-[40%] \
                        h-auto max-h-96 p-2 \
                        rounded-lg border bg-surface-cl drop-shadow-2xl overflow-y-scroll " + displayState 
                    }
        >
            <button
                className="flex flex-row flex-nowarp justify-end items-center"
                onClick={() => dispatch(toggleDisplayState())}
            >
                <FontAwesomeIcon
                    className="m-1 h-4 w-4"
                    icon="fa-times"
                    color="#FF0000"
                />
            </button>
            {   
                data.map((info, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-col flex-nowrap items-start justify-start w-auto h-auto p-1 my-2"
                        >
                            <h3
                                className="text-semibold text-xl my-1"
                            >
                                {info.heading}
                            </h3>
                            <p
                                className="flex flex-wrap text-justify text-black text-base my-1"
                            >
                                {info.content}
                            </p>
                        </div>
                    );
                })
            }
        </div>
    );
}

DisplayInformationPopUp.propTypes = {
    data: porpType.array.isRequired,
    displayState: porpType.string,
    toggleDisplayState: porpType.func.isRequired,
};

function TransactionTypeSection() {

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const dispatch = useDispatch();

    const handleSetTransactionType = (event) => {
        //dispatch set transaction type action
        // console.log(event.target.value);
        dispatch(setTransactionType(event.target.value));
    };

    return (
        <section
            className="mb-1 p-1 flex flex-col flex-nowrap items-center justify-start w-auto h-auto mx-2"
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
    );
}


function TransactionCategorySection() {

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const transactionCategories = useSelector(state => state.sharedStates.additionalInformationState.transactionCategories);
    const dispatch = useDispatch();
    
    const handleSetTransactionCategory = (event) => {
        //dispatch set transaction category action
        // console.log(event.target.value);
        dispatch(setTransactionCategory(event.target.value));
    };
    
    return (
        <section
            className="mb-1 p-1 flex flex-col flex-nowrap items-center w-auto h-auto mx-2"
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
    );
}


function TransactionCurrencySection() {

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const currencies = useSelector(state => state.sharedStates.additionalInformationState.currencies);
    const dispatch = useDispatch();

    const handleSetCurrency = (event) => {
        //dispatch set currency action
        // console.log(event.target.value);
        dispatch(setCurrency(event.target.value));
    };

    return (
        <section
            className="mb-1 p-1 flex flex-col flex-nowrap items-center w-auto h-auto mx-2"
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
    );
}

function DateRangeSelectionSection() {

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const dispatch = useDispatch();

    const handleSetStartDate = (event) => {
        //dispatch set start date action
        // console.log(event.target.value);
        dispatch(setStartDate(event.target.value + ":00"));
    };

    const handleSetEndDate = (event) => {
        //dispatch set end date action
        // console.log(event.target.value);
        dispatch(setEndDate(event.target.value + ":00"));
    };

    return (
        <section
            className="p-1 flex flex-col flex-nowrap items-center w-auto h-auto mx-2"
        >
            <p
                className="truncate"
            >
                Transaction Date Range
            </p>
            <section
                className="flex flex-row flex-nowrap justify-start items-center w-[100%] h-auto"
            >
                <label 
                    className="truncate w-[8%] ml-1"
                    htmlFor="analyticsStatsStartDate"
                >
                    Start
                </label>
                <input 
                    className="h-[100%] w-[38%] py-1 text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back"
                    type="datetime-local" 
                    id="analyticsStatsStartDate"
                    value={filterMenuStates.startDate}
                    onChange={handleSetStartDate}
                />
                <label 
                    className="truncate w-[8%] ml-1"
                    htmlFor="analyticsStatsEndDate"
                >
                    End
                </label>
                <input 
                    className="h-[100%] w-[38%] py-1 text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back"
                    type="datetime-local" 
                    id="analyticsStatsEndDate"
                    value={filterMenuStates.endDate}
                    onChange={handleSetEndDate}
                />
            </section>
        </section>
    );
}


function GenerateAnalyticsButtonSection() {

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const dispatch = useDispatch();

    const handleGenerateAnalytics = () => {
        //dispatch generate analytics action
        // console.log("generate analytics");
        //send the analytics States state to the backend
        //get the plot data from the backend
        if ( filterMenuStates.startDate > filterMenuStates.endDate) {
                dispatch(setFailBoxMessage("Start datetime should not be greater than End datetime"));
                dispatch(toggleFailBoxDisplay());
                return;
            }
        
        dispatch(toggleUpdateExpenditurePlot());
        dispatch(toggleUpdateStatsByCategoryPlot());
        dispatch(toggleUpdateStatBox());
    };

    return (
        <button
            className="truncate border rounded-md bg-green-600 text-semibold text-white my-1 w-[15%] h-12 hover:bg-green-700 border-green-700"
            onClick={handleGenerateAnalytics}
        >
            Generate Analytics
        </button>
    );
}


function Topbar() {

    const dispatch = useDispatch();

    const filterMenuStates = useSelector(state => state.analyticsPageStates.filterMenu);
    const generateAnalytics = useSelector(state => state.analyticsPageStates.generateAnalytics);

    // set the line plot data
    useEffect(() => {
        //get the plot data from the backend
        if (!generateAnalytics.updateExpenditurePlot) return;
        window.transactionOperations.getLinePlotData(filterMenuStates).then((expenditurePlotData) => {
            dispatch(setExpenditurePlotData(expenditurePlotData));
        }).catch((err) => {
            // console.log("Error getting the plot data: ", err);
            // dispatch(setExpenditurePlotData(err.additionalInfo.value));
            dispatch(setFailBoxMessage("Could not fetch the data for the Line Plot"));
            dispatch(toggleFailBoxDisplay());
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
            // console.log("Error getting the plot data: ", err);
            // dispatch(setStatsByCategoryPlotData(err.additionalInfo.value));
            dispatch(setFailBoxMessage("Could not fetch the data for the Pie Plot"));
            dispatch(toggleFailBoxDisplay());
        });
        dispatch(toggleUpdateStatsByCategoryPlot());
    }, [generateAnalytics.updateStatsByCategoryPlot,
        filterMenuStates,
        dispatch,
    ]);

    // set the stat box data
    useEffect(() => {
        //get the plot data from the backend
        if (!generateAnalytics.updateStatBox) return;
        window.commonOperations.getStatsAboutDB(filterMenuStates).then((statBoxData) => {
            dispatch(setStatBoxData(statBoxData));
        }).catch((err) => {
            // console.log("Error getting the plot data: ", err);
            dispatch(setFailBoxMessage("Could not fetch the data for the Stat Box"));
            dispatch(toggleFailBoxDisplay());
        });
        dispatch(toggleUpdateStatBox());
    }, [generateAnalytics.updateStatBox,
        filterMenuStates,
        dispatch,
    ]);


    // set the information pop up information
    useEffect(() => { 
        window.initializeDatabase.getConfigFile().then((configFile) => {
            dispatch(setInformationPopUpInformation(configFile.analyticsPageFilterMenuInformation));
        });
    }, [dispatch,]);
    
    
    return (
        <div 
        className="relative z-10 flex flex-col flex-nowrap items-center h-auto mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg w-auto "
        //id="analyticsTopbar"
        >
            <DisplayInformationPopUp 
                data={filterMenuStates.informationPopUp.information}
                displayState={filterMenuStates.informationPopUp.state}
                toggleDisplayState={toggleInformationPopUp}
            />
            <section
                className="flex flex-row flex-nowrap justify-center items-center w-auto h-auto p-1"
            >
                <h2
                    className="text-bold text-xl my-1 w-auto h-8 text-center"
                >
                    Filter Menu
                </h2>
                <button
                    onClick={() => dispatch(toggleInformationPopUp())}
                >
                    <FontAwesomeIcon 
                        className="m-1 h-4 w-4"
                        icon="fa-circle-info"
                        color="#FFB818"
                    />
                </button>
            </section>
            <section
                className="flex flex-row flex-wrap justify-evenly w-[100%] h-auto p-1"
            >
                <TransactionTypeSection />
                <TransactionCategorySection />
                <TransactionCurrencySection />
                <DateRangeSelectionSection />
            </section>
            <GenerateAnalyticsButtonSection />
        </div>
    );
}

export default Topbar;