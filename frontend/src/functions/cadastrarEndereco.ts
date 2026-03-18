import { Endereco } from "../types/interface"

export const cadastrarEndereco = async (espacoID: number, novoEndereco: Endereco) => {
    let status: boolean = false
    const token = sessionStorage.getItem('token')

    try {
        const response = await fetch('http://localhost:3000/enderecos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                rua: novoEndereco.rua,
                numero: novoEndereco.numero,
                complemento: novoEndereco.complemento,
                referencia: novoEndereco.referencia,
                bairro: novoEndereco.bairro,
                cidade: novoEndereco.cidade,
                uf: novoEndereco.uf,
                cep: novoEndereco.cep,
                espaco_id: espacoID
            })
        })
    
        if (response.ok) {
            status = true
        }
    } catch (erro) {
        console.error("Erro ao cadastrar endereço", erro)
        status = false
    }
}