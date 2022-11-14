import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import '../../../styles/Scrollbar.css';
import "./CustomerGoods.css";
import "../Customer.css";

const CategoriesList = () => {

    const {goodsStore} = useContext(Context);
    const [isActive, setIsActive] = useState<boolean>(false);

    const getAllCategories = () => {
        try {
            goodsStore.getGoods();
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [isActive])

    return (
        <div className='customer-categories-container'>
            <div className="category-row">
                <div
                    className="category-row-item button-style"
                    style={{color: goodsStore.categorySorted === "all" ? 'wheat' : 'white'}}
                    onClick={() => goodsStore.setCategorySorted("all")}
                    key={"All"}>
                    Все
                </div>
            </div>
            {goodsStore.categories.map(category =>
                <div className="category-row" key={category.name}>
                    <div
                        style={{color: goodsStore.categorySorted === category.name ? 'wheat' : 'white'}}
                        className="category-row-item button-style"
                        onClick={() => goodsStore.setCategorySorted(category.name)}>
                        {category.name}
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(CategoriesList)