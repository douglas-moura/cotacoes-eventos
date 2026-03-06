import React from 'react'
import { useEffect, useState } from 'react'
import { User } from '../types/interface'

export default function Home(): React.JSX.Element {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Home
            </h1>
            {users.map((user, index) => (
                <div key={index}>
                    {user.email}
                </div>
            ))}
        </div>
    )
}