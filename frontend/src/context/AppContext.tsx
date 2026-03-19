import { createContext, useEffect, useState } from "react"
import { Espaco } from "../types/interface"
import { getUserEspacos } from "../functions/getUserEspacos"

type ContextType = {
    menuLateralStatus: boolean
    setMenuLateralStatus: React.Dispatch<React.SetStateAction<boolean>>

    meusEspacos: Espaco[]
    setMeusEspacos: React.Dispatch<React.SetStateAction<Espaco[]>>
}

export const Context = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [menuLateralStatus, setMenuLateralStatus] = useState<boolean>(true)
    const [meusEspacos, setMeusEspacos] = useState<Espaco[]>([])

    useEffect(() => {
        fetchData
    }, [])

    const fetchData = async () => {
        const data = await getUserEspacos()
        setMeusEspacos(data)
    }

    return (
        <Context.Provider value={{ menuLateralStatus, setMenuLateralStatus, meusEspacos, setMeusEspacos }}>
            {children}
        </Context.Provider>
    )
}
