import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './index.css';
import { useImmer } from 'use-immer';
//import SideSectionButton from './sideSectionButton';
//import GenericIconButton from './genericIconBtn';

function SideBar({ items, handleItemClick}) {


    return ( 
    <div className="flex flex-nowrap flex-col w-[25%] mx-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll" style={{ height: 'calc(100% - 150px)' }}>
                <ul>
                    {items.map((item) => {
                        let fontColor = "text-green-500";
                        if (item.transactionType === "out") fontColor = "text-red-500"; 
                        return (<li key={item.id}>
                            <button  className="flex flex-row flex-wrap w-[100%] h-20 border-t-2 p-4" onClick={() => handleItemClick(item.id)}>
                                <FontAwesomeIcon className="m-2 w-10 h-10 border rounded-full outline outline-cyan-950" icon={item.icon} />
                                <section className="flex flex-row flex-wrap h-[100%] ml-4" style={{ width: 'calc(100% - 76px)' }}>
                                    <h6 className={"w-[100%] h-[60%] text-start font-bold font-serif antialiased tracking-widest truncate text-lg " + fontColor}>{item.title + " (" + item.transactionType + ")"}</h6>
                                    <p className="w-[100%] h-[40%] text-start text-black/50 font-medium antialiased truncate text-sm ">{"Transaction Date: " + item.transactionDate + " . " + "Value: " + item.value}</p>
                                </section>
                            </button>
                        </li>);
                    })}
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
        <button className="flex flex-nowrap flex-row my-3 mx-3 p-0.5 w-24 h-7 rounded-lg outline-1 hover:outline hover:outline-gray-800 hover:outline-offset-2 hover:bg-secondary-cl" onClick={()=>onClickHandler(btnName)}>
            <FontAwesomeIcon className="m-[5%] p-[0%] w-[30%] h-[80%] " icon={svgIcon} />
            <p className="w-auto h-[80%] text-start font-medium antialiased truncate">{btnName}</p>
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
        <div className="flex flex-row flex-nowrap justify-center h-14 mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg " style={{ width: 'calc(100% - 56px)' }}>
            <TopBarButton svgIcon={svgIcons.faPlus} btnName="Create" onClickHandler={ (btnName) => {return btnName;} }/>
            <TopBarButton svgIcon={svgIcons.faEdit} btnName="Modify" onClickHandler={ (btnName) => {return btnName;} }/>
            <TopBarButton svgIcon={svgIcons.faTrashCan} btnName="Delete" onClickHandler={ (btnName) => {return btnName;} }/>
            <input type="text" placeholder="Search" className="h-10 w-[50%] mx-4 mt-2 mb-2 rounded-lg border bg-background-cl" onKeyDown={ (event) => handleSearch(event, searchParams) }/>
            <TopBarButton svgIcon={svgIcons.faFilter} btnName="Filter" onClickHandler={ handleFilterClick }/>
            <TopBarButton svgIcon={svgIcons.faSort} btnName="Sort" onClickHandler={ handleSortClick }/>
            <TopBarButton svgIcon={svgIcons.faRefresh} btnName="Refresh" onClickHandler={ (btnName) => {return btnName;} }/>
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
        //communicate with backend to get items
        return [{id: 1, title: "someName", transactionDate: "2023.08.11", value: 2000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 2, title: "someName2", transactionDate: "2023.08.09", value: 100, transactionType:"in", icon: svgIcons.faFilter},
        {id: 3, title: "someName3", transactionDate: "2023.08.03", value: 3500, transactionType:"in", icon: svgIcons.faFilter},
        {id: 4, title: "someName4", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 5, title: "someName5", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 6, title: "someName6", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 7, title: "someName7", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 8, title: "someName8", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 9, title: "someName9", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 10, title: "someName10", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 11, title: "someName11", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 12, title: "someName12", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 13, title: "someName13", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 14, title: "someName14", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 15, title: "someName15", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 16, title: "someName16", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 17, title: "someName17", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 18, title: "someName18", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        {id: 19, title: "someName19", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
        {id: 20, title: "someName20", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
        ];
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
