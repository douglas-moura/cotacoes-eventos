import React, { useEffect, useState } from "react"
import { atualizarSenha } from "../functions/atualizarSenha"
import { useNavigate } from "react-router"
import NovaSenhaForm from "../components/ResetarSenha/NovaSenhaForm"
import EnviarCodigoForm from "../components/ResetarSenha/EnviarCodigoForm"
import './ResetarSenha.css'

export default function resetarSenha(): React.JSX.Element {
    const [userEmail, setUserEmail] = useState<string>('')
    const [userNovaSenha, setUserNovaSenha] = useState<string>('')
    const [statusAtualizacao, setStatusAtualizacao] = useState<boolean>(false)
    let navigate = useNavigate()

    useEffect(() => {
        if (userEmail.length > 0 && userNovaSenha.length > 0) atualizar()
    }, [userNovaSenha])
    
    const receberEmail = (dado: string) => setUserEmail(dado)
    const receberSenha = (dado: string) => setUserNovaSenha(dado)
    const atualizar = async () => {
        const resultado = await atualizarSenha(userEmail, userNovaSenha)
        setStatusAtualizacao(resultado)
        
        if (resultado) {
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
    }
    
    return (
        <main className="pagina">
            <section className="sessao-resetar-senha">
                <div className="container container-resetar-senha">
                    { userEmail.length == 0 ? <EnviarCodigoForm enviarEmail={receberEmail} /> : <NovaSenhaForm status={statusAtualizacao} enviarSenha={receberSenha} /> }
                </div>
            </section>
        </main>
    )
}