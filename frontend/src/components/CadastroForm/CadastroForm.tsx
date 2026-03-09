import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { cadastrarUser } from '../../functions/cadastrarUser'
import { checarCredenciais } from '../../functions/checarCredenciais'
import { User } from '../../types/interface'
import Input from '../Input/Input'
import Botao from '../Botao/Botao'
import validarCamposInputs from '../../functions/validate'
import BoxMensagem from '../BoxMensagem/BoxMensagem'
import './CadastroForm.css'

export default function CadastroForm(): React.JSX.Element {
    const [formData, setFormData] = useState<User>({nome: '', email: '', senha: ''})
    const [emailValido, setEmailValido] = useState<boolean>(false)
    const [senhaValida, setSenhaValida] = useState<boolean>(false)
    const [campoConfirmSenha, setCampoConfirmSenha] = useState<string>('')
    const [autorizadoLGPD, setAutorizadoLGPD] = useState<boolean>(false)

    const [primeiraTentativa, setPrimeiraTentativa] = useState<boolean>(false)
    const [statusCadastro, setStatusCadastro] = useState<boolean>(false)
    const [msgBox, setMsgBox] = useState<string>('')
    
    const navigate = useNavigate()

    useEffect(() => {
        setEmailValido(validarCamposInputs({ tipo: 'email', valor: formData.email }))
        setSenhaValida(validarCamposInputs({ tipo: 'senha', valor: formData.senha }))
    }, [formData.email, formData.senha, campoConfirmSenha, primeiraTentativa])

    const cadastrar = async () => {
        if (emailValido && senhaValida && autorizadoLGPD && formData.nome.length > 0 && campoConfirmSenha == formData.senha) {
            if(await checarCredenciais({ action: 'cadastro', email: formData.email }) == 0) {
                await cadastrarUser({dadosFormulario: formData})
                setStatusCadastro(true)
                setMsgBox('Cadastro realizado com sucesso!')
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } else {
                setStatusCadastro(false)
                setMsgBox('E-mail já cadastrado')
            }
            setPrimeiraTentativa(true)
        } else {
            // será pop-up futuramente
            if (formData.email.length == 0) setEmailValido(true)
            if (formData.senha != campoConfirmSenha) setSenhaValida(true)
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
                    tipo={statusCadastro ? 'sucesso' : 'erro'}
                    msg={msgBox}
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