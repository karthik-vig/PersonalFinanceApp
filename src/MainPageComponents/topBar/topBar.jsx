import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../../index.css';
//import { useImmer } from 'use-immer';
//import { useEffect } from 'react';
import FilterMenu from './FilterMenuComponents';
import {  showFilter,
    hideFilter,
} from '../../stateManagement/mainPageStates/filterDisplay.js';
import { setSearchField, 
        //setFilterParams,
  } from '../../stateManagement/mainPageStates/searchParams.js';
import { triggerAddEntry } from '../../stateManagement/mainPageStates/triggerAddEntry.js';
import { setWarningBoxDisplayModifyState,
         setWarningBoxDisplayDeleteState,
    } from '../../stateManagement/mainPageStates/warningBoxDisplay.js';
import { useSelector, useDispatch } from 'react-redux';
//import { setWarningBoxDisplayModifyState } from '../../stateManagement/mainPageStates/warningBoxDisplay.js';

function TopBarButton({ svgIcon, btnName, onClickHandler }) {

    return (
        <>
        <button 
            className="flex flex-nowrap flex-row my-3 mx-3 p-0.5 w-24 h-7 rounded-lg outline-1 hover:outline hover:outline-gray-800 hover:outline-offset-2 hover:bg-secondary-cl" 
            onClick={()=> onClickHandler()}
        >
            <FontAwesomeIcon 
                className="m-[5%] p-[0%] w-[30%] h-[80%] " 
                icon={svgIcon} 
            />
            <p 
                className="w-auto h-[80%] text-start font-medium antialiased truncate"
            >
                {btnName}
            </p>
        </button>
        </>
    );
}

TopBarButton.propTypes = {
    svgIcon: PropTypes.object,
    btnName: PropTypes.string,
    onClickHandler: PropTypes.func,
};

function TopBar({ svgIcons, 
                  //handleSearch, 
                  //handleRefreshBtnClick, 
                  //handleAddBtnClick,
                  //handleModifyBtnClick,
                  //handleDeleteBtnClick,
                 }) {

    /*                
    const [searchParams, setSearchParams] = useImmer({
                                                        search: "", //string input
                                                        filter: {
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
                                                            sort: { ascending: true, //can be true or false
                                                                    field: null, //some valid field name
                                                                },
                                                        },   
                                                    }); //set filter in searchParams
    */
    /*          
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
                                                                        */

    /*
    const handleFilterClick = (filterParams) => { //set filter in searchParams 
        setSearchParams(draft => {
            draft.filter = filterParams;
        });
    };
    */

    //const [filterDisplayState, setFilterDisplayState] = useImmer("hidden"); //hidden or visible

    const filterDisplayState = useSelector((state) => state.filterDisplayState);
    //const searchParams = useSelector((state) => state.searchParams);
    //const filterParamsVisibility = useSelector((state) => state.filterParamsVisibility);
    const dispatch = useDispatch();


    return (
        <div 
            className="flex flex-row flex-nowrap relative z-10 justify-center h-14 mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg " style={{ width: 'calc(100% - 56px)' }}
        >
            <TopBarButton 
                svgIcon={svgIcons.faPlus} 
                btnName="Create" 
                onClickHandler={() => dispatch(triggerAddEntry()) }
            />
            <TopBarButton 
                svgIcon={svgIcons.faEdit} 
                btnName="Modify" 
                onClickHandler={ () => dispatch(setWarningBoxDisplayModifyState()) }
            />
            <TopBarButton 
                svgIcon={svgIcons.faTrashCan} 
                btnName="Delete" 
                onClickHandler={ () => dispatch(setWarningBoxDisplayDeleteState()) }
            />
            <input 
                type="text" 
                placeholder="Search" 
                className="h-10 w-[50%] mx-4 mt-2 mb-2 rounded-lg border bg-background-cl" 
                onChange={(event) => dispatch(setSearchField(event.target.value))}
                onKeyDown={ (event) => { if (event.code === "Enter") { dispatch(); } } }
            />
            <TopBarButton 
                svgIcon={svgIcons.faFilter} 
                btnName="Filter" 
                onClickHandler={ filterDisplayState === "hidden" ? () => dispatch(showFilter()) : () => dispatch(hideFilter()) }
            />
            <TopBarButton 
                svgIcon={svgIcons.faRefresh} 
                btnName="Refresh" 
                onClickHandler={ () => console.log("Refresh button clicked") }
            />
            <FilterMenu 
                //displayState={filterDisplayState}
                //setSearchParams={setSearchParams}
                //filterParamsVisibility={filterParamsVisibility}
                //setFilterParamsVisibility={setFilterParamsVisibility}
                //changeDisplayState={setFilterDisplayState}
            />
        </div>
    );
}

TopBar.propTypes = {
    svgIcons: PropTypes.object,
    //handleSearch: PropTypes.func,
    //handleRefreshBtnClick: PropTypes.func,
    //handleAddBtnClick: PropTypes.func,
    //handleModifyBtnClick: PropTypes.func,
    //handleDeleteBtnClick: PropTypes.func,
};

export default TopBar;