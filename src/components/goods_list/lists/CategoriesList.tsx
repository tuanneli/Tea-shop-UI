import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../../../index";
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import "../Goods.css";
import Button from "react-bootstrap/Button";
import AddCategory from "../addMenu/AddCategory";
import {GoodsService} from "../../../api/API";
import {ICategory} from "../../../types/goodsTypes";
import './Lists.css';
import ConformationModal from "../../../common/ConformationModal";
import Error from "../../../common/Error";

const CategoriesList = () => {

    const {goodsStore} = useContext(Context);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [showConformationModal, setShowConformationModal] = useState<boolean>(false);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [itemForDelete, setItemForDelete] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isNew, setIsNew] = useState<boolean>(false);
    const [category, setCategory] = useState<ICategory>();

    const getAllCategories = () => {
        try {
            goodsStore.getGoods();
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (confirmed) {
            const isInGoods = goodsStore.goods.find(item => item?.category?.name === itemForDelete);
            if (!isInGoods) {
                GoodsService.deleteCategory(itemForDelete).then(() => {
                    getAllCategories();
                });
            } else {
                setError('Нельзя удалить категорию которая используется');
            }
        } else {
            getAllCategories();
        }
        setConfirmed(false);
    }, [isActive, showConformationModal])

    if (error) {
        setTimeout(() => {
            setError("")
        }, 5000);
    }

    const handleDelete = (name: string) => {
        console.log('delete render')
        setItemForDelete(name);
        setShowConformationModal(true);
    };

    const handleAdd = () => {
        setIsNew(true);
        setIsActive(true);
    }

    const handleChange = useMemo(() => (category: ICategory) => {
        console.log('change render')
        setIsNew(false);
        setIsActive(true);
        setCategory(category);
    }, [])

    return (
        <div className={'categories-container'}>
            <div className="category-goods-row row">
                <div className={'categories-label col-12'}>
                    {error ?
                        <div className="text-center"><Error error={error}/>
                        </div> : "КАТЕГОРИИ"}
                </div>
            </div>
            <div className="category-goods-row row">
                <div
                    className="category-group-item col-4"
                    style={{color: goodsStore.categorySorted === 'all' ? 'wheat' : 'white'}}
                    onClick={() => goodsStore.setCategorySorted("all")}
                    key={"All"}>
                    Все
                </div>
                <button className={"add-new-button col-8 px-1"} onClick={handleAdd}>Добавить
                    категорию
                </button>
            </div>
            {goodsStore.categories.map(category =>
                <div className="category-goods-row row" key={category.name}>
                    <div
                        className="category-group-item col-4"
                        style={{color: goodsStore.categorySorted === category.name ? 'wheat' : 'white'}}
                        onClick={() => goodsStore.setCategorySorted(category.name)}>
                        {category.name}
                    </div>
                    <button className={"remove-button col-4"}
                            onClick={() => handleDelete(category.name)}>Удалить
                    </button>
                    <button className={"change-button col-4"} onClick={() => handleChange(category)}>Изменить
                    </button>
                </div>
            )}
            <AddCategory isNew={isNew} show={isActive} setShow={setIsActive} category={category as ICategory}/>
            <ConformationModal show={showConformationModal}
                               setShow={setShowConformationModal}
                               setConfirmed={setConfirmed}
                               confirmed={confirmed}/>
        </div>
    );
}

export default observer(CategoriesList)