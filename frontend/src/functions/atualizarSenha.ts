export const atualizarSenha = async (e: string, s: string): Promise<boolean> => {
    let status: boolean = false

    try {
        const response = await fetch(`http://localhost:3000/users/${e}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({senha: s})
        })

        if (response.ok) {
            status = true
        }
    } catch (erro) {
        console.error(erro)
    }    

    return status
}