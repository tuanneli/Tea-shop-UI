import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import GoodsStore from "./store/GoodsStore";
import CustomerStore from "./store/CustomerStore";
import ShoppingCartStore from "./store/ShoppingCartStore";
import HistoryStore from "./store/HistoryStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export interface IStore {
    userStore: UserStore,
    goodsStore: GoodsStore,
    customerStore: CustomerStore,
    shoppingCartStore: ShoppingCartStore,
    historyStore: HistoryStore,
}

const userStore = new UserStore();
const goodsStore = new GoodsStore();
const customerStore = new CustomerStore();
const shoppingCartStore = new ShoppingCartStore();
const historyStore = new HistoryStore();

export const Context = createContext<IStore>({
    userStore,
    goodsStore,
    customerStore,
    shoppingCartStore,
    historyStore,
});

root.render(
    <Context.Provider value={{
        userStore,
        goodsStore,
        customerStore,
        shoppingCartStore,
        historyStore
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

reportWebVitals();
