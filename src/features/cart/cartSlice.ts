import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import cartData from '../../cartItems';

interface CartState {
    cartItems: typeof cartData,
    amount: number,
    total: number,
    isLoading: boolean,
}

const initialState: CartState = {
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
        removeItem: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increase: (state, { payload }: PayloadAction<{ id: string }>) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            if(cartItem) {
                cartItem.amount = cartItem.amount + 1;
            }
        },
        decrease: (state, { payload }: PayloadAction<{ id: string }>) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            if(cartItem) {
                cartItem.amount = cartItem.amount - 1;
            }
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * Number(item.price);
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCartAPI.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCartAPI.fulfilled, (state, action: PayloadAction<typeof cartData>) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        });
        builder.addCase(getCartAPI.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;