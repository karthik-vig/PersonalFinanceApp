import { createSlice } from '@reduxjs/toolkit';

const selectFilterFinancialEntitySlice = createSlice({
    name: "recurringEntityPage/selectFilterFinancialEntityState",
    initialState: {
        type: null,
        fieldname: null,
    },
    reducers: {
        setFilterFinancialEntity: (state, action) => {
            //action.payload = {type: string, fieldname: string}; type = "Internal" or "External" and fieldname = "fromEntity" or "toEntity"
            state.type = action.payload.type;
            state.fieldname = action.payload.fieldname;
        },
        resetFilterFinancialEntity: (state) => {
            state.type = null;
            state.fieldname = null;
        },
    },
});

export const { setFilterFinancialEntity, resetFilterFinancialEntity } = selectFilterFinancialEntitySlice.actions;

export default selectFilterFinancialEntitySlice.reducer;