import React from 'react';
import UserCard from '../../components/userCard';
import Link from 'next/link';

const UserPage = async() => {

    const res = await fetch ('http://localhost:3001/users')

   const data = await res.json()

   console.log(data)
    return (
        <div>

            <Link href={'/add'}>Add user</Link>


            <p>Total users : {data.length}</p>

            <div className='grid grid-cols-3 gap-3 my-10'>
                {
                    data.map(user => <UserCard key={user._id} user={user}></UserCard>)
                }
            </div>
            
        </div>
    );
};

export default UserPage;