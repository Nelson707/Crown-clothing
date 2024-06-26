import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.style";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);


    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink className="nav-link" to='shop'>
                        Shop
                    </NavLink>

                    { currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                    ) : (
                        <NavLink className="nav-link" to='auth'>
                        Sign In
                        </NavLink>
                    ) }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;