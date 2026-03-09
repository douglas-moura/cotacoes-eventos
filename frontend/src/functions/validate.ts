export default function validarCamposInputs({tipo, valor}: {tipo: string, valor: string | number}): boolean {
    const status = false

    switch (tipo) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(valor as string)
        case 'senha':
            const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            return senhaRegex.test(valor as string)
        default:
            return status
    }
}