import { Espaco } from "../types/interface"
import { cadastrarEndereco } from "./cadastrarEndereco"
import { cadastrarInfraestruturas } from "./cadastrarInfraestruturas"

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
                descricao: novoEspaco.descricao,
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
            await cadastrarEndereco(espacoId, novoEspaco.endereco)
            if (novoEspaco.infraestrutura && novoEspaco.infraestrutura.length > 0) {                
                for(const infraId of novoEspaco.infraestrutura) {
                    await cadastrarInfraestruturas(espacoId, infraId)
                }
            }
        }
    } catch (erro) {
        status = false
    }
}