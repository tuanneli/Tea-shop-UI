import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Col, Row} from "react-bootstrap";
import CustomerInfo from "./customerInfo/CustomerInfo";
import CustomerGoods from "./goodsPart/CustomerGoods";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import {observer} from "mobx-react-lite";
import {Route, Routes, useNavigate} from "react-router-dom";
import FindCustomer from "./add_find_customer/findCustomer/FindCustomer";
import MiniNavBar from "./MiniNavBar";

export type showPartType = 'info' | 'shoppingCart';

const CustomerPage = () => {

    const {customerStore} = useContext(Context);
    const [showPart, setShowPart] = useState<showPartType>("shoppingCart");

    if (!customerStore.isFound) {
        return (
            <FindCustomer/>
        );
    }

    return (
        <Row style={{margin: "0", padding: '0'}}>
            <Col className='col-xl-3 p-0'>
                <MiniNavBar showPart={showPart} setShowPart={setShowPart}/>
                {showPart === "info" && <CustomerInfo/>}
                {showPart === 'shoppingCart' && <ShoppingCart/>}
            </Col>
            <Col className='col-xl-9 p-0'>
                <CustomerGoods/>
            </Col>
        </Row>
    );
};

export default observer(CustomerPage);