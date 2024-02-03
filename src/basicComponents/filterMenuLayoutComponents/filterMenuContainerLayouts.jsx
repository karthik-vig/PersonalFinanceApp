import React, { useEffect, useRef } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { setFilterFinancialEntity, resetFilterFinancialEntity } from '../../stateManagement/mainPageStates/selectFilterFinancialEntity.js';

function FilterParamHeadingSection({ additionalClasses, fieldName, headingText, checkedStatus, handleInputChange}){
    return (
        <section
            className={"flex flex-row flex-wrap justify-start items-center w-[40%] " + additionalClasses}
        >
            <CheckboxInputField
                additionalClasses=""
                fieldName={fieldName}
                checkedStatus={checkedStatus}
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
    checkedStatus: PropTypes.bool,
    handleInputChange: PropTypes.func,
};

function FilterParamInputSection({ additionalClasses, labelText, children}){
    return (
        <section
            className={"flex flex-col flex-nowrap h-[100%] w-[25%] mx-2 " + additionalClasses}
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

function FilterParamSection({additionalClasses, headingText, toggleDisplay, checkedStatus, children}){

    return (
        <div
            className={"flex flex-row flex-nowrap justify-start " + additionalClasses}
        >
            <FilterParamHeadingSection
                additionalClasses=""
                fieldName={headingText}
                headingText={headingText}
                checkedStatus={checkedStatus}
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
    checkedStatus: PropTypes.bool,
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
            checkedStatus={filterParamsVisibility[fieldName]}
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
                labelText={labelText["rangeEnd"]}
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
            checkedStatus={filterParamsVisibility[fieldName]}
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


function FilterSelectFinancialEntityInputParam({ headingText, fieldName, toggleDisplay, handleInputChange, filterParamsVisibility}){

    const transactionEntities = useSelector(state => state.mainPageStates.additionalInformationState.transactionEntities);
    const selectFilterFinancialEntityState = useSelector(state => state.mainPageStates.selectFilterFinancialEntityState);
    const dispatch = useDispatch();

    let entitySelectFieldOptions = useRef([]);

    useEffect(() => {
        if (selectFilterFinancialEntityState.type && selectFilterFinancialEntityState.type !== "choose" && selectFilterFinancialEntityState.fieldname === fieldName){
            entitySelectFieldOptions.current = transactionEntities.filter((entity) => entity.type === selectFilterFinancialEntityState.type).map((entity) => entity.name)
            dispatch(resetFilterFinancialEntity());
        } 
    }, [
        dispatch, 
        entitySelectFieldOptions, 
        fieldName, 
        selectFilterFinancialEntityState, 
        transactionEntities
    ]);  

    return (
        <FilterParamSection
            additionalClasses=""
            headingText={headingText}
            checkedStatus={filterParamsVisibility[fieldName]}
            toggleDisplay={() => toggleDisplay(fieldName)}
        >
            <FilterParamInputSection
                additionalClasses={filterParamsVisibility[fieldName] ? "flex" : "hidden"}
                labelText="Select Entity Type"
            >
                <SelectInputField
                    additionalClasses=""
                    fieldName={fieldName}
                    handleInputChange={(fieldName, targetValue) => dispatch(setFilterFinancialEntity({fieldname: fieldName, type: targetValue}))}
                    selectOptions={["Internal", "External"]}
                />
            </FilterParamInputSection>
            <FilterParamInputSection
                additionalClasses={filterParamsVisibility[fieldName] ? "flex" : "hidden"}
                labelText="Select Entity"
            >
                <SelectInputField
                    additionalClasses=""
                    fieldName={fieldName}
                    handleInputChange={handleInputChange}
                    selectOptions={entitySelectFieldOptions.current}
                />
            </FilterParamInputSection>
        </FilterParamSection>
    );

}

FilterSelectFinancialEntityInputParam.propTypes = {
    headingText: PropTypes.string,
    fieldName: PropTypes.string,
    toggleDisplay: PropTypes.func,
    handleInputChange: PropTypes.func,
    filterParamsVisibility: PropTypes.object,
};

function FilterSortInputParam({ toggleDisplay, handleInputChange, filterParamsVisibility, fields}){
    
    return (
        <FilterParamSection
            additionalClasses=""
            headingText="Sort"
            checkedStatus={filterParamsVisibility["sort"]}
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
    fields: PropTypes.array,
};

export {
        FilterRangeInputParam,
        FilterSelectInputParam,
        FilterSortInputParam,
        FilterSelectFinancialEntityInputParam,
        FilterParamSection,
        FilterParamInputSection,
        SelectInputField,
    };