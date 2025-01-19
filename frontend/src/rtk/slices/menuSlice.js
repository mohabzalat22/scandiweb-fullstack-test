import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setShowMenu : (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setShowMenu } = menuSlice.actions;
export default menuSlice.reducer;