import React from 'react';

function Error({ message }) {

    return (
        <div>
            <h2>Error while fetching the data</h2>
            <p>{message}</p>
        </div>
    );
}

export default Error;
