import React from 'react';

interface IError {
    error: string
}

const Error = ({error}: IError) => {
    return (
        <div className="text-danger">
            {error}
        </div>
    );
};

export default Error;