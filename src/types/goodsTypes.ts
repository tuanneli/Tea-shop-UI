export interface IItem {
    _id?: string,
    name: string,
    price: string,
    inStock?: boolean,
    inAction?: boolean,
    amountToAction: string,
    category: ICategory,
}

export interface ICreateItem {
    _id?: string,
    name: string,
    price: string,
    inStock?: boolean,
    inAction?: boolean,
    amountToAction?: string,
    category: string,
}

export interface ICategory {
    _id: string
    name: string
}