import React from 'react';
import {Col, Row} from "react-bootstrap";
import GoodsList from "./lists/GoodsList";
import Categories from "./lists/CategoriesList";
import "./Goods.css";

const GoodsPanel = () => {
    return (
        <Row style={{margin: "0", padding: '0'}} className={'bg-dark goods__panel'}>
            <Col lg={3} md={4} style={{margin: "0", padding: '0'}}>
                <Categories/>
            </Col>
            <Col lg={9} md={8} style={{margin: "0", padding: '0'}}>
                <GoodsList/>
            </Col>
        </Row>
    );
};

export default GoodsPanel;