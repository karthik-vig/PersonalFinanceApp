import { createSlice } from '@reduxjs/toolkit';

export const searchParamsSlice = createSlice({
    name: "financialEntityPage/searchParams",
    initialState: {
        search: "", //string input
        filter: {
            type: null, //string input must be "Internal" or "External"
            createdDate: { min: null, //date picker
                            max: null, //date picker
                            },
            modifiedDate: { min: null, //date picker
                            max: null, //date picker
                            },
            sort: { ascending: true, //can be true or false
                    field: null, //some valid field name
                },
        },   
    },
    reducers: {
        setSearchField: (state, action) => {
            //action.payload = {search: string}
            state.search = action.payload;
        },
        setFilterParams: (state, action) => {
            //action.payload = {fieldName: string, fieldValue: string}
            const fieldSuffice = action.payload.fieldName.slice(-3);
            if (fieldSuffice === "Min" || fieldSuffice === "Max") {
                const filterFieldName = action.payload.fieldName.slice(0, -3);
                state.filter[filterFieldName][fieldSuffice.toLowerCase()] = action.payload.fieldValue;
            } else if (action.payload.fieldName === "sortAscending" || action.payload.fieldName === "sortField") {
                state.filter.sort[action.payload.fieldName.slice(4).toLowerCase()] = action.payload.fieldValue;
            } else {
                state.filter[action.payload.fieldName] = action.payload.fieldValue;
            }
        }
    }
});

export const { setSearchField, 
               setFilterParams,
             } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;