import { useAppSelector } from '../app/hooks';
import { CartIcon } from '../icons';

const Navbar = () => {
  const { amount } = useAppSelector((store) => store.cart);

  return (
    <nav>
      <div className='nav-center'>
        <h3>Redux TK Kata</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;