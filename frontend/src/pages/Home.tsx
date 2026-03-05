import { useEffect, useState } from 'react'
import { User } from '../types/interface'

export default function Home() {
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
            {users.map(user => (
                <div key={user.id}>
                    {user.email}
                </div>
            ))}
        </div>
    )
}