import React, {Dispatch, SetStateAction, useContext} from 'react';
import {AddShoppingCart, Info} from "@mui/icons-material";
import {showPartType} from "./CustomerPage";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import './Customer.css';

interface IProps {
    showPart: showPartType
    setShowPart: Dispatch<SetStateAction<showPartType>>
}

const MiniNavBar = ({showPart, setShowPart}: IProps) => {

    const {shoppingCartStore} = useContext(Context);

    return (
        <div className='bg-dark p-2 pt-3 border-end'>
            <div className='mini-navbar d-flex p-2 pt-2 bg-black rounded-5 bg-dark text-white'>
                <div className='mini-navbar-item'>
                    <Info style={(showPart === 'info') ? {color: 'wheat'} : {color: 'white'}}
                          onClick={() => setShowPart('info')}/>
                </div>
                <div className='mini-navbar-item'>
                    <AddShoppingCart style={(showPart === 'shoppingCart') ? {color: 'wheat'} : {color: "white"}}
                                     onClick={() => setShowPart('shoppingCart')}/>
                    {shoppingCartStore.totalPrice !== 0 && <div
                        className='price-label'>
                        <div className='price-label-text'>{shoppingCartStore.totalPrice} ₸</div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default observer(MiniNavBar);