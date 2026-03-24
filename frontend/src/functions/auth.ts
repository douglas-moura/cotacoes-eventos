import { useContext } from "react"
import { Context } from "../context/AppContext"

export function verificarLogin() {
    const token = sessionStorage.getItem("token")
    return !!token
}

export function useAuth() {
    const context = useContext(Context)

    if (!context) {
        throw new Error("useAuth deve ser usado dentro do AuthProvider")
    }

    const { user, setUser } = context

    return user
}