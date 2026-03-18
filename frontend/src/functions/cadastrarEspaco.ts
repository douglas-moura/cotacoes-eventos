import { Endereco, Espaco, UserLogado } from "../types/interface"
import { cadastrarEndereco } from "./cadastrarEndereco"

export const cadastrarEspaco = async (novoEspaco: Espaco) => {
    let status: boolean = false
    const token = sessionStorage.getItem('token')

    try {
        const response = await fetch('http://localhost:3000/espacos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome: novoEspaco.nome,
                proprietario_id: novoEspaco.proprietarioID,
                area: novoEspaco.area,
                capacidade: novoEspaco.capacidade,
                ambientes: novoEspaco.ambientes,
                quantidadeBanheiros: novoEspaco.quantidadeBanheiros,
                ativo: novoEspaco.ativo
            })
        })

        const data = await response.json()
        const espacoId = data.id
    
        if (response.ok) {
            status = true
            cadastrarEndereco(espacoId, novoEspaco.endereco)
        }
    } catch (erro) {
        console.error("Erro ao cadastrar espaço", erro)
        status = false
    }
}