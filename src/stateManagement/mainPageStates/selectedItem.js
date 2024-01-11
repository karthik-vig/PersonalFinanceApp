import { createSlice } from "@reduxjs/toolkit";
//import  { useDispatch } from "react-redux";

export const selectedItemSlice = createSlice({
    name: "selectedItem",
    initialState: {
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
                    file: ["file1.txt", "file2.txt", "file3.txt"],
                    /*
                    { 
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
                },*/
                    createdDate: "YYYY-MM-DDThh:mm:ss",
                    modifiedDate: "YYYY-MM-DDThh:mm:ss",
                    transactionDate: "YYYY-MM-DDThh:mm:ss",
                },
    reducers: {
        handleItemClick: (state, action) => {
            //action.payload = {fieldName: string, fieldValue: string}
            state[action.payload.fieldName] = action.payload.fieldValue;
        },
        handleSelectItemClick: (state, action) => {
            /*action.payload = the selectedItem object structure with values
            */
           if (action.payload !== null){
                return action.payload;
           }
           return null;
        },

    }
});

export const {  handleItemClick, 
                handleSelectItemClick,
             } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;