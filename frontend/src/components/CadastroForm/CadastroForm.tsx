import React from 'react'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import './CadastroForm.css'

export default function CadastroForm(): React.JSX.Element {
    return (
        <form id='cadastro-form'>
            <Input InputType="text" inputLabel="Nome Completo" placeholder="Digite seu nome completo" />
            <Input InputType="email" inputLabel="Email" />
            {/* <Input InputType="lista" inputLabel="Gênero" opcoes={['Masculino', 'Feminino', 'Não informar', 'Outro']} /> */}
            <div className='grid grid-cols-2 gap-4'>
                <Input InputType="password-cadastro" inputLabel="Senha" placeholder='********' />
                <Input InputType="password-cadastro" inputLabel="Confirme sua senha" placeholder='********' />
            </div>
            <div className="aceitar-lgpd">
                <input type="checkbox" className="mr-2" />
                Aceito os termos da LGPD
            </div>
            <Botao texto="Cadastrar" tipo='primario' />
        </form>
    )
}