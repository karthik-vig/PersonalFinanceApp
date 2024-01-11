//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../index.css';
import { useImmer } from 'use-immer';
import { useSelector,
         //useDispatch,
         } from 'react-redux';
import SideBar from './sideBar/sideBar.jsx';
import TopBar from './topBar/topBar.jsx';
import DetailSection from './detailSection/detailSection.jsx';
import GenericWarningBox from '../pageLayoutComponents/genericWarningBox.jsx';
import GenericSuccess from '../pageLayoutComponents/genericSuccess.jsx';
import GenericFail from '../pageLayoutComponents/genericFail.jsx';
//import SideSectionButton from './sideSectionButton';
//import GenericIconButton from './genericIconBtn';
import { handleItemClick,
         } from '../stateManagement/mainPageStates/selectedItem.js';


function MainPage({svgIcons}) {

    //when we get selectedItem from the database, we set a object in the
    //nodejs to store the fileName and the fileBlob
    //file blob simulated backend functions
    window.getFileBlob = (fileName) => {
        //communicate with backend to get the file blob
        console.log( "get file blob fileName: ", fileName);
        return new Blob([""], {type: "text/plain"}); //could also return null if the operation fails
    }

    window.setFileBlob = (fileName, fileBlob) => {
        //communicate with backend to set the file blob
        console.log( "set file blob fileName: ", fileName, " fileBlob: ", fileBlob);
        return true; //could also return false if the operation fails
    }

    window.deleteFileBlob = (fileName) => {
        //communicate with backend to delete the file blob
        console.log( "delete file blob fileName: ", fileName);
        return true; //could also return false if the operation fails
    }


    //file entry delete simulated backend functions
    //not for front end as only backend can delete the file
    /*
    window.deleteFileEntry = (uuid, fileName) => {
        //communicate with backend to delete the file entry
        console.log("deleteFileEntry called with id: ", uuid, " and fileName: ", fileName);
        return true; //could also return false if the operation fails
    }
    */

    //backed function to get all items for the side bar
    window.getAllItems = () => {
        //communicate with backend to get all items
        console.log("getAllItems called");
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
            ]; //could also return null if the operation fails
    };

    //this should actually be a backed side function;
    //here just to simulate the effect.
    window.getItems = (searchParams) => { 
        //communicate with backend to get items
        //based on the searchParams
        console.log("getItems called with searchParams: ");
        console.log(searchParams);
        return [{id: 1, title: "someName", transactionDate: "2023.08.11", value: 2000, transactionType:"out", icon: svgIcons.faFilter},
            {id: 2, title: "someName2", transactionDate: "2023.08.09", value: 100, transactionType:"in", icon: svgIcons.faFilter},
            {id: 3, title: "someName3", transactionDate: "2023.08.03", value: 3500, transactionType:"in", icon: svgIcons.faFilter},
            {id: 4, title: "someName4", transactionDate: "2023.08.01", value: 5000, transactionType:"out", icon: svgIcons.faFilter},
            {id: 5, title: "someName5", transactionDate: "2023.08.01", value: 5000, transactionType:"in", icon: svgIcons.faFilter},
            ]; //could also return null if the operation fails
    };

    //some other functions are:
    //for getting the selectedItem value based on id; return null if the operation fails
    window.getSelectedItem = (uuid) => {
        //communicate with backend to get the selectedItem
        console.log("getSelectedItem called with id: ", uuid);
        //return null;
        ///*
        return {
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
            file: ["file91.txt", "file92.txt", "file93.txt"],
            createdDate: "yyyy-MM-ddThh:mm:ss",
            modifiedDate: "yyyy-MM-ddThh:mm:ss",
            transactionDate: "yyyy-MM-ddThh:mm:ss",
        }; //could also return null if the operation fails 
        //*/
    };

    //using id to delete an entry; return false if the operation fails
    window.deleteItem = (id) => {
        //communicate with backend to delete the item
        console.log("deleteItem called with id: ", id);
        return true; //could also return null if the operation fails
    };

    //takes selecteItem to modify an entry; return object if the operation succes; null if failure
    window.modifyItem = (selectedItem) => {
        //communicate with backend to modify the item
        console.log("modifyItem called with id: ", selectedItem.id);
        return {
            modifyStatus: true,
            item: {id: selectedItem.id, 
                    title: "someName5", 
                    transactionDate: "2023.08.01", 
                    value: 5000, 
                    transactionType:"in", 
                    icon: svgIcons.faFilter
                },
        }; //could also return null if the operation fails
    };

    //for simulation
    //this should actually be a backed side function;
    //this would create an entry and enter it into the database
    //and return the following info for the side bar.
    window.createEntry = () => {
        return (
                {id: 21, 
                title: "NEW ENTRY", 
                transactionDate: "2023.08.01", 
                value: 5000, 
                transactionType:"in", 
                icon: svgIcons.faFilter}
        ); //could also return null if the operation fails
    };

    //this is only the data structure for the selected item; backend needs to maintain other information related to
    //the selected item, such as the fromRef, toRef, etc.
    //we also need to send additional stuff for the select list from the backed, such as
    //currencies, transaction categories, transaction types, etc.
    /*
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
    */

    const [sideBarItems, setSideBarItems] = useImmer(window.getAllItems()); //this will be an array of objects of the form {id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", title: "someName", transactionDate: "2023.08.11", value: 2000, transactionType:"out", icon: svgIcons.faFilter}

    const [warningBoxDisplayState, setWarningBoxDisplayState] = useImmer({
                                                                            refreshBtn: "hidden",
                                                                            addBtn: "hidden",
                                                                            modifyBtn: "hidden",
                                                                            deleteBtn: "hidden",
                                                                        });

    const [successBoxDisplayState, setSuccessBoxDisplayState] = useImmer("hidden");
    const [failBoxDisplayState, setFailBoxDisplayState] = useImmer("hidden");

    /*
    const handleItemClick = (field, value) => {
        //console.log("field: " + field + " value: " + value)
        setSelectedItem( (draft) => { draft[field] = value; } );
        //console.log(selectedItem);
    };

    const handleSelectItemClick = (uuid) => {
        setSelectedItem( (draft) => {
            //get the item from the backend using UUID
            const item = getSelectedItem(uuid);
            if (item === null) {
                setFailBoxDisplayState("block");
                return;
            }
            //for each field in the draft, set the value in the Item
            for (const [key, value] of Object.entries(item)) {
                draft[key] = value;
            }
         } );
    }
    */

    const selectedItem = useSelector(state => state.selectedItem);
    //const dispatch = useDispatch();

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
            const items = window.getItems(localSearchParams);
            if (items === null) {
                setFailBoxDisplayState("block");
                return;
            }
            setSideBarItems(draft => {
                draft = items;
                return draft;
            });
        }
    };

    const handleRefreshBtnClick = () => {
        console.log("Refresh button clicked");
    }

    const handleAddBtnClick = () => {
        console.log("Add button clicked");
        //add a new entry to the database
        //show the item in the sidebar
        //and make the detail section empty to that
        //the new values can be added
        const newEntrySideBarItem = window.createEntry();
        if (newEntrySideBarItem === null) {
            setFailBoxDisplayState("block");
            return;
        }
        setSideBarItems(draft => {
            draft.unshift(newEntrySideBarItem);
        });
        setSuccessBoxDisplayState("block");
    }

    const handleModifyBtnClick = () => {
        console.log("Modify button clicked");
        //show warning and get the response
        setWarningBoxDisplayState(draft => {
            draft.modifyBtn = "block"; 
        });
    }

    const modifyDatabase = () => {
        //interact with the database through api
        //to modify an entry
        //use the selectedItem object
        console.log("modifyDatabase called. The ID to modify is :", selectedItem.id);
        const modifiedItem = window.modifyItem(selectedItem);
        if (modifiedItem.modifyStatus){
            setSideBarItems(draft => {
                draft = draft.map(item => {
                    if (item.id === selectedItem.id) {
                        return modifiedItem.item;
                    }
                    else {
                        return item;
                    }
                });
                return draft;
            });
        }

        return modifiedItem.modifyStatus; //return true or false based on the success or failure of the operation
    }

    const handleDeleteBtnClick = () => {
        console.log("Delete button clicked");
        setWarningBoxDisplayState(draft => {
            draft.deleteBtn = "block"; 
        });
    }

    const deleteEntry = () => {
        //interact with the database through api
        //to delete an entry
        //use the selectedItem object
        console.log("deleteEntry called. The ID to delete is :", selectedItem.id);
        const deleteStatus = window.deleteItem(selectedItem.id);
        if (deleteStatus){
            setSideBarItems(draft => {
                draft = draft.filter(item => item.id !== selectedItem.id);
                return draft;
            });
        }
        return deleteStatus; //return true or false based on the success or failure of the operation
    }

    const handleActionResponse = (success) => {
        if (success) {
            setSuccessBoxDisplayState("block");
        }
        else {
            setFailBoxDisplayState("block");
        }
    }

    return (
        <div 
            className="relative z-0 flex flex-row flex-wrap h-[100%] w-[100%] bg-background-cl"
        >
            <GenericWarningBox 
                warningText="Are you sure you want to modify the Entry?"
                additionalClasses=""
                displayState={warningBoxDisplayState.modifyBtn}
                changeDisplayState={setWarningBoxDisplayState}
                warningCaller="modifyBtn"
                action={modifyDatabase}
                handleActionResponse={handleActionResponse}
            />
            <GenericWarningBox
                warningText="Are you sure you want to delete the Entry?"
                additionalClasses=""
                displayState={warningBoxDisplayState.deleteBtn}
                changeDisplayState={setWarningBoxDisplayState}
                warningCaller="deleteBtn"
                action={deleteEntry}
                handleActionResponse={handleActionResponse}
            />
            <GenericSuccess
                additionalClasses=""
                displayState={successBoxDisplayState}
                changeDisplayState={setSuccessBoxDisplayState}
            />
            <GenericFail
                additionalClasses=""
                displayState={failBoxDisplayState}
                changeDisplayState={setFailBoxDisplayState}
            />
            <TopBar 
                svgIcons={svgIcons} 
                handleSearch={handleSearch}
                handleRefreshBtnClick={handleRefreshBtnClick}
                handleAddBtnClick={handleAddBtnClick}
                handleModifyBtnClick={handleModifyBtnClick}
                handleDeleteBtnClick={handleDeleteBtnClick} 
            />
            <SideBar 
                items={sideBarItems} 
                setFailBoxDisplayState={setFailBoxDisplayState}
            />
            <DetailSection 
                selectedItem={selectedItem}
                handleValueChange={handleItemClick}
                setFailBoxDisplayState={setFailBoxDisplayState}
            />
        </div>
    );
}

MainPage.propTypes = {
    svgIcons: PropTypes.object,
};

export default MainPage;
