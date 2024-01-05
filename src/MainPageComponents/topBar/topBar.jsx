import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../../index.css';
import { useImmer } from 'use-immer';
import FilterMenu from './FilterMenuComponents';

function TopBarButton({ svgIcon, btnName, onClickHandler }) {

    const [filterDisplayState, setFilterDisplayState] = useImmer("hidden"); //hidden or visible

    return (
        <>
        <button 
            className="flex flex-nowrap flex-row my-3 mx-3 p-0.5 w-24 h-7 rounded-lg outline-1 hover:outline hover:outline-gray-800 hover:outline-offset-2 hover:bg-secondary-cl" 
            onClick={()=>{ if (filterDisplayState === "hidden" )setFilterDisplayState("block");
                            else setFilterDisplayState("hidden");}}
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
        <FilterMenu 
            displayState={filterDisplayState}
            handleFilterClick={onClickHandler}
            changeDisplayState={setFilterDisplayState}
        />
        </>
    );
}

TopBarButton.propTypes = {
    svgIcon: PropTypes.object,
    btnName: PropTypes.string,
    onClickHandler: PropTypes.func,
};

function TopBar({ svgIcons, handleSearch }) {

    const searchParams = {
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
    };

    const handleFilterClick = (event, filterParams) => { //set filter in searchParams 
        searchParams.filter = filterParams;
    };

    return (
        <div className="flex flex-row flex-nowrap relative z-10 justify-center h-14 mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg " style={{ width: 'calc(100% - 56px)' }}>
            <TopBarButton 
                svgIcon={svgIcons.faPlus} 
                btnName="Create" 
                onClickHandler={ (event, btnName) => {return btnName;} }
            />
            <TopBarButton 
                svgIcon={svgIcons.faEdit} 
                btnName="Modify" 
                onClickHandler={ (event, btnName) => {return btnName;} }
            />
            <TopBarButton 
                svgIcon={svgIcons.faTrashCan} 
                btnName="Delete" 
                onClickHandler={ (event, btnName) => {return btnName;} }
            />
            <input 
                type="text" 
                placeholder="Search" 
                className="h-10 w-[50%] mx-4 mt-2 mb-2 rounded-lg border bg-background-cl" 
                onKeyDown={ (event) => handleSearch(event, searchParams) }
            />
            <TopBarButton 
                svgIcon={svgIcons.faFilter} 
                btnName="Filter" 
                onClickHandler={ handleFilterClick }
            />
            <TopBarButton 
                svgIcon={svgIcons.faRefresh} 
                btnName="Refresh" 
                onClickHandler={ (event, btnName) => {return btnName;} }
            />
        </div>
    );
}

TopBar.propTypes = {
    svgIcons: PropTypes.object,
    handleSearch: PropTypes.func,
};

export default TopBar;