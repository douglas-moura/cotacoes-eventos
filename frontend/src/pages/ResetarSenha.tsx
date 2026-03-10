import React, { useState } from "react"
import NovaSenhaForm from "../components/ResetarSenha/NovaSenhaForm"
import './ResetarSenha.css'
import EnviarCodigoForm from "../components/ResetarSenha/EnviarCodigoForm"

export default function resetarSenha(): React.JSX.Element {
    const [userEmail, setUserEmail] = useState<string>('')
    
    return (
        <main className="pagina">
            <section className="sessao-resetar-senha">
                <div className="container container-resetar-senha">
                    { userEmail.length == 0 ? <EnviarCodigoForm /> : <NovaSenhaForm /> }
                </div>
            </section>
        </main>
    )
}