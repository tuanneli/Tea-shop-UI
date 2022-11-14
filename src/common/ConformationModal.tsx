import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import {ICategory} from "../types/goodsTypes";

interface IConformationModal {
    show: boolean,
    setShow: (bool: boolean) => void,
    confirmed: boolean,
    setConfirmed: (bool: boolean) => void,
}

const ConformationModal = ({show, setShow, confirmed, setConfirmed}: IConformationModal) => {
    const handleClose = () => {
        setShow(false);
        setConfirmed(false);
    }

    const handleConfirm = () => {
        setShow(false);
        setConfirmed(true);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-danger'>Удаление</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Подтвердить?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="no-button" style={{width: "80px"}} variant="outline-primary"
                            onClick={handleClose}>
                        Нет
                    </Button>
                    <Button className="yes-button" style={{width: "80px"}} variant="outline-danger"
                            onClick={handleConfirm}>Да</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConformationModal;