import React, {useState, useEffect} from "react"
import Input from "../Input/Input"
import Botao from "../Botao/Botao"
import validate from "../../functions/validate"

type Props = {
    enviarEmail: (valor: string) => void
}

export default function EnviarCodigoForm({ enviarEmail }: Props): React.JSX.Element {
    const [email, setEmail] = useState<string>('')
    const [emailValido, setEmailValido] = useState<boolean>(false)

    useEffect(() => {
        // regex de email e senha para cada alteração nos valores
        setEmailValido(validate({ tipo: 'email', valor: email }))
    }, [email])

    const mandarEmailCompPai = () => {
        enviarEmail(email)
    }

    return (
        <form id='nova-senha-form' className="my-auto" onSubmit={(e) => {
            e.preventDefault()
            mandarEmailCompPai()
        }}>
            <h3 className="font-bold">E-mail de Recuperação</h3>
            <Input
                inputType="email"
                inputLabel="Insira seu e-mail"
                value={email}
                status={emailValido || email.length == 0 ? true : false}
                onChange={(value) => setEmail(value)}
            />
            <Botao
                texto="Enviar código"
                tipo={emailValido ? 'primario' : 'block'}
            />
            <span className="mt-6 border border-neutral-400 p-6">
                <p className="text-xs text-neutral-400"><strong>⚠️ Aviso:</strong> O envio e a verificação de código ainda não foram implementados. Este formulário está presente apenas para representar essa etapa do processo.</p>
            </span>
        </form>
    )
}