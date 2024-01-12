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
//import { handleItemClick,
//         } from '../stateManagement/mainPageStates/selectedItem.js';
import { setSideBarItems,
            } from '../stateManagement/mainPageStates/sideBarItems.js';


function MainPage({svgIcons}) {

    
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

    //const [sideBarItems, setSideBarItems] = useImmer(window.getAllItems()); //this will be an array of objects of the form {id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", title: "someName", transactionDate: "2023.08.11", value: 2000, transactionType:"out", icon: svgIcons.faFilter}

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

    const sideBarItems = useSelector(state => state.sideBarItems);
    //dispatch(setSideBarItems(window.electronAPI.getAllItems()));

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
            let items = null;
            window.electronAPI.getItems(localSearchParams).then(data => {
                items = data;
            });
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
        let newEntrySideBarItem = null;
        window.electronAPI.createEntry().then(data => {
            newEntrySideBarItem = data;
        });
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
        let modifiedItem = null;
        window.electronAPI.modifyItem(selectedItem).then(data => {
            modifiedItem = data;
        });
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
        let deleteStatus = false;
        window.electronAPI.deleteItem(selectedItem.id).then(data => {
            deleteStatus = data;
        });
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
                //selectedItem={selectedItem}
                //handleValueChange={handleItemClick}
            />
        </div>
    );
}

MainPage.propTypes = {
    svgIcons: PropTypes.object,
};

export default MainPage;
