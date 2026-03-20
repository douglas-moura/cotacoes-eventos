import { Endereco } from "../types/interface"

export const getEndereco = async (espacoId: number): Promise<Endereco> => {
    let endereco: Endereco = ({
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
    })

    try {
        const response = await fetch(`http://localhost:3000/enderecos/espaco/${espacoId}`)
        
        if (response.ok) {
            const data = await response.json()
            endereco = data
        }
    } catch (e) {
        console.error(e)
    }

    return endereco
}