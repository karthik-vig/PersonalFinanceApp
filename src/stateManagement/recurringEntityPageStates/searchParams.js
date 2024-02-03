import { createSlice } from '@reduxjs/toolkit';

export const searchParamsSlice = createSlice({
    name: "recurringEntityPage/searchParams",
    initialState: {
        search: "", //string input
        filter: {
            value: {
                min: null, //number input
                max: null, //number input
            },
            currency: null, //select list
            transactionType: null, //select list
            transactionCategory: null, //select list
            //fromType: null, //select list
            fromEntity: null, //select list
            //toType: null, //select list
            toEntity: null, //select list
            //recurringEntity: null, //select list
            createdDate: { min: null, //date picker
                            max: null, //date picker
                            },
            modifiedDate: { min: null, //date picker
                            max: null, //date picker
                            },
            /*
            transactionDate: { min: null, //date picker
                                max: null, //date picker
                            },
            */
            recurringFrequencyType: null, //select list
            recurringFrequencyDayOfTheWeek: { min: null, //string input
                                              max: null, //string input
                                            },
            recurringFrequencyDayOfTheMonth: { min: null, //number input
                                                max: null, //number input
                                            },
            recurringFrequencyMonthOfTheYear: { min: null, //string input
                                                max: null, //string input
                                            },
            recurringFrequencyTime: { min: null, //time picker
                                    max: null, //time picker
                                    },
            recurringTransactionStartDate: { min: null, //date picker
                                            max: null, //date picker
                                            },
            recurringTransactionEndDate: { min: null, //date picker
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