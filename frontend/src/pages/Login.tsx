import { useEffect, useState } from 'react'
import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import './Login.css'

export default function Login(): React.JSX.Element {
    return (
        <main className="pagina">
            <section className='sessao-login'>
                <div className="container container-login">
                    <div className='coluna coluna-formulario'>
                        <h2>Login</h2>
                        <LoginForm />
                        <p className='w-full text-center mt-8 text-sm'>Não tem uma conta? <a className='link' href="/cadastro">Cadastre-se aqui.</a></p>
                    </div>
                    <div className='coluna bg-[url("./assets/img/jantar-no-jardim.jpg")] bg-cover bg-center'></div>
                </div>
            </section>
        </main>
    )
}