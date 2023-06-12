import { useSurahContext } from "../context/Constant"
import { useEffect } from "react"
import { getSurah, detailSurah } from "../Api"
import AudioPlayer from "../utils/Audio"
import { Link } from "react-router-dom"

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

        dispatch({
          type: 'getDetailSurah',
          payload: []
        })
      }, [dispatch]);

      const getDetailSurah = (nomor) => {
        detailSurah(nomor).then((result) => {
          dispatch({
            type: 'getDetailSurah',
            payload: result

          })
        })
      }

    return (
        <div className=" w-full">
          <div className={`w-[95%] m-auto pb-6 pt-[70px] flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:pt-[90px] lg:w-[90%]`}>
            {surah.length === 0 && (
              <div className="h-[100vh] m-auto">
                <div className="newtons-cradle m-auto top-10">
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                </div>
              </div>
            )}
            {surah.map((ayat, i) => {
              return (
                <div className={`card-surah ${state.theme === 'light' ? 'bg-surah-light' : 'bg-surah-dark'} w-[90%] h-max flex flex-col justify-between p-2 rounded-xl m-auto lg:w-[30%] relative overflow-hidden`} key={i}>
                    <div className="flex  text-[1.1rem] justify-between">
                      <div className=" w-[80%] flex gap-1 items-center ">
                        <p className="text-center rounded-full">{ayat.nomor}.</p>
                        <p className="">{ayat.namaLatin}<span className="text-[.9rem] ml-1">({ayat.arti})</span></p>
                      </div>
                      <div className=" mt-1">
                      <AudioPlayer url={ayat.audioFull['05']} />
                      </div>
                    </div>
                    <div className=" text-center">
                      <p className="text-center text-[2.5rem] -mb-4">{ayat.nama}</p>
                      <p className="italic">{ayat.tempatTurun}</p>
                    </div>
                    <div className="card-hover h-full absolute top-0 left-0 z-10">
                      <button className="border border-black px-5 rounded-lg bg-[teal] text-[1.1rem] hover:bg-[#045050] transition-all duration-300" onClick={getDetailSurah.bind(this, ayat.nomor)}>
                        <Link to='/surah-detail'>Baca</Link>
                      </button>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
    )
}