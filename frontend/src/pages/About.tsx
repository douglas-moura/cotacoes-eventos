import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { verificarLogin } from '../functions/auth'

export default function About({ menuStatus }: {menuStatus: boolean}): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (!verificarLogin()) navigate('/login') }, [])

    return (
        <main className={['pagina', menuStatus ? 'w-[82%]' : 'w-[97%]'].join(' ')}>
            <section>
                <div className="container">
                    <div className="coluna">
                        <h1>Sobre</h1>
                    </div>
                </div>
            </section>
        </main>
    )
}