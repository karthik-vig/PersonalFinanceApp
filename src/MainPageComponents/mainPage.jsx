//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../index.css';
import { useImmer } from 'use-immer';
import SideBar from './sideBar/sideBar.jsx';
import TopBar from './topBar/topBar.jsx';
import DetailSection from './detailSection/detailSection.jsx';
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
                                                     file: { 
                                                            file1: {
                                                                    fileBlob: new Blob([""], {type: "text/plain"}),
                                                                    mimetype: "text/plain",
                                                                    },
                                                            file2: {
                                                                    fileBlob: new Blob([""], {type: "text/plain"}),
                                                                    mimetype: "text/plain",
                                                                    },
                                                            file3: {
                                                                    fileBlob: new Blob([""], {type: "text/plain"}),
                                                                    mimetype: "text/plain",
                                                                    },
                                                    },
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

    const handleSelectItemClick = (uuid) => {
        setSelectedItem( (draft) => {
            //get the item from the backend using UUID
            const item = {
                            id: uuid, //uuidv4 template
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
                            file: { 
                                    file1: {
                                             fileBlob: new Blob([""], {type: "text/plain"}),
                                             mimetype: "text/plain",
                                            },
                                    file2: {
                                            fileBlob: new Blob([""], {type: "text/plain"}),
                                            mimetype: "text/plain",
                                            },
                                    file3: {
                                            fileBlob: new Blob([""], {type: "text/plain"}),
                                            mimetype: "text/plain",
                                            },
                                },
                            createdDate: "yyyy-MM-ddThh:mm:ss",
                            modifiedDate: "yyyy-MM-ddThh:mm:ss",
                            transactionDate: "yyyy-MM-ddThh:mm:ss",
                        }
            //for each field in the draft, set the value in the Item
            for (const [key, value] of Object.entries(item)) {
                draft[key] = value;
            }
         } );
    }

    const handleSearch = (keyCode, searchParams, filterParamsVisibility) => {
        //communicate with backend to get filtered and sorted items 
        const makeFilterObjectCopy = (filterObj, filterParamsVisibility) => {
            const copy = {};
            Object.entries(filterObj).forEach(([fieldName, fieldValue]) => {
                if (!filterParamsVisibility[fieldName]) {
                    if (typeof(fieldValue) === "object") {
                        copy[fieldName] = { min: null, max: null };
                    }
                    else {
                    copy[fieldName] = null;
                    }
                }
                else {
                    if (typeof(fieldValue) === "object") {
                        copy[fieldName] = { min: filterObj[fieldName].min, 
                                            max:  filterObj[fieldName].max
                                        };
                    }
                    else {
                    copy[fieldName] = filterObj[fieldName];
                    }
                }
            });
            return copy;
        };

        if(keyCode === "Enter") { //enter key
            console.log("searching for: ");
            const localSearchParams = {};
            localSearchParams.search = searchParams.search;
            localSearchParams.filter = makeFilterObjectCopy(searchParams.filter, filterParamsVisibility);
            console.log(localSearchParams);
        }
    };


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
                handleItemClick={handleSelectItemClick} 
            />
            <DetailSection 
                selectedItem={selectedItem}
                handleValueChange={handleItemClick}
            />
        </div>
    );
}

MainPage.propTypes = {
    svgIcons: PropTypes.object,
};

export default MainPage;
