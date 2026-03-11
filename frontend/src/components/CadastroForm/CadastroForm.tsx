import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { cadastrarUser } from '../../functions/cadastrarUser'
import { checarCredenciais } from '../../functions/checarCredenciais'
import { User } from '../../types/interface'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import validate from '../../functions/validate'
import BoxMensagem from '../BoxMensagem/BoxMensagem'
import './CadastroForm.css'

export default function CadastroForm(): React.JSX.Element {
    // dados que vem do formulário
    const [formData, setFormData] = useState<User>({nome: '', email: '', senha: ''})
    // variáveis para validar email e senha
    const [emailValido, setEmailValido] = useState<boolean>(false)
    const [senhaValida, setSenhaValida] = useState<boolean>(false)
    const [campoConfirmSenha, setCampoConfirmSenha] = useState<string>('')
    // variavel para checar autorização LGPD e liberar botão cadastro
    const [autorizadoLGPD, setAutorizadoLGPD] = useState<boolean>(false)
    // variaveis auxiliares do UX
    const [primeiraTentativa, setPrimeiraTentativa] = useState<boolean>(false)
    const [statusCadastro, setStatusCadastro] = useState<boolean>(false)
    const [msgBox, setMsgBox] = useState<string[]>(['', ''])
    
    const navigate = useNavigate()

    useEffect(() => {
        // regex de email e senha para cada alteração nos valores
        setEmailValido(validate({ tipo: 'email', valor: formData.email }))
        setSenhaValida(validate({ tipo: 'senha', valor: formData.senha }))
    }, [formData.email, formData.senha, campoConfirmSenha, primeiraTentativa])

    const cadastrar = async () => {
        // FRONTEND - se todos os campos do form estiverem preenchimedos adequadamente
        if (emailValido && senhaValida && autorizadoLGPD && formData.nome.length > 0 && campoConfirmSenha == formData.senha) {
            // BACKEND - checa se o e-mail retornar algo do banco (se o e-mail já esta cadastrado)            
            if (await checarCredenciais(formData.email)) {
                setMsgBox(['erro', 'E-mail já cadastrado'])
            } else {
                // BACKEND - faz a requisição post para criar o user
                if (await cadastrarUser(formData)) {
                    setMsgBox(['sucesso', 'Cadastro realizado com sucesso!'])
                    setStatusCadastro(true)
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setMsgBox(['erro', 'Não foi possível realizar o cadastrado'])
                    setStatusCadastro(false)
                }
            }
            setPrimeiraTentativa(true)
        } else {
            // msg para preencher campos adequadamente além do validate
            if (formData.email.length == 0) setEmailValido(true)
            if (formData.senha != campoConfirmSenha) setSenhaValida(true)
            setMsgBox(['alerta', 'Preencha os campos corretamente'])
            setPrimeiraTentativa(true)
        }
    }

    return (
        <form id='cadastro-form' onSubmit={(e) => {
            e.preventDefault()
            cadastrar()
        }}>
            {
                primeiraTentativa ?
                <BoxMensagem
                    tipo={msgBox[0]}
                    msg={msgBox[1]}
                />
                : null
            }
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
                <input type="checkbox" className="mr-2" onChange={(e) => setAutorizadoLGPD(e.target.checked)} />
                <p>Li e aceito os <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="link">Termos de Uso</a> e a <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="link">Política de Privacidade</a></p>
            </div>
            <Botao texto="Cadastrar" tipo={autorizadoLGPD ? 'primario' : 'block'} />
        </form>
    )
}