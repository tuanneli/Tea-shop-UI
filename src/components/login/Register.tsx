import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Error from "../../common/Error";
import {useAuthValidation} from "../../hooks/validationHooks";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

function BasicExample() {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [passwordFirst, setFirstPassword] = useState<string>("");
    const [passwordSecond, setSecondPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [userRole, setUserRole] = useState<string>('USER');
    const errorText = useAuthValidation(email, name, passwordFirst, passwordSecond);
    const navigate = useNavigate();
    const {userStore} = useContext(Context);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (errorText) {
            return setError(errorText)
        }
        const resError = await userStore.registration(email, name, passwordFirst, userStore.userRoleForRegistration);
        if (resError) {
            return setError(resError)
        }
        if (!resError && !errorText) {
            userStore.setUserRoleForRegistration('USER');
            setError("");
            navigate('/home');
        }
    }

    return (
        <div className='register__form'>
            <Form className="p-5 bg-dark form-box text-white">
                <h4 className="box-label">Зарегистрироваться</h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Почта</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                                  className="form-control"
                                  placeholder="Введите вашу почту"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text"
                                  className="form-control"
                                  placeholder="Введите ваше имя"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={passwordFirst} onChange={(e) => setFirstPassword(e.target.value)}
                                  type="password"
                                  placeholder="Введите пароль"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                    <Form.Control value={passwordSecond} onChange={(e) => setSecondPassword(e.target.value)}
                                  type="password"
                                  placeholder="Повторите пароль"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    {error && <Error error={error}/>}
                </Form.Group>
                <Form.Group className="submit-or-enter">
                    <Button onClick={handleSubmit} variant="outline-light " type="submit">
                        Зарегистрироваться
                    </Button>
                    или
                    <Link to={'/login'} style={{color: 'white'}}>Войти</Link>
                </Form.Group>
            </Form>
        </div>
    );
}

export default observer(BasicExample);