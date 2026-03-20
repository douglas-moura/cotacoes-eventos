import { Espaco } from "../types/interface"

export const getEspaco = async (espacoId: number): Promise<Espaco> => {
    let espaco: Espaco = ({
        id: 0,
        nome: '',
        descricao: '',
        
        area: 0,
        capacidade: 0,
        ambientes: 0,
        quantidadeBanheiros: 0,

        endereco: {
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',
            cep: '',
        },

        infraestruturas: [],

        proprietarioID: 0,

        ativo: true,
        visivel: true
    })

    try {
        const response = await fetch(`http://localhost:3000/espacos/${espacoId}`)
        
        if (response.ok) {
            const data = await response.json()
            espaco = data
        }
    } catch (e) {
        console.error(e)
    }

    return espaco
}