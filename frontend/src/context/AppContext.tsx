import { createContext, useState } from "react"

type ContextType = {
    menuLateralStatus: boolean
    setMenuLateralStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: React.ReactNode }) {

    const [menuLateralStatus, setMenuLateralStatus] = useState<boolean>(true)

    return (
        <Context.Provider value={{ menuLateralStatus, setMenuLateralStatus }}>
            {children}
        </Context.Provider>
    )
}
