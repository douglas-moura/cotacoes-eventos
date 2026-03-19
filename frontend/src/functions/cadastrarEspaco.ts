import { Espaco } from "../types/interface"
import { cadastrarEndereco } from "./cadastrarEndereco"
import { cadastrarInfraestruturas } from "./cadastrarInfraestruturas"

export const cadastrarEspaco = async (novoEspaco: Espaco): Promise<boolean> => {
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
            let resultEndereco: boolean = false
            let resultInfraestruturas: boolean = false          

            resultEndereco = await cadastrarEndereco(espacoId, novoEspaco.endereco)

            if (novoEspaco.infraestrutura && novoEspaco.infraestrutura.length > 0) {   
                let count: number = 0   
                for(const infraId of novoEspaco.infraestrutura) {
                    let result = await cadastrarInfraestruturas(espacoId, infraId)
                    !result ? count++ : null
                }
                resultInfraestruturas = count == 0 ? true : false
            }
            status = resultEndereco && resultInfraestruturas
        }
    } catch (erro) {
        status = false
    }

    return status
}