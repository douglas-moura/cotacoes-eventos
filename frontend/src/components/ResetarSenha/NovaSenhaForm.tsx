import React, {useState, useEffect} from "react"
import Input from "../Input/Input"
import Botao from "../Botao/Botao"
import validate from "../../functions/validate"
import BoxMensagem from "../BoxMensagem/BoxMensagem"

type Props = {
    status: boolean,
    enviarSenha: (valor: string) => void
}

export default function NovaSenhaForm({ status, enviarSenha }: Props): React.JSX.Element {
    const [novaSenha, setNovaSenha] = useState<string>('')
    const [campoConfirmSenha, setCampoConfirmSenha] = useState<string>('')
    const [senhaValida, setSenhaValida] = useState<boolean>(false)
    const [msgBox, setMsgBox] = useState<string[]>(['', ''])
    const [tentativaRealizada, setTentativaRealizada] = useState<boolean>(false)
    
    useEffect(() => {
        // regex de senha para cada alteração nos valores
        setSenhaValida(validate({ tipo: 'senha', valor: novaSenha }))
        if (status) {
            setMsgBox(['sucesso', 'Senha atualizada com sucesso'])
        } else {
            setMsgBox(['erro', 'Não foi possivel atualizar senha'])
        }
    }, [novaSenha, campoConfirmSenha, status])

    const mandarSenhaCompPai = () => {
        if (novaSenha === campoConfirmSenha) {
            enviarSenha(novaSenha)
            setTimeout(() => {
                setTentativaRealizada(true)
            }, 1000)
        }
    }

    return (
        <form id='nova-senha-form' onSubmit={(e) => {
            e.preventDefault()
            mandarSenhaCompPai()
        }}>
            <h3>Definir nova senha</h3>
            { msgBox[0].length > 0 && tentativaRealizada ? <BoxMensagem tipo={msgBox[0]} msg={msgBox[1]} /> : null }
            <Input
                inputType="password-cadastro"
                inputLabel="Nova Senha"
                value={novaSenha}
                status={senhaValida || novaSenha.length == 0 ? true : false}
                onChange={(value) => setNovaSenha(value)}
            />
            <Input
                inputType="password-cadastro"
                inputLabel="Confirmar Nova Senha"
                value={campoConfirmSenha}
                // true significa que a msg some, false que aparece
                status={campoConfirmSenha == novaSenha ? true : false}
                onChange={(value) => setCampoConfirmSenha(value)}
            />
            <Botao
                texto="Resetar Senha"
                tipo={senhaValida && novaSenha === campoConfirmSenha ? 'primario' : 'block'}
            />
        </form>
    )
}