import React, {useContext, useEffect, useState} from 'react';
import "./Workers.css";
import {AuthService, UsersService} from "../../api/API";
import {IUser} from "../../types/authTypes";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ConformationModal from "../../common/ConformationModal";

const Workers = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<string>("");
    const {userStore} = useContext(Context);
    const [showConformationModal, setShowConformationModal] = useState<boolean>(false);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [itemForDelete, setItemForDelete] = useState<string>("");
    const {innerWidth: width} = window;
    const [isLoading, setIsLoading] = useState(false);

    const getAllUsers = () => {
        try {
            setIsLoading(true);
            UsersService.getUsers().then((result) => setUsers(result.data));
        } catch (e: any) {
            setError(e.message);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (confirmed) {
            UsersService.deleteUser(itemForDelete).then(() => {
                getAllUsers();
            });
        } else {
            getAllUsers();
        }
        setConfirmed(false);
    }, [showConformationModal]);

    const handleDelete = (email: string) => {
        setItemForDelete(email);
        setShowConformationModal(true);
    };

    const handleConfirm = async (activationLink: string) => {
        const response = await AuthService.activate(activationLink);
        if (response?.data?.Message) {
            getAllUsers();
        }
    }

    return (
        <div className="workers-container p-2">
            {users.length !== 0 && users.map(user => {
                return <div key={user.email} className="bg-dark text-white workers-box d-flex">
                    <div className="worker-row row"
                         style={{color: userStore.user._id === user._id ? 'wheat' : 'white'}}>
                        <div className="worker-item col-lg-3">{user.name}</div>
                        <div className="worker-item col-lg-3">{user.email}</div>
                        <div
                            className="worker-item worker-role  col-lg-3">{user.roles[0] === 'USER' ? 'РАБОТНИК' : 'АДМИН'}</div>
                        {!(userStore.user._id === user._id) ?
                            <button className={"workers__delete-button col-lg-3"}
                                    onClick={() => handleDelete(user.email)}>
                                Удалить
                            </button> :
                            <div style={{width: '140px'}}></div>}
                        {width < 1000 && !user.isActivated &&
                            <button className={"workers__confirm-button p-0 m-0"}
                                    onClick={() => handleConfirm(user.activationLink)}>
                                Подтвердить
                            </button>}
                    </div>
                    {!user.isActivated && width >= 1000 &&
                        <button className={"workers__confirm-button"}
                                onClick={() => handleConfirm(user.activationLink)}>
                            Подтвердить
                        </button>}
                </div>;
            })}
            <ConformationModal show={showConformationModal}
                               setShow={setShowConformationModal}
                               setConfirmed={setConfirmed}
                               confirmed={confirmed}/>
        </div>
    );
};

export default observer(Workers);