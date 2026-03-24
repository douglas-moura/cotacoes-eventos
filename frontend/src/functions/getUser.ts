import { UserLogado } from "../types/interface"
import { jwtDecode } from "jwt-decode"

type Props = {
    setUser: React.Dispatch<React.SetStateAction<UserLogado | null>>
}

export const getUser = ({setUser}: Props): void => {
    const token = sessionStorage.getItem("token")

    if (token) {
        try {
            const decoded = jwtDecode<UserLogado>(token)
            console.log("DECODE", decoded);

            if (!decoded.nome) {
                console.warn("Token sem nome")
            }

            setUser(decoded)
        } catch (err) {
            console.error("Token inválido")
            sessionStorage.removeItem("token")
            setUser(null)
        }
    }
}