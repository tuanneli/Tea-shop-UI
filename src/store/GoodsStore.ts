import {makeAutoObservable} from "mobx";
import {ICategory, IItem} from "../types/goodsTypes";
import {GoodsService} from "../api/API";

export default class GoodsStore {

    constructor() {
        makeAutoObservable(this);
    }

    _goodsLoading = false;

    get goodsLoading() {
        return this._goodsLoading;
    }

    _categoriesLoading = false;

    get categoriesLoading() {
        return this._categoriesLoading;
    }

    _categorySorted = "all";

    get categorySorted() {
        return this._categorySorted;
    }

    _goods = [] as IItem[];

    get goods() {
        return this._goods;
    }

    _categories = [] as ICategory[];

    get categories() {
        return this._categories;
    }

    setGoodsLoading(bool: boolean) {
        this._goodsLoading = bool;
    }

    setCategoriesLoading(bool: boolean) {
        this._categoriesLoading = bool;
    }

    setCategorySorted(value: string) {
        this._categorySorted = value;
    }

    setGoods(items: IItem[]) {
        this._goods = items;
    }

    setCategories(names: ICategory[]) {
        this._categories = names;
    }

    async getGoods() {
        try {
            this.setGoodsLoading(true)
            const response = await GoodsService.getItems();
            this.setGoods(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        } finally {
            this.setGoodsLoading(false)
        }
    }

    async getCategories() {
        try {
            this.setCategoriesLoading(true);
            const response = await GoodsService.getCategories();
            this.setCategories(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        } finally {
            this.setCategoriesLoading(false);
        }
    }
}