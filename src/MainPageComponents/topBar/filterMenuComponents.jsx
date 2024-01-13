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

function FilterMenu(/*{ 
                      //displayState="hidden", 
                      //setSearchParams, 
                      //filterParamsVisibility, 
                      //setFilterParamsVisibility, 
                      //changeDisplayState 
                    }*/){
    

    //each filter param is enabled or disabled based on the whether
    //they are checked in the checkbox or not
    /*
    let filterParams = {
                        value: {
                            min: null, //number input
                            max: null, //number input
                        },
                        currency: null, //select list
                        transactionType: null, //select list
                        transactionCategory: null, //select list
                        fromType: null, //select list
                        fromEntity: null, //select list
                        toType: null, //select list
                        toEntity: null, //select list
                        recurringEntity: null, //select list
                        createdDate: { min: null, //date picker
                                        max: null, //date picker
                                        },
                        modifiedDate: { min: null, //date picker
                                        max: null, //date picker
                                        },
                        transactionDate: { min: null, //date picker
                                            max: null, //date picker
                                        },
                        sort: { ascending: true, //select list; can be true or false
                                field: null, //select list; some valid field name
                            },
                        };
    */

    
    /*
    const toggleDisplay = (fieldName) => {
        setFilterParamsVisibility(draft => {
            draft[fieldName] = !draft[fieldName];
        });
    }
    */

    /*
    const handleInputChange = (fieldName, fieldValue) => {
        setSearchParams(draft => {
            const fieldSuffice = fieldName.slice(-3);
            if (fieldSuffice === "Min" || fieldSuffice === "Max") {
                const filterFieldName = fieldName.slice(0, -3);
                draft.filter[filterFieldName][fieldSuffice.toLowerCase()] = fieldValue;
            }
            else {
                draft.filter[fieldName] = fieldValue;
            }
        });
        console.log(fieldName, fieldValue);
    };
    */

    const filterParamsVisibility = useSelector((state) => state.filterParamsVisibility);
    const displayState = useSelector((state) => state.filterDisplayState);
    const dispatch = useDispatch();

    const handleInputChange = (fieldName, fieldValue) => dispatch(setFilterParams({fieldName, fieldValue}));
    const toggleFieldVisibility = (fieldName) => dispatch(toggleFilterParamsVisibility(fieldName));

    //get from backend api
    const currencies = ["RON", "EUR", "USD"];
    const transactionCategories = ["Salary", "Food", "Clothes", "Rent", "Utilities", "Other"];
    const transactionEntities = [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}];
    const recurringEntities = ["entity1", "entity2", "entity3", "entity4"];
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
                selectOptions={recurringEntities}
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