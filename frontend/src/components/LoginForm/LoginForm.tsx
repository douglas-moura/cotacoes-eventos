import React, { useEffect, useState } from 'react'
import { redirect, useNavigate  } from 'react-router'
import { checarCredenciais } from '../../functions/checarCredenciais'
import BoxMensagem from '../BoxMensagem/BoxMensagem'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import './LoginForm.css'

export default function LoginForm(): React.JSX.Element {
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [statusLogin, setStatusLogin] = useState<boolean>(true)
    let navigate = useNavigate()

    const logar = async (checagem: Promise<boolean>) => {
        if (await checagem) {
            setStatusLogin(true)
            setTimeout(() => {
                navigate("/")
            }, 1000)
        } else {
            setStatusLogin(false)
        }
    }

    return (
        <form id='login-form' className='w-full' onSubmit={(e) => {
            e.preventDefault()
            setEmail('')
            setSenha('')
            logar(checarCredenciais({ email, senha }))
        }}>
            { !statusLogin && email.length == 0 ? <BoxMensagem tipo="erro" msg="E-mail ou senha incorretos." /> : null }
            <Input
                InputType="email"
                inputLabel="Email"
                value={email}
                onChange={(value) => {
                    setEmail(value)
                    setStatusLogin(true)
                }}
            />
            <Input
                InputType="password-login"
                inputLabel="Senha"
                placeholder='********'
                value={senha}
                onChange={(value) => {
                    setSenha(value)
                    setStatusLogin(true)
                }}
            />
            <Botao texto="Entrar" tipo='primario' />
        </form>
    )
}