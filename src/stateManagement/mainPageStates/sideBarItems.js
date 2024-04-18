import { createSlice } from "@reduxjs/toolkit";


export const sideBarItemSlice = createSlice({
    name: "mainPage/sideBarItems",
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