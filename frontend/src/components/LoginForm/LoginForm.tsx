import React, { useState } from 'react'
import { useNavigate  } from 'react-router'
import { checarCredenciais } from '../../functions/checarCredenciais'
import { registrarAcesso } from '../../functions/registrarAcesso'
import { NovoAcesso } from '../../types/interface'
import BoxMensagem from '../BoxMensagem/BoxMensagem'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import './LoginForm.css'

export default function LoginForm(): React.JSX.Element {
    // dados do form de login
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    // status da tentativa de login
    const [statusLogin, setStatusLogin] = useState<boolean>(true)
    // navigate do router
    let navigate = useNavigate()

    const logar = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ email, senha })
            })

            if (response.ok) {
                setStatusLogin(true)
        
                setTimeout(() => {
                    registrarAcesso(email)
                    setEmail('')
                    setSenha('')
                    navigate("/")
                }, 1000)
            } else {
                setStatusLogin(false)
            }
        } catch (erro) {

        }
    }

    return (
        <form id='login-form' className='w-full' onSubmit={(e) => {
            e.preventDefault()
            logar()
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