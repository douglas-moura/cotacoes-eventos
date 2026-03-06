import React, { useEffect } from 'react'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import { useState } from 'react'
import './LoginForm.css'
import { set } from 'react-hook-form'

export default function LoginForm(): React.JSX.Element {
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [statusLogin, setStatusLogin] = useState<boolean>(false)

    const logar = async () => {
        try {
            const response = await fetch('http://localhost:3000/users')
            const data = await response.json()
            
            data.map((user: { email: string, senha: string }) => {
                if (user.email === email && user.senha === senha) {
                    console.log('Login bem-sucedido!')
                } else {
                    console.log('Email ou senha incorretos.')
                }
            })
            setStatusLogin(true)
        } catch (error) {
            console.error('Erro ao realizar login:', error)
        }
    }

    useEffect(() => {
        if (statusLogin == true) {
            setEmail('')
            setSenha('')
        }
    }, [statusLogin])

    return (
        <form id='login-form' className='w-full' onSubmit={(e) => {
            e.preventDefault()
            logar()
        }}>
            <Input InputType="email" inputLabel="Email" value={email} onChange={(value) => setEmail(value)} />
            <Input InputType="password-login" inputLabel="Senha" placeholder='********' value={senha} onChange={(value) => setSenha(value)} />
            <Botao texto="Entrar" tipo='primario' />
        </form>
    )
}