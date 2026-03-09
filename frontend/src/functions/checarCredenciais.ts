export const checarCredenciais = async ({action, email, senha}: {action: string, email: string, senha?: string}): Promise<boolean> => {
    let result: number = 0

    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()

        data.map((user: { email: string, senha: string }) => {
            if (action == 'login') {
                if (user.email === email && user.senha === senha) {
                    result++
                }
            } else {
                if (user.email === email) {
                    result++
                }
            }
        })
    } catch (error) {
        console.error('Erro ao realizar login:', error)
    }

    return result == 1 ? true : false
}