import React from 'react'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import { useState, useEffect } from 'react'
import { User } from '../../types/interface'
import './CadastroForm.css'
import validarCamposInputs from '../../functions/validarCamposInputs'

export default function CadastroForm(): React.JSX.Element {
    const [formData, setFormData] = useState<User>({
        nome: '',
        email: '',
        idade: 0,
        senha: ''
    })
    const [campoConfirmSenha, setCampoConfirmSenha] = useState<string>('')
    const [autorizado, setAutorizado] = useState<boolean>(false)
    const [emailValido, setEmailValido] = useState<boolean>(false)
    const [senhaValida, setSenhaValida] = useState<boolean>(false)
    const [primeiraTentativa, setPrimeiraTentativa] = useState<boolean>(false)

    useEffect(() => {
        setEmailValido(validarCamposInputs({ tipo: 'email', valor: formData.email }))
        setSenhaValida(validarCamposInputs({ tipo: 'senha', valor: formData.senha }))
    }, [formData.email, formData.senha, campoConfirmSenha, primeiraTentativa])

    const cadastrarUsuario = async () => {
        if (emailValido && senhaValida && autorizado && formData.nome.length > 0 && campoConfirmSenha == formData.senha) {
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
        } else {
            // será pop-up futuramente
            console.log('Preencha todos os campos corretamente antes de cadastrar.')
            setPrimeiraTentativa(true)
            if (formData.email.length == 0) setEmailValido(true)
            if (formData.senha != campoConfirmSenha) setSenhaValida(true)
        }
    }

    return (
        <form id='cadastro-form' onSubmit={(e) => {
            e.preventDefault()
            cadastrarUsuario()
        }}>
            <Input
                InputType="text"
                inputLabel="Nome Completo"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                status={formData.nome.length == 0 && primeiraTentativa == true ? true : false}
                onChange={(value) => setFormData({ ...formData, nome: value })}
            />
            <Input
                InputType="email"
                inputLabel="Email"
                value={formData.email}
                status={emailValido || formData.email.length == 0 ? true : false}
                onChange={(value) => setFormData({ ...formData, email: value })}
            />
            <div className='grid grid-cols-2 gap-4'>
                <Input
                    InputType="password-cadastro"
                    inputLabel="Senha"
                    placeholder='********'
                    value={formData.senha}
                    status={senhaValida || formData.senha.length == 0 ? true : false}
                    onChange={(value) => setFormData({ ...formData, senha: value })}
                />
                <Input
                    InputType="password-cadastro"
                    inputLabel="Confirme sua senha"
                    placeholder='********'
                    // true significa que a msg some, false que aparece
                    status={campoConfirmSenha == formData.senha ? true : false}
                    onChange={(value) => setCampoConfirmSenha(value)}
                />
            </div>
            <div className="aceitar-lgpd">
                <input type="checkbox" className="mr-2" onChange={(e) => setAutorizado(e.target.checked)} />
                <p>Li e aceito os <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="link">Termos de Uso</a> e a <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="link">Política de Privacidade</a></p>
            </div>
            <Botao texto="Cadastrar" tipo='primario' />
        </form>
    )
}