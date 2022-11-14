import React, {useContext, useEffect, useState} from 'react';
import {GoodsService} from "../../../api/API";
import {IItem} from "../../../types/goodsTypes";
import AddItem from "../addMenu/AddItem";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import "../Goods.css";
import "./Lists.css";
import ConformationModal from "../../../common/ConformationModal";
import {Add, Delete, Edit} from "@mui/icons-material";

const GoodsList = () => {
    const [item, setItem] = useState<IItem>();
    const [newItem, setNewItem] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const {goodsStore} = useContext(Context);
    const [showConformationModal, setShowConformationModal] = useState<boolean>(false);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [itemForDelete, setItemForDelete] = useState<string>("");
    const {innerWidth: width} = window;

    const getAllItems = () => {
        try {
            goodsStore.getGoods();
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (confirmed) {
            GoodsService.deleteItem(itemForDelete).then(() => {
                getAllItems();
            });
        } else {
            getAllItems();
        }
        setConfirmed(false);
    }, [isActive, showConformationModal]);

    const handleDelete = (name: string) => {
        setItemForDelete(name);
        setShowConformationModal(true);
    };

    const handleChange = (item: IItem) => {
        setNewItem(false);
        setIsActive(true);
        setItem(item);
    }

    const handleAddItem = () => {
        setNewItem(true);
        setIsActive(true);
    }

    return (
        <div className='goods-container'>
            <div className="w-100">
                <div className="goods-row text-white row">
                    <div className={'categories-label col-12'}>ТОВАРЫ</div>
                </div>
                <div className="goods-row text-white row">
                    <div className="goods-item p-md-2 p-0 col-md-3 col-lg-4 col-2">Название</div>
                    <div className="goods-item p-md-2 p-0 col-md-2 col-lg-1 col-2">Категория</div>
                    <div className="goods-item p-md-2 p-0 col-md-1 col-lg-1 col-2">Цена</div>
                    <div className="goods-item p-md-2 p-0 col-md-1 col-lg-1 col-2">Есть</div>
                    <div className="goods-item p-md-2 p-0 col-md-1 col-lg-1 col-2">В акции</div>
                    <button className='add-new-button p-md-2 p-0 col-md-4 col-lg-4 col-2'
                            onClick={handleAddItem}> {width > 1000 ? 'Добавить товар' : <Add/>}
                    </button>
                </div>
                {goodsStore.goods.length !== 0 && goodsStore.goods.map(item => {
                    if (item?.category?.name == goodsStore.categorySorted || goodsStore.categorySorted == "all") {
                        return <div key={item.name} className="goods-row text-white row">
                            <div className="goods-item p-md-2 p-0 col-md-3 col-lg-4 col-2">{item?.name}</div>
                            <div className="goods-item p-md-2 p-0 col-md-2 col-lg-1 col-2">{item?.category?.name}</div>
                            <div className="goods-item p-md-2 p-0 col-md-1 col-lg-1 col-2">{item?.price}</div>
                            <div
                                className="goods-item p-md-2 p-0 col-md-1 col-lg-1 col-2">{item?.inStock ? "Да" : "Нет"}</div>
                            <div
                                className="goods-item p-md-2 p-0 col-md-1 col-lg-1 col-2">{item?.inAction ? item.amountToAction : "Нет"}</div>
                            <button className="remove-button p-md-2 p-0 col-md-2 col-lg-2 col-1"
                                    onClick={() => handleDelete(item.name)}>{width > 1000 ? 'Удалить' : <Delete/>}
                            </button>
                            <button className="change-button p-md-2 p-0 col-md-2 col-lg-2 col-1"
                                    onClick={() => handleChange(item)}> {width > 1000 ? 'Изменить' : <Edit/>}
                            </button>
                        </div>
                    }
                })}
            </div>
            <AddItem newItem={newItem} show={isActive} setShow={setIsActive} item={item as IItem}/>
            <ConformationModal show={showConformationModal}
                               setShow={setShowConformationModal}
                               setConfirmed={setConfirmed}
                               confirmed={confirmed}/>
        </div>
    );
};

export default observer(GoodsList);