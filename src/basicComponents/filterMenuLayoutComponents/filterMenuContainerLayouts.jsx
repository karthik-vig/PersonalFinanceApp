import React from 'react';
import PropTypes from 'prop-types';
import '../../index.css';
import {
        H6Heading,
        LabelText,
        CheckboxInputField,
        //NumberInputField,
        SelectInputField,
        //DateInputField,
        } from './basicFilterInputComponents.jsx';

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

export {
        FilterRangeInputParam,
        FilterSelectInputParam,
        FilterSortInputParam,
    };