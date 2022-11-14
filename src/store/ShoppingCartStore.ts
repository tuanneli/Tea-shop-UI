import {makeAutoObservable} from "mobx";
import {IShoppingCart} from "../types/customerTypes";

export default class ShoppingCartStore {
    constructor() {
        makeAutoObservable(this);
    }

    _shoppingCart = [] as IShoppingCart[];

    get shoppingCart() {
        return this._shoppingCart;
    }

    _totalPrice = 0;

    get totalPrice() {
        return this._totalPrice;
    }

    setShoppingCart(ShoppingCart: IShoppingCart[]) {
        this._shoppingCart = ShoppingCart;
    }

    setTotalPrice(number: number) {
        this._totalPrice = number;
    }

    addItemToShoppingCart(name: string, price: string) {
        const isInCart = this.shoppingCart.find(item => item.name === name);
        this.setTotalPrice(this.totalPrice + Number(price));
        if (isInCart) {
            return this.setShoppingCart(this.shoppingCart.map(item =>
                item.name === name ? {...item, amount: item.amount + 1} : item));
        }
        this.setShoppingCart([...this.shoppingCart, {name, price, amount: 1}]);
    }

    removeItemFromShoppingCart = (name: string, price: string) => {
        this.setTotalPrice(this.totalPrice - Number(price));
        this.setShoppingCart(this.shoppingCart.reduce((prev, item) => {
            if (item.name == name) {
                if (item.amount === 1) return prev;
                return [...prev, {...item, amount: item.amount - 1}]
            } else {
                return [...prev, item]
            }
        }, [] as IShoppingCart[]));
    }

    clear() {
        this.setShoppingCart([] as IShoppingCart[]);
        this.setTotalPrice(0);
    }
};