import { Link } from 'react-router-dom';
import UserDetails from './UserDetails';
import CartIcon from '../images/cart.svg';
import './Header.css';

type Cart = {
  id: string;
  quantity: number;
  type: string;
};

function Header({ cart }: { cart: Array<Cart> }) {
  const cartQuantity = cart.reduce((acc: any, item: Cart) => acc + item.quantity, 0);
  return (
    <header>
      <h1>
        <Link to="/">Coffee Shop</Link>
      </h1>
      <UserDetails />
      <Link
        className="cart"
        to="/cart"
      >
        <img src={CartIcon} alt="Cart" />
        <div className="badge" data-testid="cart-quantity">{cartQuantity}</div>
      </Link>
    </header>
  );
}

export default Header;
