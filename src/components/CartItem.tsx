import React from 'react';
import { useAppDispatch } from '../app/hooks';

import { removeItem, increase, decrease } from '../features/cart/cartSlice';
import { ChevronDown, ChevronUp } from '../icons';

interface ICartItem {
    id: string,
    img: string,
    title: string,
    price: string,
    amount: number
};

const CartItem = ({ id, img, title, price, amount }: ICartItem) => {
  const dispatch = useAppDispatch();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={() => dispatch(removeItem(id))}>remove</button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => dispatch(increase({ id }))}>
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={() => {
          if (amount === 1) {
            dispatch(removeItem(id));
            return;
          }
          dispatch(decrease({ id }));
        }}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;