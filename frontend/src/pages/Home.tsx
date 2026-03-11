import React from 'react'
import { useEffect, useState } from 'react'
import { User } from '../types/interface'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'

export default function Home(): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])
        
    const [users, setUsers] = useState<User[]>([])
    
    return (
        <div className="p-4">
            <h1>Home</h1>
            {users.map((user, index) => (
                <div key={index}>
                    {/*user.email*/}
                </div>
            ))}
        </div>
    )
}