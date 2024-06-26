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
// import { faFilter, faSort, faPlus, faTrashCan, faEdit, faRefresh } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core';
import { triggerSearch } from '../../stateManagement/mainPageStates/triggerSearch.js';
// library.add(faFilter, faSort, faPlus, faTrashCan, faEdit, faRefresh);

function TopBarButton({ svgIcon, iconColor, btnName, onClickHandler }) {

    return (
        <>
        <button 
            className="flex flex-nowrap flex-row m-3 p-0.5 w-32 h-7 rounded-lg outline-1 hover:outline hover:outline-gray-800 hover:outline-offset-2 hover:bg-secondary-cl" 
            onClick={()=> onClickHandler()}
        >
            <FontAwesomeIcon 
                className="mx-[5%] my-0 p-[0%] w-[30%] h-[100%] " 
                icon={svgIcon} 
                color={iconColor}
            />
            <p 
                className="w-auto h-[100%] text-start font-medium antialiased truncate"
            >
                {btnName}
            </p>
        </button>
        </>
    );
}

TopBarButton.propTypes = {
    svgIcon: PropTypes.object,
    iconColor: PropTypes.string,
    btnName: PropTypes.string,
    onClickHandler: PropTypes.func,
};

function TopBar() {

    const filterDisplayState = useSelector((state) => state.mainPageStates.filterDisplayState);
    const dispatch = useDispatch();


    return (
        <div 
            className="flex flex-row flex-nowrap w-[100%] relative z-10 justify-center h-14 rounded-lg border bg-surface-cl drop-shadow-lg"
            //id="mainPageTopbar"
        >
            <TopBarButton 
                svgIcon="fa-plus"
                iconColor="#00ff00"
                btnName="Create" 
                onClickHandler={() => dispatch(triggerAddEntry()) }
            />
            <TopBarButton 
                svgIcon="fa-edit" 
                iconColor="#eab308"
                btnName="Modify" 
                onClickHandler={ () => dispatch(setWarningBoxDisplayModifyState("block")) }
            />
            <TopBarButton 
                svgIcon="fa-trash-can"
                iconColor="#ff0000" 
                btnName="Delete" 
                onClickHandler={ () => dispatch(setWarningBoxDisplayDeleteState("block")) }
            />
            <input 
                type="text" 
                placeholder="Search" 
                className="h-10 w-[50%] mx-4 my-2 py-1 px-2 rounded-lg border bg-background-cl" 
                onChange={(event) => dispatch(setSearchField(event.target.value))}
                onKeyDown={ (event) => { if (event.code === "Enter") { dispatch(triggerSearch()); } } }
            />
            <TopBarButton 
                svgIcon="fa-filter" 
                iconColor="#0000ff"
                btnName="Filter" 
                onClickHandler={ filterDisplayState === "hidden" ? () => dispatch(showFilter()) : () => dispatch(hideFilter()) }
            />
            <TopBarButton 
                svgIcon="fa-refresh" 
                iconColor="#00ff00"
                btnName="Refresh" 
                onClickHandler={ () => window.app.refresh("mainPage") }
            />
            <FilterMenu />
        </div>
    );
}

export default TopBar;