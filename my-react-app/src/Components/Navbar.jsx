
import '../App.css'
import { useSurahContext } from "../context/Constant"
import { CiLight, CiDark } from "react-icons/ci";
import { BsBook } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import { AiOutlineArrowDown } from "react-icons/ai";


export default function Navbar() {
    const [state, dispatch] = useSurahContext()
    const [list, setList] = useState('hidden');
    const [toggle, setToggle] = useState(true)

    const handleList = () => {
        setList(list === 'hidden' ? 'aktif' : 'hidden');
        setToggle(!toggle)
    };

    return (
        <div className=" pt-4 w-full fixed z-10 top-0">
            <div className=" w-[90%] m-auto p-1 rounded-lg flex items-center justify-around lg:gap-[450px] gap-8 bg-[#1a7b7b75]">
                <div className="text-[1.1rem]" onClick={handleList}>
                    <p>Alquran Zaman Now</p>
                </div>
                <div className=" flex gap-3 lg:gap-8 items-center ">
                    <button onClick={() => dispatch({type: 'toggleTheme'})} className="transition-all duration-300">
                        {state.theme === 'light' && <CiLight size={32} className="transition-all duration-300"/>}
                        {state.theme === 'dark' && <CiDark size={32} className="transition-all duration-300"/>}
                    </button>
                    <button className={`toggle flex flex-col gap-[6px] lg:hidden`} onClick={handleList}>
                        {toggle ? <BsList size={30} /> : <AiOutlineArrowDown size={30} />}
                    </button>
                    <div className=" gap-5 hidden lg:flex">
                        <button className="flex items-center gap-1">
                            <BiHomeAlt />
                            <Link to='/'>Home</Link>
                        </button>
                        <button className="flex items-center gap-1">
                            <BsBook />
                            <Link to='/surah'>Surah</Link>
                        </button>
                        <button className="flex items-center gap-1">
                            <AiOutlineSearch />
                            <Link to='/cari-surah'>Cari Surah</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${list} w-[90%] m-auto p-1 rounded-xl mt-2 flex justify-center items-center gap-6 duration-300 transition-all lg:hidden ${state.theme === 'light' ? 'bg-list-light' : 'bg-list-dark'}`}>
                <button className="flex items-center gap-1">
                    <BiHomeAlt />
                    <Link to='/'>Home</Link>
                </button>
                <button className="flex items-center gap-1">
                    <BsBook />
                    <Link to='/surah'>Surah</Link>
                </button>
                <button className="flex items-center gap-1">
                    <AiOutlineSearch />
                    <Link to='/cari-surah'>Cari Surah</Link>
                </button>
            </div>
        </div>
    )
}