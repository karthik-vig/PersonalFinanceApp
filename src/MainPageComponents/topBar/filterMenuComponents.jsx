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
    } from '../../basicComponents/filterMenuLayoutComponents/filterMenuContainerLayouts.jsx';
//import { useImmer } from 'use-immer';
import { useSelector, useDispatch } from 'react-redux';
import {  //showFilter,
          hideFilter,
 } from '../../stateManagement/mainPageStates/filterDisplay.js';
import { toggleFilterParamsVisibility, resetFilterParamsVisibility } from '../../stateManagement/mainPageStates/filterParamsVisibility.js';
import { setFilterParams } from '../../stateManagement/mainPageStates/searchParams.js';
import { setRecurringTransactions } from '../../stateManagement/sharedStates/additionalInformation.js';
import { useEffect } from 'react';
import { faTimes, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faTimes, faEraser);

function FilterMenu(){
    

    const filterParamsVisibility = useSelector((state) => state.mainPageStates.filterParamsVisibility);
    const displayState = useSelector((state) => state.mainPageStates.filterDisplayState);
    const dispatch = useDispatch();

    const handleInputChange = (fieldName, fieldValue) => dispatch(setFilterParams({fieldName, fieldValue}));
    const toggleFieldVisibility = (fieldName) => dispatch(toggleFilterParamsVisibility(fieldName));

    //get from backend api
    const currencies = useSelector((state) => state.sharedStates.additionalInformationState.currencies);
    const transactionCategories = useSelector((state) => state.sharedStates.additionalInformationState.transactionCategories);
    const transactionEntities = useSelector((state) => state.sharedStates.additionalInformationState.transactionEntities);
    const recurringTransactions = useSelector((state) => state.sharedStates.additionalInformationState.recurringTransactions);

    //convert transactionEntities to an array of transactionEntity names
    const transactionEntityNames = Object.keys(transactionEntities).map((key) => transactionEntities[key].name );

    //fetch additional information from the main process
    //and set transaction entities value
    useEffect(() => {
        window.recurringTransactionOperations.getRecurringTransactions().then((retrievedRecurringTransactions) => {
            dispatch(setRecurringTransactions(retrievedRecurringTransactions));
        });
    }, [dispatch,]);

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
                    <FontAwesomeIcon icon={faEraser} color="#1a1a1a" className="h-6 w-6"/>
                </button>
                <button
                    className="flex justify-center items-center h-8 w-8 rounded-lg border bg-red-500 border-red-700 hover:bg-red-800 drop-shadow-lg"
                    onClick={() => dispatch(hideFilter())}
                >
                    <FontAwesomeIcon icon={faTimes} color="#ffffff" className="h-6 w-6"/>
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
            <FilterSelectInputParam
                headingText="Recurring Entity"
                fieldName="recurringEntity"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={recurringTransactions}
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
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Transaction Date"
                fieldName="transactionDate"
                toggleDisplay={toggleFieldVisibility}
                filterParamsVisibility={filterParamsVisibility}
            >
                <DateInputField
                    additionalClasses=""
                    fieldName="transactionDateMin"
                    handleInputChange={handleInputChange}
                />
                <DateInputField
                    additionalClasses=""
                    fieldName="transactionDateMax"
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
                        "transactionDate",
                        ]}
            />
        </div>
    );
}


export default FilterMenu;