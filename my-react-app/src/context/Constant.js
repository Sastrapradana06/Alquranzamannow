import { createContext, useContext } from "react";

export const surahContext = createContext({})

export const useSurahContext = () => {
    return useContext(surahContext)
}