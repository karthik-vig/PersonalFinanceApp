import PropTypes from 'prop-types';
import '../../index.css';
import {
        DateInputField,
        //DateInputField,
    } from '../../basicComponents/filterMenuLayoutComponents/basicFilterInputComponents.jsx';
import {FilterRangeInputParam,
        FilterSelectInputParam,
        //FilterSortInputParam,
    } from '../../basicComponents/filterMenuLayoutComponents/filterMenuContainerLayouts.jsx';
//import { useImmer } from 'use-immer';
import { useSelector, useDispatch } from 'react-redux';
import {  //showFilter,
          hideFilter,
 } from '../../stateManagement/financialEntityPageStates/filterDisplay.js';
import { toggleFilterParamsVisibility } from '../../stateManagement/financialEntityPageStates/filterParamsVisibility.js';
import { setFilterParams } from '../../stateManagement/financialEntityPageStates/searchParams.js';
import {FilterParamSection,
        FilterParamInputSection,
    } from '../../basicComponents/filterMenuLayoutComponents/filterMenuContainerLayouts.jsx';
import { SelectInputField } from '../../basicComponents/filterMenuLayoutComponents/basicFilterInputComponents.jsx';


function FilterSortInputParam({ toggleDisplay, handleInputChange, filterParamsVisibility}){
    
    const fields = ["type",
                    "createdDate",
                    "modifiedDate", 
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

function FilterMenu(){
    

    const filterParamsVisibility = useSelector((state) => state.financialEntityPageStates.filterParamsVisibility);
    const displayState = useSelector((state) => state.financialEntityPageStates.filterDisplayState);
    const dispatch = useDispatch();

    const handleInputChange = (fieldName, fieldValue) => dispatch(setFilterParams({fieldName, fieldValue}));
    const toggleFieldVisibility = (fieldName) => dispatch(toggleFilterParamsVisibility(fieldName));

    return (
        <div 
            className={" h-96 w-[50%] z-50 top-[65px] left-[30%] absolute rounded-lg border bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll " + displayState}
        >
            <button
                className="sticky top-0 left-[90%] h-8 w-16 rounded-lg border bg-red-500 border-red-700 hover:bg-red-800 drop-shadow-lg"
                onClick={() => dispatch(hideFilter())}
            >
                Close
            </button>
            <FilterSelectInputParam
                headingText="Entity Type"
                fieldName="type"
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
                selectOptions={["Internal", "External"]}
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
            <FilterSortInputParam
                toggleDisplay={toggleFieldVisibility}
                handleInputChange={handleInputChange}
                filterParamsVisibility={filterParamsVisibility}
            />
        </div>
    );
}


export default FilterMenu;