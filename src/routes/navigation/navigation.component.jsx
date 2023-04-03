import React, { Fragment, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.contexts';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';
const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/ '>
          <CrwnLogo />
        </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to='/shop'>SHOP</Link>

          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
          ) : (
            <Link className='nav-link' to='/auth'>SIGN IN</Link>
          )}

          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;