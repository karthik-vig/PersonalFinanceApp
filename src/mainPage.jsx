import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './index.css';
import { useImmer } from 'use-immer';
//import SideSectionButton from './sideSectionButton';
//import GenericIconButton from './genericIconBtn';

function SideBar({ items, handleItemClick}) {
    return ( 
    <div className="w-[25%] mx-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg" style={{ height: 'calc(100% - 150px)' }}>
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="flex flex-row flex-wrap" onClick={() => handleItemClick(item)}>
                            <p>{item.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

SideBar.propTypes = {
    items: PropTypes.array,
    handleItemClick: PropTypes.func,
};


function TopBarButton({ svgIcon, btnName, onClickHandler }) {
    return (
        <button className="my-3 mx-3 p-0.5 w-7 h-7 rounded-lg hover:bg-hover-cl outline outline-1 outline-gray-400 outline-offset-2 bg-secondary-cl hover:bg-hover-cl" onClick={()=>onClickHandler(btnName)}>
            <FontAwesomeIcon className="m-[0%] p-[0%] w-[100%] h-[100%]" icon={svgIcon} />
        </button>
    );
}

TopBarButton.propTypes = {
    svgIcon: PropTypes.object,
    btnName: PropTypes.string,
    onClickHandler: PropTypes.func,
};

function TopBar({ svgIcons, handleSearch }) {

    const searchParams = {
        search: "",
        filter: {},
        sort: "",
    };

    const handleFilterClick = (filterParams) => { //set filter in searchParams 
        searchParams.filter = filterParams;
    };

    const handleSortClick = (sortParams) => { //set sort in searchParams
        searchParams.sort = sortParams;
    };

    return (
        <div className="flex flex-row flex-wrap justify-center h-14 mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg " style={{ width: 'calc(100% - 56px)' }}>
           <input type="text" placeholder="Search" className="h-10 w-[50%] mx-4 mt-2 mb-2 rounded-lg border bg-surface-cl" onKeyDown={ (event) => handleSearch(event, searchParams) }/>
           <TopBarButton svgIcon={svgIcons.faFilter} btnName="filter" onClickHandler={ handleFilterClick }/>
           <TopBarButton svgIcon={svgIcons.faSort} btnName="sort" onClickHandler={ handleSortClick }/>
        </div>
    );
}

TopBar.propTypes = {
    svgIcons: PropTypes.object,
    handleSearch: PropTypes.func,
};

function DetailSection({ selectedItem }) {

    return (
        <div className="ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg " style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}>
            <p>{selectedItem.description}</p>
        </div>
    );
}

DetailSection.propTypes = {
    selectedItem: PropTypes.object,
};

function MainPage({svgIcons}) {

   const [selectedItem, setSelectedItem] = useImmer({
                                                     id: "",
                                                     title: "",
                                                     description: "",
                                                     value: 0.0,
                                                     currency: "GBP",
                                                     transactionType: "",
                                                     fromRef: "",
                                                     fromType: "",
                                                     toRef: "",
                                                     toType: "",
                                                     recurringRef: "",
                                                     file: false,
                                                    });

    const getItems = () => { 
        return [{title: "someName",}, {title: "someName2",}, {title: "someName3",}];
    };

    const handleItemClick = (item) => { 
        setSelectedItem( (draft) => {
                                        Object.keys(draft).forEach(key => {
                                            draft[key] = item[key];
                                        });
                                    });
    };

    const handleSearch = (event, searchParams) => {
        //communicate with backend to get filtered and sorted items 
        console.log(searchParams);
        if(event.keyCode === 13) { //enter key
            console.log("searching for: " + searchParams.search);
        }
    };

    return (
        <div className="flex flex-row flex-wrap h-[100%] w-[100%] bg-background-cl">
            <TopBar svgIcons={svgIcons} handleSearch={handleSearch} />
            <SideBar items={getItems()} handleItemClick={handleItemClick} />
            <DetailSection selectedItem={selectedItem} />
        </div>
    );
}

MainPage.propTypes = {
    svgIcons: PropTypes.object,
};

export default MainPage;
