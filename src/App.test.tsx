import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import ShoppingCart from "./components/customer/shoppingCart/ShoppingCart";
import axios from 'axios';

jest.mock('axios');

test('renders learn react link', () => {
    render(<ShoppingCart/>);
});
