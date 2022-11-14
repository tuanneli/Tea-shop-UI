import React, {Dispatch, memo, SetStateAction, useContext} from 'react';
import {ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Context} from "../../../../index";

interface IProps {
    phone: string,
    setPhone: Dispatch<SetStateAction<string>>
    autoCompleteActive: boolean,
    setAutocompleteActive: Dispatch<SetStateAction<boolean>>
}

const Autocomplete = memo(({phone, setPhone, autoCompleteActive, setAutocompleteActive}: IProps) => {

    const navigate = useNavigate();
    const {customerStore} = useContext(Context);

    function createPhoneNumber(numbers: string) {
        return numbers.substring(0, 2) + ' ' + numbers.substring(2, 5) + ' '
            + numbers.substring(5, 8)
            + ' '
            + numbers.substring(8);
    }

    const phoneNumbers = customerStore.customers.map((customer) => {
        return customer.phone
    })

    const filterPhoneNumbers = phoneNumbers.filter((phoneNumber) => {
        return phoneNumber.includes(phone);
    })

    const handleClickOnAutocomplete = (phoneNumber: string) => {
        setPhone(phoneNumber);
        setAutocompleteActive(false);
    };

    const handleEnterOnAutocomplete = async (event: React.KeyboardEvent<HTMLElement>, phoneNumber: string) => {
        if (event.key === "Enter") {
            await setPhone(phoneNumber);
            setAutocompleteActive(false);
            const customer = await customerStore.getCustomer(phoneNumber);
            if (customer) {
                navigate('/customer');
            }
        }
    };

    return (
        <ListGroup className={'autocomplete'}>
            {phone && autoCompleteActive
                ?
                filterPhoneNumbers.map((phoneNumber) => {
                    return <ListGroup.Item key={phoneNumber}
                                           type={"submit"}
                                           tabIndex={0}
                                           onKeyDown={(event) => handleEnterOnAutocomplete(event, phoneNumber)}
                                           onClick={() => handleClickOnAutocomplete(phoneNumber)}
                                           className="autocomplete__item">{createPhoneNumber(phoneNumber)}</ListGroup.Item>
                })
                :
                null}
        </ListGroup>
    );
});

export default Autocomplete;