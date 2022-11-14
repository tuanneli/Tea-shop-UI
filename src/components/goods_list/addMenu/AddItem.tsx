import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Dropdown, Form} from "react-bootstrap";
import {Context} from "../../../index";
import {IItem} from "../../../types/goodsTypes";
import {observer} from "mobx-react-lite";
import {GoodsService} from "../../../api/API";
import "../Goods.css";

interface IAddItem {
    newItem: boolean
    show: boolean,
    setShow: (bool: boolean) => void,
    item: IItem
}

const AddItem = ({newItem, show, setShow, item}: IAddItem) => {

    const handleClose = () => setShow(false);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [inAction, setInAction] = useState<boolean>(false);
    const [inStock, setInStock] = useState<boolean>(false);
    const [amountToAction, setAmountToAction] = useState<string>("");
    const {goodsStore} = useContext(Context);

    useEffect(() => {
        if (!show) {
            handleClose();
            setName("");
            setPrice("");
            setCategory("");
            setInAction(false);
            setAmountToAction("");
            setInStock(false);
        }
    }, [show])

    useEffect(() => {
        if (item) {
            setInAction(item?.inAction as boolean);
            setInStock(item?.inStock as boolean);
            setName(item?.name);
            setPrice(item?.price);
            setAmountToAction(item?.amountToAction);
            setCategory(item?.category?.name);
        }
    }, [item])

    useEffect(() => {
        if (!inAction) {
            setAmountToAction("");
        }
    }, [inAction])

    const handleSave = async () => {
        if (newItem) {
            try {
                await GoodsService.createItem({name, price, inStock, inAction, amountToAction, category});
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                await GoodsService.changeItem({
                    _id: item?._id,
                    name,
                    price,
                    inStock,
                    inAction,
                    amountToAction,
                    category
                });
            } catch (e) {
                console.log(e)
            }
        }
        setShow(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title>{newItem ? "Добавить товар" : "Изменить товар"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant='outline-light'>{category == "" ? "Выберете категорию" : category}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {goodsStore.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => setCategory(category.name)}
                                    key={category.name}>{category.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                        <Form.Control value={name}
                                      className='modal-input-field add-dropdown-menu-item my-3'
                                      onChange={(e) => setName(e.target.value)}
                                      placeholder={"Введите название товара"}/>
                        <Form.Control value={price}
                                      className='modal-input-field add-dropdown-menu-item my-3'
                                      onChange={(e) => setPrice(e.target.value)}
                                      type={"number"}
                                      placeholder={"Введите цену в тенге"}/>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   readOnly
                                   onClick={() => setInStock(!inStock)}
                                   style={{
                                       backgroundColor: inStock ? 'green' : 'white',
                                       borderColor: "green",
                                       boxShadow: "none"
                                   }}
                                   id="flexSwitchCheckChecked"
                                   checked={inStock}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">В наличии</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   readOnly
                                   onClick={() => setInAction(!inAction)}
                                   style={{
                                       backgroundColor: inAction ? 'green' : 'white',
                                       borderColor: "green",
                                       boxShadow: "none"
                                   }}
                                   id="flexSwitchCheckChecked"
                                   checked={inAction}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Учавствует в
                                акции</label>
                        </div>
                        {inAction &&
                            <div>
                                <div className="add-menu-inAction-label">Введите колличество товара после которого будет
                                    бесплатный
                                </div>
                                <Form.Control value={amountToAction}
                                              type={"number"}
                                              className='modal-input-field add-dropdown-menu-item my-3'
                                              onChange={(e) => setAmountToAction(e.target.value)}
                                              placeholder={""}/>
                            </div>}
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button variant="outline-light" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="outline-success" onClick={handleSave}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default observer(AddItem);