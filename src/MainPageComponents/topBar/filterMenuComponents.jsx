import PropTypes from 'prop-types';
import React from 'react';
import '../../index.css';
import { useImmer } from 'use-immer';
import {
        H6Heading,
        LabelText,
        CheckboxInputField,
        NumberInputField,
        SelectInputField,
        DateInputField,
        //DateInputField,
        } from './basicComponents.jsx';

function FilterParamHeadingSection({ additionalClasses, fieldName, headingText, handleInputChange}){
    return (
        <section
            className={"flex flex-row flex-wrap justify-start " + additionalClasses}
        >
            <CheckboxInputField
                additionalClasses=""
                fieldName={fieldName}
                handleInputChange={handleInputChange}
            />
            <H6Heading
                additionalClasses=""
                headingText={headingText}
            />
        </section>
    );
}

FilterParamHeadingSection.propTypes = {
    additionalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    headingText: PropTypes.string,
    handleInputChange: PropTypes.func,
};

function FilterParamInputSection({ additionalClasses, labelText, children}){
    return (
        <section
            className={"flex flex-row flex-wrap justify-start " + additionalClasses}
        >
            <LabelText
                additionalClasses=""
                labelText={labelText}
            />
            {children}
        </section>
    );
}

FilterParamInputSection.propTypes = {
    additionalClasses: PropTypes.string,
    labelText: PropTypes.string,
    children: PropTypes.node,
};

function FilterParamSection({additionalClasses, headingText, toggleDisplay, children}){

    return (
        <div
            className={"flex flex-row flex-wrap justify-start " + additionalClasses}
        >
            <FilterParamHeadingSection
                additionalClasses=""
                fieldName={headingText}
                headingText={headingText}
                handleInputChange={toggleDisplay}
            />
            {children}
        </div>
    );
}

FilterParamSection.propTypes = {
    additionalClasses: PropTypes.string,
    headingText: PropTypes.string,
    toggleDisplay: PropTypes.func,
    children: PropTypes.node,
};

function FilterRangeInputParam({ labelText, headingText, fieldName, toggleDisplay, filterParamsVisibility, children}){

    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];
    const secondChild = childrenArray[1];
    
    return (
        <FilterParamSection
                additionalClasses=""
                headingText={headingText}
                toggleDisplay={() => toggleDisplay(fieldName)}
            >
                <FilterParamInputSection
                    additionalClasses={filterParamsVisibility[fieldName] ? "flex" : "hidden"}
                    labelText={labelText["rangeStart"]}
                >
                    {firstChild}
                </FilterParamInputSection>
                <FilterParamInputSection
                    additionalClasses={filterParamsVisibility[fieldName] ? "flex" : "hidden"}
                    labelText={labelText["rangeStart"]}
                >
                    {secondChild}
                </FilterParamInputSection>
            </FilterParamSection>
    );
}

FilterRangeInputParam.propTypes = {
    labelText: PropTypes.object,
    headingText: PropTypes.string,
    fieldName: PropTypes.string,
    toggleDisplay: PropTypes.func,
    filterParamsVisibility: PropTypes.object,
    children: PropTypes.node,
};

function FilterSelectInputParam({ headingText, fieldName, toggleDisplay, handleInputChange, filterParamsVisibility, selectOptions}){
    return (
        <FilterParamSection
                additionalClasses=""
                headingText={headingText}
                toggleDisplay={() => toggleDisplay(fieldName)}
            >
                <FilterParamInputSection
                    additionalClasses={filterParamsVisibility[fieldName] ? "flex" : "hidden"}
                    labelText=""
                >
                    <SelectInputField
                        additionalClasses=""
                        fieldName={fieldName}
                        handleInputChange={handleInputChange}
                        selectOptions={selectOptions}
                    />
                </FilterParamInputSection>
        </FilterParamSection>
    );
}

FilterSelectInputParam.propTypes = {
    headingText: PropTypes.string,
    fieldName: PropTypes.string,
    toggleDisplay: PropTypes.func,
    handleInputChange: PropTypes.func,
    filterParamsVisibility: PropTypes.object,
    selectOptions: PropTypes.array,
};

function FilterSortInputParam({ toggleDisplay, handleInputChange, filterParamsVisibility}){
    
    const fields = ["value", 
                    "currency", 
                    "transactionType", 
                    "transactionCategory", 
                    "fromType", 
                    "fromEntity", 
                    "toType", 
                    "toEntity", 
                    "recurringEntity", 
                    "createdDate", 
                    "modifiedDate", 
                    "transactionDate",
                ]
    
    return (
        <FilterParamSection
            additionalClasses=""
            headingText="Sort"
            toggleDisplay={() => toggleDisplay("sort")}
        >
            <FilterParamInputSection
                additionalClasses={filterParamsVisibility["sort"] ? "flex" : "hidden"}
                labelText="Ascending Order"
            >
                <SelectInputField
                    additionalClasses=""
                    fieldName="sortAscending"
                    handleInputChange={handleInputChange}
                    selectOptions={["true", "false"]}
                />
            </FilterParamInputSection>
            <FilterParamInputSection
                additionalClasses={filterParamsVisibility["sort"] ? "flex" : "hidden"}
                labelText="Select Field"
            >
                <SelectInputField
                    additionalClasses=""
                    fieldName="sortField"
                    handleInputChange={handleInputChange}
                    selectOptions={fields}
                />
            </FilterParamInputSection>
        </FilterParamSection>
    );
}

FilterSortInputParam.propTypes = {
    toggleDisplay: PropTypes.func,
    handleInputChange: PropTypes.func,
    filterParamsVisibility: PropTypes.object,
};

function FilterMenu({ displayState="hidden", handleFilterClick, changeDisplayState }){
    

    //each filter param is enabled or disabled based on the whether
    //they are checked in the checkbox or not
    const filterParams = {
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


    const [filterParamsVisibility, setFilterParamsVisibility] = useImmer({
                                                                            value: false,
                                                                            currency: false,
                                                                            transactionType: false,
                                                                            transactionCategory: false,
                                                                            fromType: false,
                                                                            fromEntity: false,
                                                                            toType: false,
                                                                            toEntity: false,
                                                                            recurringEntity: false,
                                                                            createdDate: false,
                                                                            modifiedDate: false,
                                                                            transactionDate: false,
                                                                            sort: false,
                                                                        });

    const toggleDisplay = (fieldName) => {
        setFilterParamsVisibility(draft => {
            draft[fieldName] = !draft[fieldName];
        });
    }

    const handleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);
    };

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
            onClick={(event) => handleFilterClick(event, filterParams)}
        >
            <button
                className="sticky top-0 left-[90%] h-8 w-16 rounded-lg border bg-surface-cl drop-shadow-lg"
                onClick={() => changeDisplayState("hidden")}
            >
                Close
            </button>
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Value"
                fieldName="value"
                toggleDisplay={toggleDisplay}
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
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={currencies}
            />
            <FilterSelectInputParam
                headingText="Transaction Type"
                fieldName="transactionType"
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["In", "Out"]}
            />
            <FilterSelectInputParam
                headingText="Transaction Category"
                fieldName="transactionCategory"
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={transactionCategories}
            />
            <FilterSelectInputParam
                headingText="From Type"
                fieldName="fromType"
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["Internal", "External"]}
            />
            <FilterSelectInputParam
                headingText="From Entity"
                fieldName="fromEntity"
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={transactionEntityNames}
            />
            <FilterSelectInputParam
                headingText="To Type"
                fieldName="toType"
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["Internal", "External"]}
            />
            <FilterSelectInputParam
                headingText="To Entity"
                fieldName="toEntity"
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={transactionEntityNames}
            />
            <FilterSelectInputParam
                headingText="Recurring Entity"
                fieldName="recurringEntity"
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={recurringEntities}
            />
            <FilterRangeInputParam
                labelText={{"rangeStart": "Min", "rangeEnd": "Max"}}
                headingText="Created Date"
                fieldName="createdDate"
                toggleDisplay={toggleDisplay}
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
                toggleDisplay={toggleDisplay}
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
                toggleDisplay={toggleDisplay}
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
                toggleDisplay={toggleDisplay}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
            />
        </div>
    );
}

FilterMenu.propTypes = {
    displayState: PropTypes.string,
    handleFilterClick: PropTypes.func,
    changeDisplayState: PropTypes.func,
};

export default FilterMenu;