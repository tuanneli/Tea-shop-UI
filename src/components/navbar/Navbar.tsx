import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import {
    AccountBox,
    AccountCircle,
    EmojiFoodBeverage,
    Engineering,
    Logout,
    PersonAdd,
    PersonSearch
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Dropdown} from "react-bootstrap";


const ColorSchemesExample = observer(() => {
    const {userStore} = useContext(Context);
    const handleExit = async () => {
        await userStore.logout();
    };

    return (
        <>
            <Navbar variant="dark" className="navbar-box" style={{backgroundColor: 'black'}} expand='lg'>
                <Container className={'navbar-container'}>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll" className='bg-black' style={{margin: 0, padding: 0}}>
                        <Nav className="me-auto">
                            <Nav className='navbar-item '>
                                <Link className="link-style"
                                      to={'/findCustomer'}>
                                    Информация о песетителе &nbsp;{<PersonSearch/>}
                                </Link>
                            </Nav>
                            {userStore.user.roles && userStore?.user?.roles[0] === 'ADMIN' &&
                                <Nav className={'navbar-item'}>
                                    <Link className="link-style" to={"/goodslist"}>
                                        Список товаров &nbsp;{<EmojiFoodBeverage/>}
                                    </Link>
                                </Nav>
                            }
                            {userStore.user.roles && userStore?.user?.roles[0] === 'ADMIN' &&
                                <Nav className={'navbar-item'}>
                                    <Link className="link-style"
                                          to={"/workers"}>Работники &nbsp;{
                                        <Engineering/>}
                                    </Link>
                                </Nav>
                            }
                        </Nav>
                        {!userStore.isAuth
                            ?
                            <Nav>
                                <Nav className='navbar-item'>
                                    <Link className="link-style"
                                          to={"/login"}>
                                        {<AccountCircle/>} Войти
                                    </Link>
                                </Nav>
                            </Nav>
                            :
                            <>
                                <Nav className='navbar-item'>
                                    <Dropdown>
                                        <Dropdown.Toggle className='navbar-item link-style'
                                                         style={{
                                                             background: 'none',
                                                             border: 'none',
                                                             boxShadow: 'none'
                                                         }}>
                                            {<AccountBox/>}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Header
                                                className='text-black'>{userStore.user.name}</Dropdown.Header>
                                            <Dropdown.Header
                                                className='text-black'>{userStore.user.email}</Dropdown.Header>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav>
                                {userStore.user.roles && userStore?.user?.roles[0] === 'ADMIN' &&
                                    <Nav className='navbar-item'>
                                        <Link className="link-style"
                                              onClick={() => userStore.setUserRoleForRegistration('ADMIN')}
                                              to={"/register"}>Добавить
                                            нового админа &nbsp;{<PersonAdd/>}
                                        </Link>
                                    </Nav>
                                }
                                <Nav className='navbar-item' style={{border: 'none'}}>
                                    <Link to={'/home'} className="link-style" onClick={handleExit}>
                                        Выйти &nbsp;{<Logout/>}
                                    </Link>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
})

export default ColorSchemesExample;