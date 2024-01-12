import { createSlice } from "@reduxjs/toolkit";
//import  { useDispatch } from "react-redux";

//console.log("calling window.electronAPI.getAllItems() from sideBarItems.js");
async function getAllItems() {
    const allItems = await window.electronAPI.getAllItems();
    console.log("allItems in getAllItems= ", allItems);
    return allItems;
}

let allItems = [];
getAllItems().then((result) => {
    console.log("allItems = ", result);
    allItems = [...result];
});

export const sideBarItemSlice = createSlice({
    name: "sideBarItems",
    initialState: console.log(allItems),
    reducers: {
        removeSideBarItem: (state, action) => {
            //action.payload = {id: string}
            state = state.filter(item => item.id !== action.payload.id);
            return state;
        },
        modifySideBarItem: (state, action) => {
            //action.payload = {id: string, modifiedItem: object}
            state = state.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload.modifiedItem.item;
                }
                else {
                    return item;
                }
            });
            return state;
        },
        addSideBarItem: (state, action) => {
            //action.payload = {newItem: object}
            state.unshift(action.payload.newItem);
        },
        setSideBarItems: (state, action) => {
            //action.payload = {newItems: object}
            state = action.payload.newItems;
        },

    }
});

export const {  removeSideBarItem,
                modifySideBarItem,
                addSideBarItem,
                setSideBarItems,
             } = sideBarItemSlice.actions;

export default sideBarItemSlice.reducer;