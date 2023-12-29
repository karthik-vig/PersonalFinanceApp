//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../index.css';
import { useImmer } from 'use-immer';
import SideBar from './sideBar';
import TopBar from './topBar';
import DetailSection from './detailSection/detailSection';
//import SideSectionButton from './sideSectionButton';
//import GenericIconButton from './genericIconBtn';


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

    const handleItemClick = (field, value) => {
        //console.log("field: " + field + " value: " + value)
        setSelectedItem( (draft) => { draft[field] = value; } );
        //console.log(selectedItem);
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
        <div 
            className="flex flex-row flex-wrap h-[100%] w-[100%] bg-background-cl"
        >
            <TopBar 
                svgIcons={svgIcons} 
                handleSearch={handleSearch} 
            />
            <SideBar 
                items={getItems()} 
                handleItemClick={handleItemClick} 
            />
            <DetailSection 
                selectedItem={selectedItem} 
                currencies={currencies} 
                transactionCategories={transactionCategories} 
                transactionEntities={transactionEntities} 
                handleValueChange={handleItemClick}
            />
        </div>
    );
}

MainPage.propTypes = {
    svgIcons: PropTypes.object,
};

export default MainPage;
