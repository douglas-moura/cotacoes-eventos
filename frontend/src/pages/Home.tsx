import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useAuth, verificarLogin } from '../functions/auth'
import { useNavigate } from 'react-router'

export default function Home({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])
    
    const user = useAuth()
    if (!user) return <></>

    return (
        <main className={['pagina', menuStatus ? 'w-[82%]' : 'w-[95%]'].join(' ')}>
            <section>
                <div className="container">
                    <div className="coluna">
                        <h1>Bem vindo, {user.nome}</h1>
                    </div>
                </div>
            </section>
        </main>
    )
}