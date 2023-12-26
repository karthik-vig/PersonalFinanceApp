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

function DetailSection({ selectedItem, currencies, transactionCategories, transactionEntities}) {
    // only common classes are defined here, specific classes are defined in the respective sections
    // specific classes include: height, width, padding, margin, etc.
    const sectionClasses = " flex flex-row flex-wrap w-auto h-20 border-b-2 pb-4 min-w-80 ";
    const h6Classes = " text-start font-bold font-serif antialiased tracking-widest truncate text-lg text-black/50 ";
    const h3Classes = " justify-self-center text-start font-bold font-serif antialiased tracking-widest truncate text-xl text-black ";
    const inputClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back";
    const radioBtnClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black ";
    const selectBtnClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black border rounded-lg bg-background-cl";

    const [fromType, setFromType] = useImmer("Internal");
    const [toType, setToType] = useImmer("Internal");


    function handleRadioChange(radioBtn) {
        //handle radio button change
        console.log(radioBtn);
        if (radioBtn === "fromTypeExt") setFromType("External");
        if (radioBtn === "fromTypeInt") setFromType("Internal");
        if (radioBtn === "toTypeExt") setToType("External");
        if (radioBtn === "toTypeInt") setToType("Internal");
    }

    return (
        <div className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll px-[20%] py-[2%]" style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}>
            <section className={sectionClasses}>
                <h6 className={h6Classes + " w-[100%] h-[38%] mb-2 " }>Title</h6>
                <input className={inputClasses + " w-[100%] h-[60%] "} value={selectedItem.title} type="text" />
            </section>
            <section className={sectionClasses + " h-72 "}>
                <h6 className={h6Classes + " w-[100%] h-[38%] mb-2 " }>Description</h6>
                <textarea className={inputClasses + " overflow-y-scroll resize-none w-[100%] h-[60%] "} value={selectedItem.title} type="text" />
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes + " w-[100%] h-[38%] mb-2 " }>Value</h6>
                <input className={inputClasses + " w-[70%] h-[60%] mx-4 "} value={selectedItem.title} type="number" />
                <select className={selectBtnClasses + " w-[20%] h-[60%] "} value={selectedItem.currency}>
                    {currencies.map((currency) => {
                        return (<option key={currency} value={currency}>{currency}</option>);
                        })
                    }
                </select>
            </section>
            <section className={sectionClasses + " justify-center "}>
                <h3 className={h3Classes}>Configure Transaction</h3>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes + " w-[50%] " }>Transaction Type</h6>
                <section className={radioBtnClasses}>
                    <input type="radio" id="transactionTypeIn" name="transactionType" value="In" checked={selectedItem.transactionType === 'In'} />
                    <label htmlFor="transactionTypeIn">In</label>
                    <input type="radio" id="transactionTypeOut" name="transactionType" value="Out" checked={selectedItem.transactionType === 'Out'} />
                    <label htmlFor="transactionTypeOut">Out</label>
                </section>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Transaction Category</h6>
                <select className={selectBtnClasses} value={selectedItem.transactionCategory}>
                    { transactionCategories.map((category) => {
                        return (<option key={category} value={category}>{category}</option>);
                        })
                    }
                </select>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>From Type</h6>
                <section className={radioBtnClasses}>
                    <input type="radio" id="transactionFromInternal" name="fromEntity" value="Internal" checked={selectedItem.fromType === 'Internal'} onClick={() => handleRadioChange("fromTypeInt")}/>
                    <label htmlFor="transactionFromInternal">Internal</label>
                    <input type="radio" id="transactionFromExternal" name="fromEntity" value="External" checked={selectedItem.fromType === 'External'} onClick={() => handleRadioChange("fromTypeExt")}/>
                    <label htmlFor="transactionFromExternal">External</label>
                </section>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>From Entity</h6>
                <select className={selectBtnClasses} value={selectedItem.fromEntity}>
                    { transactionEntities.map((entity) => {
                        if (entity.type === fromType)
                        return (<option key={entity.name} value={entity.name}>{entity.name}</option>);
                        })
                    }
                </select>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>To Type</h6>
                <section className={radioBtnClasses}>
                    <input type="radio" id="transactionToInternal" name="toEntity" value="Internal" checked={selectedItem.toType === 'Internal'} onClick={() => handleRadioChange("toTypeInt")}/>
                    <label htmlFor="transactionToInternal">Internal</label>
                    <input type="radio" id="transactionToExternal" name="toEntity" value="External" checked={selectedItem.toType === 'External'} onClick={() => handleRadioChange("toTypeExt")}/>
                    <label htmlFor="transactionToExternal">External</label>
                </section>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>To Entity</h6>
                <select className={selectBtnClasses} value={selectedItem.toEntity}>
                    { transactionEntities.map((entity) => {
                        if (entity.type === toType)
                        return (<option key={entity.name} value={entity.name}>{entity.name}</option>);
                        })
                    }
                </select>
            </section>
            {selectedItem.recurringEntity && 
                <section className={sectionClasses}>
                    <h6>Recurring</h6>
                    <p>{selectedItem.recurringEntity}</p>
                </section>
            }
            <section className={sectionClasses + " justify-center "}>
                <h3 className={h3Classes}>Files</h3>
            </section>
            <section className={sectionClasses}>
                <input type="file" multiple />
            </section>
            <section className={sectionClasses + " justify-center "}>
                <h3 className={h3Classes}>Meta Data</h3>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Entry Created On</h6>
                <input className={inputClasses} value={selectedItem.createdDate} type="datetime-local" readOnly/>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Last Modified On</h6>
                <input className={inputClasses} value={selectedItem.createdDate} type="datetime-local" readOnly/>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Set Transaction Date</h6>
                <input className={inputClasses} value={selectedItem.createdDate} type="datetime-local"/>
            </section>
        </div>
    );
}

DetailSection.propTypes = {
    selectedItem: PropTypes.object,
    currencies: PropTypes.array,
    transactionCategories: PropTypes.array,
    transactionEntities: PropTypes.array,
    recurringEntities: PropTypes.array,
};

function MainPage({svgIcons}) {
    //this is only the data structure for the selected item; backend needs to maintain other information related to
    //the selected item, such as the fromRef, toRef, etc.
    //we also need to send additional stuff for the select list from the backed, such as
    //currencies, transaction categories, transaction types, etc.
    const [selectedItem, setSelectedItem] = useImmer({
                                                     id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
                                                     title: null,
                                                     description: null,
                                                     value: 0.0,
                                                     currency: null,
                                                     transactionType: null,
                                                     transactionCategory: null,
                                                     fromEntity: null, //computed by backend
                                                     fromType: null,
                                                     toEntity: null, //computed by backend
                                                     toType: null,
                                                     recurringEntity: null,
                                                     file: false,
                                                     createdDate: "YYYY-MM-DDThh:mm:ss",
                                                     modifiedDate: "YYYY-MM-DDThh:mm:ss",
                                                     transactionDate: "YYYY-MM-DDThh:mm:ss",
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

    // need to get these from the backend
    const currencies = ["RON", "EUR", "USD"];
    const transactionCategories = ["Salary", "Food", "Clothes", "Rent", "Utilities", "Other"];
    const transactionEntities = [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}];

    return (
        <div className="flex flex-row flex-wrap h-[100%] w-[100%] bg-background-cl">
            <TopBar svgIcons={svgIcons} handleSearch={handleSearch} />
            <SideBar items={getItems()} handleItemClick={handleItemClick} />
            <DetailSection selectedItem={selectedItem} currencies={currencies} transactionCategories={transactionCategories} transactionEntities={transactionEntities}/>
        </div>
    );
}

MainPage.propTypes = {
    svgIcons: PropTypes.object,
};

export default MainPage;
