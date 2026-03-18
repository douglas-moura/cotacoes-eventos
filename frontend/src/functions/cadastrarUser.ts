import { NovoUser } from "../types/interface"

export const cadastrarUser = async (dadosFormulario: NovoUser): Promise<boolean> => {
    let status: boolean = false

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosFormulario)
        })
    
        if (response.ok) {
            status = true
        }
    } catch (error) {
        status = false
    }

    return status
}