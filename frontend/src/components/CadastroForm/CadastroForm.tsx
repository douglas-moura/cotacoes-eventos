import React from 'react'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import { useState } from 'react'
import { User } from '../../types/interface'
import './CadastroForm.css'

export default function CadastroForm(): React.JSX.Element {
    const [formData, setFormData] = useState<User>({
        nome: '',
        email: '',
        idade: 0,
        senha: ''
    })

    const cadastrarUsuario = async () => {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Usuário cadastrado com sucesso:', data)
            } else {
                console.error('Erro ao cadastrar usuário:', response.statusText)
            }
        } catch (error) {
            console.error('Erro ao realizar cadastro:', error)
        }
    }

    return (
        <form id='cadastro-form'>
            <Input
                InputType="text"
                inputLabel="Nome Completo"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={(value) => setFormData({ ...formData, nome: value })}
            />
            <Input
                InputType="email"
                inputLabel="Email"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
            />
            <div className='grid grid-cols-2 gap-4'>
                <Input
                    InputType="password-cadastro"
                    inputLabel="Senha"
                    placeholder='********'
                    value={formData.senha}
                    onChange={(value) => setFormData({ ...formData, senha: value })}
                />
                <Input
                    InputType="password-cadastro"
                    inputLabel="Confirme sua senha"
                    placeholder='********'
                />
            </div>
            <div className="aceitar-lgpd">
                <input type="checkbox" className="mr-2" />
                Aceito os termos da LGPD
            </div>
            <Botao texto="Cadastrar" tipo='primario' onClick={cadastrarUsuario} />
        </form>
    )
}