//import PropTypes from 'prop-types';
import '../../index.css';
import {
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
 } from '../../stateManagement/financialEntityPageStates/filterDisplay.js';
import { toggleFilterParamsVisibility, resetFilterParamsVisibility } from '../../stateManagement/financialEntityPageStates/filterParamsVisibility.js';
import { setFilterParams } from '../../stateManagement/financialEntityPageStates/searchParams.js';
/*
import {FilterParamSection,
        FilterParamInputSection,
    } from '../../basicComponents/filterMenuLayoutComponents/filterMenuContainerLayouts.jsx';
*/
//import { SelectInputField } from '../../basicComponents/filterMenuLayoutComponents/basicFilterInputComponents.jsx';
// import { faTimes, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// library.add(faTimes, faEraser);

/*
function FilterSortInputParam({ toggleDisplay, handleInputChange, filterParamsVisibility}){
    
    const fields = ["title",
                    "description",
                    "createdDate",
                    "modifiedDate", 
                    ]
    
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
};
*/

function FilterMenu(){
    

    const filterParamsVisibility = useSelector((state) => state.financialEntityPageStates.filterParamsVisibility);
    const displayState = useSelector((state) => state.financialEntityPageStates.filterDisplayState);
    const dispatch = useDispatch();

    const handleInputChange = (fieldName, fieldValue) => dispatch(setFilterParams({fieldName, fieldValue}));
    const toggleFieldVisibility = (fieldName) => dispatch(toggleFilterParamsVisibility(fieldName));

    return (
        <div 
            className={" h-auto max-h-96 sm:w-[85%] md:w-[85%] lg:w-[50%] z-50 top-[65px] sm:left-[8%] md:left-[8%] lg:left-[30%] absolute rounded-lg border bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll " + displayState}
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
                fields={["title",
                        "type",
                        "createdDate",
                        "modifiedDate", 
                        ]}
            />
        </div>
    );
}


export default FilterMenu;