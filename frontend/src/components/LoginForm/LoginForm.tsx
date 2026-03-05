import React from 'react'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import './LoginForm.css'

export default function LoginForm(): React.JSX.Element {
    return (
        <form className="w-full">
            <Input InputType="email" inputLabel="Email" />
            <Input InputType="password-login" inputLabel="Senha" placeholder='********' />
            <Botao texto="Entrar" tipo='primario' />
        </form>
    )
}