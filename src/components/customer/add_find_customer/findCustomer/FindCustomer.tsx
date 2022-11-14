import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useContext, useEffect, useState} from "react";
import "../../../login/Login.css";
import 'react-phone-number-input/style.css'
import {Context} from "../../../../index";
import {Link, useNavigate} from "react-router-dom";
import Error from "../../../../common/Error";
import {observer} from "mobx-react-lite";
import '../CustomerAddFind.css';
import Autocomplete from "./Autocomplete";
import PhoneInput from "react-phone-number-input";

function BasicExample() {
    const [phone, setPhone] = useState<string>("+7 (");
    const [autoCompleteActive, setAutocompleteActive] = useState<boolean>(false);
    const {customerStore} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        customerStore.getCustomers();
    }, [])

    const handleClick = async (e: any) => {
        e.preventDefault();
        const customer = await customerStore.getCustomer(phone);
        if (customer) {
            navigate('/customer');
        }
    }

    const handleOnChangeInput = (e: any) => {
        setPhone(String(e));
        setAutocompleteActive(true);
    }

    return (
        <div className={'find_customer__form'}>
            <Form className="p-5 form-box bg-dark text-white">
                <h4 className="box-label">Найти посетителя</h4>
                <Form.Group className="mb-3 form-item-box" controlId="formBasicPassword">
                    <Form.Label>Телефон</Form.Label>
                    <PhoneInput
                        placeholder="+7 (777) 123 4567"
                        value={phone}
                        className={'phone__input'}
                        onChange={handleOnChangeInput}
                        PhoneInput={{backgroundColor: 'red'}}
                        onClick={() => setAutocompleteActive(!autoCompleteActive)}
                    />
                    <Autocomplete phone={phone}
                                  setPhone={setPhone}
                                  autoCompleteActive={autoCompleteActive}
                                  setAutocompleteActive={setAutocompleteActive}/>
                    {customerStore.errorMessage && <Error error={customerStore.errorMessage}/>}
                </Form.Group>
                <Form.Group className="submit-or-enter mt-4">
                    <Button variant="outline-light"
                            onClick={handleClick}
                            type="submit">
                        Найти
                    </Button>
                    <div style={{color: 'gray'}}>или</div>
                    <Link to={'/addclient'} style={{color: 'white'}}>Добавить</Link>
                </Form.Group>
            </Form>
        </div>
    );
}

export default observer(BasicExample);