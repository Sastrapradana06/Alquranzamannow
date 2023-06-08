import { useReducer } from "react"
import { surahContext } from "./Constant"
// import { createContext, useContext } from "react";


function reducer(state, action) {
    switch(action.type) {
        case 'getSurah':
            return {...state, surah: action.payload}
        default:
            throw new Error()
    }
}


const initialState = {
    surah : []
}

export const SurahProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const surahContextValue = [state, dispatch]
    return (
        <surahContext.Provider value={surahContextValue}>
            {children}
        </surahContext.Provider>
    )
}