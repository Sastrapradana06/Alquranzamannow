
import './App.css'
import { Route, Routes } from "react-router-dom";
import { useReducer } from 'react'
import { surahContext } from './context/Constant'
import Surah from './Components/Surah'
import Navbar from './Components/Navbar'
import SurahDetail from './Components/Surah-Detail'
import Home from './Components/Home';
import CariSurah from './Components/Cari-Surah';


function reducer(state, action) {
  switch(action.type) {
      case 'getSurah':
          return {...state, surah: action.payload}
      case 'toggleTheme':
          return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
      default:
          throw new Error()
  }
}

const initialState = {
  surah : [],
  theme : 'light'
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const surahContextValue = [state, dispatch]

  return (
    <surahContext.Provider value={surahContextValue}>
      <div className={`w-full] h-max ${state.theme} font-all relative`}>
        <Navbar />
        <div className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/surah" element={<Surah />} />
                    <Route path="/cari-surah" element={<CariSurah />} />
                    <Route path="/surah-detail" element={<SurahDetail />} />
                </Routes>
        </div>
      </div>
    </surahContext.Provider>
  )
}

export default App
