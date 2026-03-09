export const checarCredenciais = async ({email, senha}: {email: string, senha: string}): Promise<boolean> => {
    let status: boolean = false

    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()

        data.map((user: { email: string, senha: string }) => {
            if (user.email === email && user.senha === senha) {
                status = true
            }
        })
    } catch (error) {
        console.error('Erro ao realizar login:', error)
        status = false
    }

    return status
}