import React from 'react';
import { Link } from 'react-router-dom';

import { MdShoppingBasket } from 'react-icons/all';

import { Container, Cart } from './styles';

import logo from '../../assets/images/log.svg';

export default function Header() {
    return (
        <Container>
            <Link to="/">
                <img src={logo} alt="RocketShoes" />
            </Link>

            <Cart to="/cart">
                <div>
                    <strong>My cart</strong>
                    <span>3 itens</span>
                </div>
                <MdShoppingBasket size={36} color="#FFF" />
            </Cart>
        </Container>
    );
}
