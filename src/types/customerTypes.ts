export interface ICustomer {
    _id?: string
    name: string
    phone: string
    statistic: {
        total: number
        orders: IOrders[]
    }
    history: IHistory[]
}

export interface IOrders {
    name: string
    amount: number
    amountToAction?: string
}

export interface IShoppingCart {
    name: string,
    price: string,
    amount: number,
}

export interface IHistory {
    _id?: string,
    customer?: string,
    order: IShoppingCart[],
    date?: string,
}