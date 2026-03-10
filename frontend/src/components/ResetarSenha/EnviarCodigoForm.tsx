import React, {useState, useEffect} from "react"
import Input from "../Input/Input"
import Botao from "../Botao/Botao"
import validate from "../../functions/validate"

export default function EnviarCodigoForm(): React.JSX.Element {
    const [email, setEmail] = useState<string>('')
    const [emailValido, setEmailValido] = useState<boolean>(false)

    useEffect(() => {
        // regex de email e senha para cada alteração nos valores
        setEmailValido(validate({ tipo: 'email', valor: email }))
    }, [email])

    return (
        <form id='nova-senha-form' className="my-auto" onSubmit={(e) => {
            e.preventDefault()
            //cadastrar()
        }}>
            <h3>E-mail</h3>
            <Input
                InputType="email"
                inputLabel="Email"
                value={email}
                status={emailValido || email.length == 0 ? true : false}
                onChange={(value) => setEmail(value)}
            />
            <Botao
                texto="Resetar"
                tipo="primario"
            />
        </form>
    )
}