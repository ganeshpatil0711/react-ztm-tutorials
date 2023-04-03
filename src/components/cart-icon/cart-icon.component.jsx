import './cart-icon.styles.scss';
import { ReactComponent as ShopingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartopen = () => { setIsCartOpen(!isCartOpen); }
  return (
    <div className="cart-icon-container" onClick={toggleIsCartopen}>
      <ShopingIcon className="shopingpicon" />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon