import {makeAutoObservable} from "mobx";
import {ICustomer, IHistory, IOrders} from "../types/customerTypes";
import {CustomerService, GoodsService} from "../api/API";
import {IItem} from "../types/goodsTypes";

export default class CustomerStore {

    constructor() {
        makeAutoObservable(this);
    }

    _customers = [] as ICustomer[];

    get customers() {
        return this._customers;
    }

    _errorMessage = "";

    get errorMessage() {
        return this._errorMessage;
    }

    _isFound = false;

    get isFound() {
        return this._isFound;
    }

    _customer = {} as ICustomer;

    get customer() {
        return this._customer;
    }

    changeCustomerOrders(goods: IItem[]) {
        this.customer.statistic.orders.map((order) => {
            goods?.map((item) => {
                if (order?.name === item?.name) {
                    order.amountToAction = item.amountToAction;
                }
            })
        })
    }

    setCustomers(customersData: ICustomer[]) {
        this._customers = customersData;
    }

    setErrorMessage(message: string) {
        this._errorMessage = message;
    }

    setIsFound(bool: boolean) {
        this._isFound = bool;
    }

    setCustomer(customerData: ICustomer) {
        this._customer = customerData;
    }

    async addCustomer(name: string, phone: string) {
        try {
            const response = await CustomerService.registerCustomer(name, phone);
            this.setCustomer(response.data);
            this.setIsFound(true);
            this.setErrorMessage("");
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrorMessage(e.response?.data?.message);
        }
    }

    async getCustomer(phone: string) {
        try {
            const response = await CustomerService.findCustomer(phone);
            this.setCustomer(response.data);
            this.setIsFound(true);
            this.setErrorMessage("");
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrorMessage(e.response?.data?.message);
        }
    }

    async getCustomers() {
        try {
            const response = await CustomerService.findCustomers();
            this.setCustomers(response.data);
            this.setErrorMessage("");
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrorMessage(e.response?.data?.message);
        }
    }
}