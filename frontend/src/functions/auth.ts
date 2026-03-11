export function verificarLogin() {
    const token = sessionStorage.getItem("token")

    return !!token
}