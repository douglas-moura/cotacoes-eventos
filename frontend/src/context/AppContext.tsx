import { createContext, useEffect, useState } from "react"
import { Espaco, UserLogado } from "../types/interface"
import { getUserEspacos } from "../functions/getUserEspacos"
import { jwtDecode } from "jwt-decode"
import { getUser } from "../functions/getUser"

type ContextType = {
    menuLateralStatus: boolean
    setMenuLateralStatus: React.Dispatch<React.SetStateAction<boolean>>

    meusEspacos: Espaco[]
    setMeusEspacos: React.Dispatch<React.SetStateAction<Espaco[]>>

    reload: number
    reloadApp: () => void

    user: UserLogado | null
    setUser: React.Dispatch<React.SetStateAction<UserLogado | null>>
}

export const Context = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [menuLateralStatus, setMenuLateralStatus] = useState<boolean>(true)
    const [meusEspacos, setMeusEspacos] = useState<Espaco[]>([])
    const [reload, setReload] = useState(0)
    const [user, setUser] = useState<UserLogado | null>(null)
    const token = sessionStorage.getItem("token")

    useEffect(() => {
        fetchData()
    }, [reload])

    useEffect(() => {
        getUser({setUser})
    }, [token])

    const fetchData = async () => {
        const data = await getUserEspacos()
        setMeusEspacos(data)
    }

    const reloadApp = () => setReload((prev) => prev + 1)

    return (
        <Context.Provider value={{ menuLateralStatus, setMenuLateralStatus, meusEspacos, setMeusEspacos, reload, reloadApp, user, setUser }}>
            {children}
        </Context.Provider>
    )
}
