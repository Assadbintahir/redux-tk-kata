import { createSlice } from '@reduxjs/toolkit';
import cartData from '../../cartItems';

const initialState = {
    cartItems: cartData,
    amount: cartData.length,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
});

console.log(cartSlice);

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;