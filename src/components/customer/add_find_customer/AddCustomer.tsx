import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useContext, useState} from "react";
import "../../login/Login.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {Context} from "../../../index";
import {Link, useNavigate} from "react-router-dom";
import Error from "../../../common/Error";
import {observer} from "mobx-react-lite";

function BasicExample() {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("+7");
    const {customerStore} = useContext(Context);
    const navigate = useNavigate();

    const handleClick = async (e: any) => {
        e.preventDefault();
        const customer = await customerStore.addCustomer(name, phone);
        if (customer) {
            navigate('/customer');
        }
    };

    return (
        <div className='add_customer__form'>
            <Form className="p-5 form-box bg-dark text-white">
                <h4 className="box-label">Добавить посетителя</h4>
                <Form.Group className="mb-3 form-item-box" controlId="formBasicEmail">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Введите имя нового посетителя"/>
                </Form.Group>
                <Form.Group className="mb-3 form-item-box" controlId="formBasicPassword">
                    <Form.Label>Телефон</Form.Label>
                    <PhoneInput
                        placeholder="+7 (777) 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(String(e))}
                    />
                    {customerStore.errorMessage && <Error error={customerStore.errorMessage}/>}
                </Form.Group>
                <Form.Group className="submit-or-enter mt-4">
                    <Button variant="outline-light"
                            onClick={handleClick}
                            type="submit">
                        Добавить
                    </Button>
                    <div style={{color: 'gray'}}>или</div>
                    <Link to={'/findCustomer'} style={{color: 'white'}}>Найти</Link>
                </Form.Group>
            </Form>
        </div>
    );
}

export default observer(BasicExample);