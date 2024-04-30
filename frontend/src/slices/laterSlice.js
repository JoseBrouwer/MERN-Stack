import { createSlice } from '@reduxjs/toolkit';

const loadSavedItems = () => {
    try {
        const serializedState = localStorage.getItem('saveForLater');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load saved items:", e);
        return [];
    }
};

const initialState = {
    savedItems: loadSavedItems(),
};

const laterSlice = createSlice({
    name: 'later',
    initialState,
    reducers: {
        addToSaveForLater: (state, action) => {
            const item = action.payload;
            const existItem = state.savedItems.find((x) => x._id === item._id);
            if (!existItem) {
                state.savedItems.push({ ...item, qty: action.payload.qty });
            }
            localStorage.setItem('saveForLater', JSON.stringify(state.savedItems));
        },
        updateItemQuantity: (state, action) => {
            const { _id, qty } = action.payload;
            const existingItem = state.savedItems.find(item => item._id === _id);
            if (existingItem) {
                existingItem.qty = qty;
            }
            localStorage.setItem('saveForLater', JSON.stringify(state.savedItems));
        },
        removeFromSaveForLater: (state, action) => {
            state.savedItems = state.savedItems.filter((x) => x._id !== action.payload);
            localStorage.setItem('saveForLater', JSON.stringify(state.savedItems));
        },
        moveToCart: (state, action) => {
            // dispatch an action to SaveForLaterScreen.jsx handler for moving item to cart
        }
    },
});

export const { addToSaveForLater, updateItemQuantity, removeFromSaveForLater, moveToCart } = laterSlice.actions;
export default laterSlice.reducer;
