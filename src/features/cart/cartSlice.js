import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartData from '../../cartItems';

const initialState = {
    cartItems: cartData,
    amount: cartData.length,
    total: 0,
    isLoading: false,
}

export const getCartAPI = createAsyncThunk('cart/getCartAPI', () => {
    return fetch('https://course-api.com/react-useReducer-cart-project')
        .then(resp => resp.json())
        .catch(() => console.log('API fetch operation failed'));
})

export const getCartsWithThunkAPI = createAsyncThunk('cart/getCartsWithThunkAPI', async (name, thunkAPI) => {
    console.log(name);
    console.log(thunkAPI.signal);
    console.log(thunkAPI.requestId);
    console.log(thunkAPI.extra);
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: {
        [getCartAPI.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartAPI.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartAPI.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;