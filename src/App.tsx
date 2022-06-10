import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { calculateTotals, getCartAPI, getCartsWithThunkAPI } from './features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

function App() {
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartAPI());
    dispatch(getCartsWithThunkAPI());
  }, [dispatch])

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);


  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return <main>
    {
      isOpen ? <Modal /> : <></>
    }
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;

