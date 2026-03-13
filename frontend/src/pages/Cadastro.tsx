import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { verificarLogin } from '../functions/auth'
import CadastroForm from '../components/CadastroForm/CadastroForm'
import './Cadastro.css'

export default function Cadastro(): React.JSX.Element {
    // validação do token de login
    const navigate = useNavigate()
    useEffect(() => { if (verificarLogin()) navigate('/') }, [])

    return (
        <main>
            <section className="cadastro-form">
                <div className="container">
                    <h1>Criar Conta</h1>
                </div>
                <div className="container grid-cols-2 gap-8">
                    <div className='coluna coluna-cadastro-form'>
                        <CadastroForm />
                        <p className='w-full text-center mt-8 text-sm'>Já tem uma conta? <a className='link' href="/login">Faça login.</a></p>
                    </div>
                </div>
            </section>
            <div className='fixed top-0 -right-24 w-1/2 h-full bg-[url("./assets/img/jantar-no-jardim-dancando.jpg")] bg-cover bg-center'></div>
        </main>
    )
}