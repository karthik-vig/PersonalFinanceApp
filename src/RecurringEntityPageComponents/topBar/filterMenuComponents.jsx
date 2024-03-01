//import PropTypes from 'prop-types';
import '../../index.css';
import {
        NumberInputField,
        DateInputField,
        //DateInputField,
    } from '../../basicComponents/filterMenuLayoutComponents/basicFilterInputComponents.jsx';
import {FilterRangeInputParam,
        FilterSelectInputParam,
        FilterSortInputParam,
        FilterSelectFinancialEntityInputParam,
        SelectInputField,
    } from '../../basicComponents/filterMenuLayoutComponents/filterMenuContainerLayouts.jsx';
//import { useImmer } from 'use-immer';
import { useSelector, useDispatch } from 'react-redux';
import {  //showFilter,
          hideFilter,
 } from '../../stateManagement/recurringEntityPageStates/filterDisplay.js';
import { toggleFilterParamsVisibility, resetFilterParamsVisibility } from '../../stateManagement/recurringEntityPageStates/filterParamsVisibility.js';
import { setFilterParams } from '../../stateManagement/recurringEntityPageStates/searchParams.js';
//import { setRecurringTransactions } from '../../stateManagement/sharedStates/additionalInformation.js';
//import { useEffect } from 'react';
// import { faTimes, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// library.add(faTimes, faEraser);

function FilterMenu(){
    

    const filterParamsVisibility = useSelector((state) => state.recurringEntityPageStates.filterParamsVisibility);
    const displayState = useSelector((state) => state.recurringEntityPageStates.filterDisplayState);
    const dispatch = useDispatch();

    const handleInputChange = (fieldName, fieldValue) => dispatch(setFilterParams({fieldName, fieldValue}));
    const toggleFieldVisibility = (fieldName) => dispatch(toggleFilterParamsVisibility(fieldName));

    //get from backend api
    const currencies = useSelector((state) => state.sharedStates.additionalInformationState.currencies);
    const transactionCategories = useSelector((state) => state.sharedStates.additionalInformationState.transactionCategories);
    const transactionEntities = useSelector((state) => state.sharedStates.additionalInformationState.transactionEntities);

    /*
    useEffect(() => {
        window.recurringTransactionOperations.getRecurringTransactions().then((retrievedRecurringTransactions) => {
            dispatch(setRecurringTransactions(retrievedRecurringTransactions));
        });
    }, [dispatch,
    ]);
    */

    //convert transactionEntities to an array of transactionEntity names
    const transactionEntityNames = Object.keys(transactionEntities).map((key) => transactionEntities[key].name );

    return (
        <div 
            className={" h-96 w-[50%] z-50 top-[65px] left-[30%] absolute rounded-lg border bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll " + displayState}
        >
            <section 
                className="flex justify-evenly items-center h-8 w-full"
            >
                <button
                    className="flex justify-center items-center h-8 w-8 rounded-lg border bg-gray-100 border-gray-500 hover:bg-gray-300 hover:text-white drop-shadow-lg"
                    onClick={() => dispatch(resetFilterParamsVisibility())}
                >
                    <FontAwesomeIcon icon="fa-eraser" color="#1a1a1a" className="h-6 w-6"/>
                </button>
                <button
                    className="flex justify-center items-center h-8 w-8 rounded-lg border bg-red-500 border-red-700 hover:bg-red-800 drop-shadow-lg"
                    onClick={() => dispatch(hideFilter())}
                >
                    <FontAwesomeIcon icon="fa-times" color="#ffffff" className="h-6 w-6"/>
                </button>
            </section>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Value"
                fieldName="value"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <NumberInputField
                    additionalClasses=""
                    fieldName="valueMin"
                    handleInputChange={handleInputChange}
                />
                <NumberInputField
                    additionalClasses=""
                    fieldName="valueMax"
                    handleInputChange={handleInputChange}
                />
            </FilterRangeInputParam>
            <FilterSelectInputParam
                headingText="Currency"
                fieldName="currency"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={currencies}
            />
            <FilterSelectInputParam
                headingText="Transaction Type"
                fieldName="transactionType"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["In", "Out"]}
            />
            <FilterSelectInputParam
                headingText="Transaction Category"
                fieldName="transactionCategory"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={transactionCategories}
            />
            <FilterSelectFinancialEntityInputParam
                headingText="From Financial Entity"
                fieldName="fromEntity"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={transactionEntityNames}
            />
            <FilterSelectFinancialEntityInputParam
                headingText="To Financial Entity"
                fieldName="toEntity"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={transactionEntityNames}
            />
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Created Date"
                fieldName="createdDate"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <DateInputField
                    additionalClasses=""
                    fieldName="createdDateMin"
                    handleInputChange={handleInputChange}
                />
                <DateInputField
                    additionalClasses=""
                    fieldName="createdDateMax"
                    handleInputChange={handleInputChange}
                />
            </FilterRangeInputParam>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Modified Date"
                fieldName="modifiedDate"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <DateInputField
                    additionalClasses=""
                    fieldName="modifiedDateMin"
                    handleInputChange={handleInputChange}
                />
                <DateInputField
                    additionalClasses=""
                    fieldName="modifiedDateMax"
                    handleInputChange={handleInputChange}
                />
            </FilterRangeInputParam>
            <FilterSelectInputParam
                headingText="Recurring: Frequency"
                fieldName="recurringFrequencyType"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["Daily", "Weekly", "Monthly", "Yearly"]}
            />
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Recurring: Day of the Week"
                fieldName="recurringFrequencyDayOfTheWeek"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <SelectInputField
                    additionalClasses=""
                    fieldName="recurringFrequencyDayOfTheWeekMin"
                    handleInputChange={handleInputChange}
                    selectOptions={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                />
                <SelectInputField
                    additionalClasses=""
                    fieldName="recurringFrequencyDayOfTheWeekMax"
                    handleInputChange={handleInputChange}
                    selectOptions={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                />
            </FilterRangeInputParam>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Recurring: Day of the Month"
                fieldName="recurringFrequencyDayOfTheMonth"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <SelectInputField
                    additionalClasses=""
                    fieldName="recurringFrequencyDayOfTheMonthMin"
                    handleInputChange={handleInputChange}
                    selectOptions={Array(31).fill().map((_, i) => i + 1)}
                />
                <SelectInputField
                    additionalClasses=""
                    fieldName="recurringFrequencyDayOfTheMonthMax"
                    handleInputChange={handleInputChange}
                    selectOptions={Array(31).fill().map((_, i) => i + 1)}
                />
            </FilterRangeInputParam>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Recurring: Month of the Year"
                fieldName="recurringFrequencyMonthOfTheYear"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <SelectInputField
                    additionalClasses=""
                    fieldName="recurringFrequencyMonthOfTheYearMin"
                    handleInputChange={handleInputChange}
                    selectOptions={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                />
                <SelectInputField
                    additionalClasses=""
                    fieldName="recurringFrequencyMonthOfTheYearMax"
                    handleInputChange={handleInputChange}
                    selectOptions={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                />
            </FilterRangeInputParam>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Recurring: Frequency Time"
                fieldName="recurringFrequencyTime"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <input
                    type="time"
                    className="w-full h-8 rounded-md border border-primary-cl "
                    onChange={(event) => handleInputChange("recurringFrequencyTimeMin", event.target.value)}
                    readOnly={false}
                />
                <input
                    type="time"
                    className="w-full h-8 rounded-md border border-primary-cl "
                    onChange={(event) => handleInputChange("recurringFrequencyTimeMax", event.target.value)}
                    readOnly={false}
                />
            </FilterRangeInputParam>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Recucrring: Transaction Start Date"
                fieldName="recurringTransactionStartDate"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <DateInputField
                    additionalClasses=""
                    fieldName="recurringTransactionStartDateMin"
                    handleInputChange={handleInputChange}
                />
                <DateInputField
                    additionalClasses=""
                    fieldName="recurringTransactionStartDateMax"
                    handleInputChange={handleInputChange}
                />
            </FilterRangeInputParam>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Recurring: Transaction End Date"
                fieldName="recurringTransactionEndDate"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <DateInputField
                    additionalClasses=""
                    fieldName="recurringTransactionEndDateMin"
                    handleInputChange={handleInputChange}
                />
                <DateInputField
                    additionalClasses=""
                    fieldName="recurringTransactionEndDateMax"
                    handleInputChange={handleInputChange}
                />
            </FilterRangeInputParam>
            <FilterSortInputParam
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                fields={["title",
                        "description",
                        "value",  
                        "createdDate", 
                        "modifiedDate", 
                        "recurringTransactionStartDate",
                        "recurringTransactionEndDate",
                        "recurringFrequencyTime",
                        "recurringFrequencyMonthOfTheYear",
                        "recurringFrequencyDayOfTheMonth",
                        "recurringFrequencyDayOfTheWeek",
                        ]}
            />
        </div>
    );
}


export default FilterMenu;