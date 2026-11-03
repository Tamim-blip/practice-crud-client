import React from 'react';

const DetilsPage = async({params}) => {

    const {userId} = await params

    const res = await fetch(`http://localhost:3001/users/${userId}`)
    const data = await res.json()
    return (
        <div>
            <p>{userId}</p>

            <div>
                <p>{data.name}</p>
                <p>{data.email}</p>
            </div>
            
        </div>
    );
};

export default DetilsPage;