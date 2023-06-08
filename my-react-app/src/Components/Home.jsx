import imgQuran from '../assets/quran.png'
import { useSurahContext } from '../context/Constant'
export default function Home() {
    const [state] = useSurahContext()
    return (
        <div className=" w-full p-1 h-[100vh]">
            <div className="w-[95%] m-auto mt-[70px]">
                <div className=" m-auto">
                    <img src={imgQuran} alt="" className="w-[300px] h-[300px] object-cover m-auto"/>
                </div>
                <div className="text-center w-[95%] lg:m-auto">
                    <h1 className="text-[1.7rem] font-judul font-semibold">"Kejarlah Akhirat!!</h1>
                    <h2 className="text-[1.1rem]">Maka Dunia dan Seisinya akan Mengejarmu"</h2>
                </div>
                <div className={`lg:mt-5 lg:w-[70%] lg:m-auto mt-3 text-center mb-4 ${state.theme ==='light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <p>"Al-Quran adalah sumber spiritualitas yang mendalam. Dalam membaca dan merenungkan ayat-ayatnya, seseorang dapat merasakan kehadiran Allah yang memberikan ketenangan, kekuatan, dan harapan di tengah kesulitan"</p>
                </div>
            </div>
        </div>
    )
}