import React, {useContext} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {CustomerService} from "../../../api/API";
import "../Customer.css";
import "./ShoppingCart.css";

const ShoppingCart = () => {

    const {shoppingCartStore, customerStore, historyStore} = useContext(Context);

    const clearHandler = () => {
        shoppingCartStore.clear();
    }

    const addItemToHistory = async () => {
        await historyStore.addHistory({order: shoppingCartStore.shoppingCart}, customerStore.customer._id as string);
    }

    const addItemToCustomer = () => {
        customerStore.customer.statistic.total += shoppingCartStore.totalPrice;
        shoppingCartStore.shoppingCart.map((shoppingCartItem) => {
            const isInCart = customerStore.customer.statistic.orders.find(item => item.name === shoppingCartItem.name);
            if (isInCart) {
                return customerStore.customer.statistic.orders = customerStore.customer.statistic.orders.map(item =>
                    item.name === shoppingCartItem.name ? {
                        ...item,
                        amount: item.amount + shoppingCartItem.amount
                    } : item);
            }
            customerStore.customer.statistic.orders = [...customerStore.customer.statistic.orders, {
                name: shoppingCartItem.name,
                amount: shoppingCartItem.amount
            }]
        });
        shoppingCartStore.clear();
        CustomerService.addOrders(customerStore.customer.statistic.orders, historyStore.history._id as string, customerStore.customer.statistic.total, customerStore.customer.phone)
            .then((response) => {
                customerStore.setCustomer(response.data)
            });
    }

    const addItem = async () => {
        await addItemToHistory();
        addItemToCustomer();
    }

    return (
        <div className='bg-dark shopping-cart-container'>
            <div className={'total-box row'}>
                <div className='col-md-4'>Всего: {shoppingCartStore.totalPrice} ₸
                </div>
                <div className='col-md-8 clear-add-box'>
                    <button className='button-style clear-button' onClick={clearHandler}>Очистить</button>
                    <button className='button-style add-button' onClick={addItem}>Добавить</button>
                </div>
            </div>
            {shoppingCartStore.shoppingCart.map((item) =>
                <div key={item.name} className="shopping-cart-item">
                    <div className='col-md-7'>
                        <div>{item?.name}</div>
                        <div>{item?.amount * Number(item?.price)} ₸</div>
                    </div>
                    <div className='col-md-5 more-less-box'>
                        <button className='button-style button-item'
                                onClick={() => shoppingCartStore.removeItemFromShoppingCart(item?.name, item?.price)}>
                            <div className={'button-text'}>-</div>
                        </button>
                        <div className='amount-item'>{item?.amount}</div>
                        <button className='button-style button-item'
                                onClick={() => shoppingCartStore.addItemToShoppingCart(item?.name, item?.price)}>
                            <div className={'button-text'}>+</div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(ShoppingCart);