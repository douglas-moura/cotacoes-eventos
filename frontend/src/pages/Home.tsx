import React from 'react'
import { useEffect, useState } from 'react'
import { User } from '../types/interface'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'

export default function Home(): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])
    
    return (
        <main className="pagina">
            <section>
                <div className="container">
                    <div className="coluna">
                        <h1>Home</h1>
                    </div>
                </div>
            </section>
        </main>
    )
}