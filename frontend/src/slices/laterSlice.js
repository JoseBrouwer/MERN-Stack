import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedItems: [],
};

const laterSlice = createSlice({
    name: 'later',
    initialState,
    reducers: {
        addToSaveForLater: (state, action) => {
            const item = action.payload;
            const existItem = state.savedItems.find((x) => x._id === item._id);
            if (!existItem) {
                state.savedItems.push(item);
            }
        },
        removeFromSaveForLater: (state, action) => {
            state.savedItems = state.savedItems.filter((x) => x._id !== action.payload);
        },
        moveToCart: (state, action) => {
            // dispatch an action to cartSlice
        }
    },
});

export const { addToSaveForLater, removeFromSaveForLater, moveToCart } = laterSlice.actions;
export default laterSlice.reducer;
