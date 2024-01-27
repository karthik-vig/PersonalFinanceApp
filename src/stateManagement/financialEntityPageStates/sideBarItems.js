import { createSlice } from "@reduxjs/toolkit";
//import  { useDispatch } from "react-redux";

//console.log("calling window.transactionOperations.getAllItems() from sideBarItems.js");
/*
async function getAllItems() {
    const allItems = await window.transactionOperations.getAllItems();
    console.log("allItems in getAllItems= ", allItems);
    return allItems;
}

let allItems = [];
getAllItems().then((result) => {
    console.log("allItems = ", result);
    allItems = [...result];
});
*/

export const sideBarItemSlice = createSlice({
    name: "sideBarItems",
    initialState: [],
    reducers: {
        removeSideBarItem: (state, action) => {
            //action.payload = uuid
            console.log("The State of Side Bar Items before removal = ");
            console.log(state);
            state = state.filter(item => String(item.id) !== String(action.payload));
            console.log("The State of Side Bar Items after removal = ");
            console.log(state);
            return state;
        },
        modifySideBarItem: (state, action) => {
            //action.payload = {id: string, modifiedItem: object}
            console.log("Attempting to modify sideBarItem with id = ", action.payload.modifiedItem.item.id);
            state = state.map(item => {
                if (String(item.id) === String(action.payload.modifiedItem.item.id)) {
                    return action.payload.modifiedItem.item;
                }
                else {
                    return item;
                }
            });
            console.log("No error in modifySideBarItem");
            return state;
        },
        addSideBarItem: (state, action) => {
            //action.payload = object
            state.unshift(action.payload);
        },
        setSideBarItems: (state, action) => {
            //action.payload = objects
            state = action.payload;
            return state;
        },

    }
});

export const {  removeSideBarItem,
                modifySideBarItem,
                addSideBarItem,
                setSideBarItems,
             } = sideBarItemSlice.actions;

export default sideBarItemSlice.reducer;