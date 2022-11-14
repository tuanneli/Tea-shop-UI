import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import {useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Error from "../../common/Error";
import {useAuthValidation} from "../../hooks/validationHooks";
import {Link, useNavigate} from "react-router-dom";

const BasicExample = observer(() => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const errorText = useAuthValidation(email, "name", password, password);
    const navigate = useNavigate();
    const {userStore} = useContext(Context);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const response = await userStore.login(email, password);
        console.log(response);
        if (errorText) {
            console.log(errorText)
            return setError(errorText);
        }
        if (response) {
            return setError(response);
        } else {
            setError("");
        }
        // if (!response && !errorText) {
        //     navigate('/home');
        // }
    };


    return (
        <div className='login__form'>
            <Form className="p-5 bg-dark form-box text-white">
                <h4 className="box-label">Войти</h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Почта</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                                  placeholder="Введите вашу почту"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                                  placeholder="Введите пароль"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    {error && <Error error={error}/>}
                </Form.Group>
                <Form.Group className="submit-or-enter">
                    <Button variant="outline-light" type="submit" onClick={handleLogin}>
                        Войти
                    </Button>
                    или
                    <Link to={'/register'} style={{color: 'white'}}>Зарегестрироваться</Link>
                </Form.Group>
            </Form>
        </div>
    );
})

export default BasicExample;