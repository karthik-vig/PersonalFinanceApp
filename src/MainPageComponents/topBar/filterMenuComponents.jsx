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
    } from '../../basicComponents/filterMenuLayoutComponents/filterMenuContainerLayouts.jsx';
//import { useImmer } from 'use-immer';
import { useSelector, useDispatch } from 'react-redux';
import {  //showFilter,
          hideFilter,
 } from '../../stateManagement/mainPageStates/filterDisplay.js';
import { toggleFilterParamsVisibility } from '../../stateManagement/mainPageStates/filterParamsVisibility.js';
import { setFilterParams } from '../../stateManagement/mainPageStates/searchParams.js';
import { setRecurringTransactions } from '../../stateManagement/mainPageStates/additionalInformation.js';
import { useEffect } from 'react';

function FilterMenu(){
    

    const filterParamsVisibility = useSelector((state) => state.filterParamsVisibility);
    const displayState = useSelector((state) => state.filterDisplayState);
    const dispatch = useDispatch();

    const handleInputChange = (fieldName, fieldValue) => dispatch(setFilterParams({fieldName, fieldValue}));
    const toggleFieldVisibility = (fieldName) => dispatch(toggleFilterParamsVisibility(fieldName));

    //get from backend api
    const currencies = useSelector((state) => state.additionalInformationState.currencies);
    const transactionCategories = useSelector((state) => state.additionalInformationState.transactionCategories);
    const transactionEntities = useSelector((state) => state.additionalInformationState.transactionEntities);
    const recurringTransactions = useSelector((state) => state.additionalInformationState.recurringTransactions);

    useEffect(() => {
        window.recurringTransactionOperations.getRecurringTransactions().then((retrievedRecurringTransactions) => {
            dispatch(setRecurringTransactions(retrievedRecurringTransactions));
        });
    }, [dispatch,
    ]);
    
    //convert transactionEntities to an array of transactionEntity names
    const transactionEntityNames = Object.keys(transactionEntities).map((key) => transactionEntities[key].name );

    return (
        <div 
            className={" h-96 w-[50%] z-50 top-[65px] left-[30%] absolute rounded-lg border bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll " + displayState}
        >
            <button
                className="sticky top-0 left-[90%] h-8 w-16 rounded-lg border bg-surface-cl drop-shadow-lg"
                onClick={() => dispatch(hideFilter())}
            >
                Close
            </button>
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
            <FilterSelectInputParam
                headingText="From Type"
                fieldName="fromType"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["Internal", "External"]}
            />
            <FilterSelectInputParam
                headingText="From Entity"
                fieldName="fromEntity"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={transactionEntityNames}
            />
            <FilterSelectInputParam
                headingText="To Type"
                fieldName="toType"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["Internal", "External"]}
            />
            <FilterSelectInputParam
                headingText="To Entity"
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
            />
        </div>
    );
}

FilterMenu.propTypes = {
    //displayState: PropTypes.string,
    //setSearchParams: PropTypes.func,
    //filterParamsVisibility: PropTypes.object,
    //setFilterParamsVisibility: PropTypes.func,
    //changeDisplayState: PropTypes.func,
};

export default FilterMenu;