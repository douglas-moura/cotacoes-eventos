import React from 'react'
import Input from '../Input/Input'
import './LoginForm.css'
import Botao from '../Botao/Botao'

export default function LoginForm(): React.JSX.Element {
    return (
        <form className="w-full">
            <Input InputType="email" inputLabel="Email" />
            <Input InputType="password" inputLabel="Senha" />
            <Botao texto="Entrar" tipo='primario' />
        </form>
    )
}