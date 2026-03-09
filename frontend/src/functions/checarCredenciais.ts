export const checarCredenciais = async ({action, email, senha}: {action: string, email: string, senha?: string}): Promise<number> => {
    let result: number = 0

    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()

        data.map((user: { id: number, email: string, senha: string }) => {
            if (action == 'login') {
                if (user.email === email && user.senha === senha) {
                    result = user.id
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

    return (action == 'login' && result > 0) || (action == 'cadastro' && result == 1) ? result : 0
}