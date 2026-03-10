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
    // variavel para mensagens
    const [msgBox, setMsgBox] = useState<string[]>(['', ''])
    // navigate do router
    let navigate = useNavigate()

    const logar = async (): Promise<void> => {
        if (email.length > 0 || senha.length > 0) {
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha })
                })
    
                if (response.ok) {
                    const data = await response.json()

                    setTimeout(() => {
                        registrarAcesso(data.userId)
                        setEmail('')
                        setSenha('')
                        navigate("/")
                    }, 1000)
                } else {
                    setMsgBox(['erro', 'E-mail ou senha incorretos'])
                    setEmail('')
                    setSenha('')
                }
            } catch (erro) {
                setMsgBox(['alerta', 'Erro ao logar, tente novamente mais tarde'])
            }
        } else {
            setMsgBox(['erro', 'Preencha os campos corretamente'])
        }
    }

    return (
        <form id='login-form' className='w-full' onSubmit={(e) => {
            e.preventDefault()
            logar()
        }}>
            { msgBox[1].length > 0 ? <BoxMensagem tipo={msgBox[0]} msg={msgBox[1]} /> : null }
            <Input
                InputType="email"
                inputLabel="Email"
                value={email}
                onChange={(value) => {
                    setEmail(value)
                    setMsgBox(['',''])
                }}
            />
            <Input
                InputType="password-login"
                inputLabel="Senha"
                placeholder='********'
                value={senha}
                onChange={(value) => {
                    setSenha(value)
                    setMsgBox(['',''])
                }}
            />
            <Botao texto="Entrar" tipo='primario' />
        </form>
    )
}