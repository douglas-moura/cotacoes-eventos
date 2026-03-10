import React, {useState, useEffect} from "react"
import Input from "../Input/Input"
import Botao from "../Botao/Botao"
import validate from "../../functions/validate"

export default function NovaSenhaForm(): React.JSX.Element {
    const [senhaValida, setSenhaValida] = useState<boolean>(false)
    const [novaSenha, setNovaSenha] = useState<string>('')
    const [campoConfirmSenha, setCampoConfirmSenha] = useState<string>('')
    
    useEffect(() => {
        // regex de senha para cada alteração nos valores
        setSenhaValida(validate({ tipo: 'senha', valor: novaSenha }))
    }, [novaSenha, campoConfirmSenha])

    return (
        <form id='nova-senha-form' onSubmit={(e) => {
            e.preventDefault()
            //cadastrar()
        }}>
            <h3>Definir nova senha</h3>
            <Input
                InputType="password-cadastro"
                inputLabel="Nova Senha"
                value={novaSenha}
                status={senhaValida || novaSenha.length == 0 ? true : false}
                onChange={(value) => setNovaSenha(value)}
            />
            <Input
                InputType="password-cadastro"
                inputLabel="Confirmar Nova Senha"
                value={campoConfirmSenha}
                // true significa que a msg some, false que aparece
                status={campoConfirmSenha == novaSenha ? true : false}
                onChange={(value) => setCampoConfirmSenha(value)}
            />
            <Botao
                texto="Resetar Senha"
                tipo="primario"
            />
        </form>
    )
}