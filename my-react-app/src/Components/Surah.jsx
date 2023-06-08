import { useSurahContext } from "../context/Constant"
import { useEffect } from "react"
import { getSurah } from "../Api"
import AudioPlayer from "../utils/Audio"

export default function Surah() {
    const [state, dispatch] = useSurahContext()
    const surah = state.surah

    useEffect(() => {
        getSurah().then((result) => {
          dispatch({
            type: 'getSurah',
            payload: result
          })
        });
      }, []);

    return (
        <div className=" w-full">
          <div className={`w-[95%] m-auto pt-[70px] flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:pt-[90px] lg:w-[90%]`}>
            {surah.map((ayat, i) => {
              return (
                <div className={`${state.theme === 'light' ? 'bg-surah-light' : 'bg-surah-dark'} w-[90%] h-max flex flex-col justify-between p-2 rounded-xl m-auto lg:w-[30%]`} key={i}>
                    <div className="flex  text-[1.1rem] justify-between">
                      <div className=" w-[80%] flex gap-1 items-center">
                        <p className="text-center rounded-full">{ayat.nomor}.</p>
                        <p className="">{ayat.namaLatin}<span className="text-[.9rem] ml-1">({ayat.arti})</span></p>
                      </div>
                      <div className=" mt-1">
                      <AudioPlayer url={ayat.audioFull['05']} />
                      </div>
                    </div>
                    <div className=" text-center">
                      <p className="text-center text-[2.5rem] -mb-4">الفاتحة</p>
                      <p className="italic">{ayat.tempatTurun}</p>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
    )
}