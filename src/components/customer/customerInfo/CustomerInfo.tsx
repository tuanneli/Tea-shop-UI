import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../../../index";
import "./CustomerInfo.css";

const CustomerInfo = () => {
    const {customerStore, goodsStore} = useContext(Context);
    const [allExistingGoods, setAllExistingGoods] = useState<string[]>([]);

    useEffect(() => {
        customerStore.changeCustomerOrders(goodsStore.goods);
        setAllExistingGoods(goodsStore.goods.map((item) => item.name));
    }, [customerStore.customer.statistic.orders]);

    return (
        <div className='customer-info-container bg-dark'>
            <div className='customer-general-info-box'>
                <div className='customer-each-item-box-item'><b>Имя: </b> {customerStore.customer?.name}</div>
                <div className='customer-each-item-box-item'><b>Телефон: </b> {customerStore.customer?.phone}</div>
                <div className='customer-each-item-box-item'><b>Сумма всех покупок: </b>
                    {customerStore.customer?.statistic?.total} ₸
                </div>
            </div>
            <div className='customer-each-item-box'>
                <div className='pb-2'><b>Список по товарам:</b></div>
                {customerStore.customer?.statistic?.orders.map((order) => {
                        if (allExistingGoods?.includes(order?.name)) {
                            return <div className='customer-info-item-price' key={order?.name}>
                                <div
                                    style={{color: (order?.amount % Number(order?.amountToAction) === 0) ? 'green' : 'white'}}
                                    className='customer-info-name'>{order?.name}:
                                </div>
                                <div
                                    style={{color: (order?.amount % Number(order?.amountToAction) === 0) ? 'green' : 'white'}}
                                    className='customer-info-price'>{order?.amount} шт.
                                </div>
                                {order.amountToAction !== '' ?
                                    <div
                                        style={{color: (order?.amount % Number(order?.amountToAction) === 0) ? 'green' : 'yellow'}}
                                        className='customer-info-action'>{order?.amount % Number(order?.amountToAction) === 0 ? 'Бесплатно!!!' :
                                        'Ещё ' + (Number(order?.amountToAction) - order?.amount % Number(order?.amountToAction))}
                                    </div> :
                                    <div style={{color: 'red'}}
                                         className='customer-info-action'> Не в акции
                                    </div>}
                            </div>
                        }
                    }
                )}
            </div>
            {/*<div>*/}
            {/*    История покупок:*/}
            {/*    {customerStore.customer?.history?.slice().reverse().map((historyOrder) =>*/}
            {/*        <div key={historyOrder?._id}>*/}
            {/*            <div>Дата: {historyOrder?.date}</div>*/}
            {/*            <div>{historyOrder?.order?.map((item) =>*/}
            {/*                <div key={item.name}>*/}
            {/*                    <div>Название товара: {item.name}</div>*/}
            {/*                    <div>Кол-во шт: {item.amount}</div>*/}
            {/*                    <div>Цена 1 шт: {item.price}</div>*/}
            {/*                    <div>Всего тг: {item.amount * Number(item.price)}</div>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
}

export default CustomerInfo;