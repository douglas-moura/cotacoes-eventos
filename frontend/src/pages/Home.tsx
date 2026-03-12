import React from 'react'
import { useEffect, useState } from 'react'
import { User } from '../types/interface'
import { verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'

export default function Home({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])
    
    return (
        <main className={['pagina', menuStatus ? 'w-[82%]' : 'w-[97%]'].join(' ')}>
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