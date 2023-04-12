import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartopen = () => { setIsCartOpen(!isCartOpen); }
  return (
    <CartIconContainer onClick={toggleIsCartopen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon