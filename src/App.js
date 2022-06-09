import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { calculateTotals, getCartAPI, getCartsWithThunkAPI } from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getCartAPI());
    dispatch(getCartsWithThunkAPI());
  }, [])

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);


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