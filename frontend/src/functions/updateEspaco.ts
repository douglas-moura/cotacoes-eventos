import { Espaco } from "../types/interface"

export const updateEspaco = async (espacoId: number, acao: string, novasInfos?: Espaco): Promise<boolean> => {
    let status: boolean = false
    const token = sessionStorage.getItem('token')
    let data: any = {}

    switch (acao) {
        case 'atualizar': 
            if (novasInfos) {
                const { id, proprietarioID, endereco, infraestruturas, ...caracteristicas } = novasInfos
                data = {
                    caracteristicas: {
                        nome: novasInfos.nome,
                        descricao: novasInfos.descricao,
                        area: novasInfos.area,
                        ambientes: novasInfos.ambientes,
                        capacidade: novasInfos.capacidade,
                        quantidadeBanheiros: novasInfos.quantidadeBanheiros
                    },
                    endereco: {
                        rua: novasInfos.endereco.rua,
                        numero: novasInfos.endereco.numero,
                        complemento: novasInfos.endereco.complemento,
                        referencia: novasInfos.endereco.referencia,
                        bairro: novasInfos.endereco.bairro,
                        cidade: novasInfos.endereco.cidade,
                        uf: novasInfos.endereco.uf,
                        cep: novasInfos.endereco.cep
                    },
                    infraestruturas: novasInfos.infraestruturas
                }
            }
            break
        case 'apagar':
            data = {
                ativo: false,
                visivel: false
            }
            break
        case 'ocultar':
            data = {
                visivel: false
            }
            break
        case 'exibir':
            data = {
                visivel: true
            }
            break
        default:
            data = {}
    }

    if (novasInfos && acao == 'atualizar') {
        try {
            const responseCarac = await fetch(`http://localhost:3000/espacos/${espacoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data.caracteristicas)
            })

            const responseEndereco = await fetch(`http://localhost:3000/enderecos/${espacoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data.endereco)
            })
            
            if (responseCarac.ok && responseEndereco.ok) {
                status = true
            }
        } catch (e) {    
            status = false
        }
    } else {
        try {
            const response = await fetch(`http://localhost:3000/espacos/${espacoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            
            if (response.ok) {
                status = true
            }
        } catch (e) {    
            status = false
        }
    }

    return status
}