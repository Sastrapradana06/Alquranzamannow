import { useEffect, useState, useRef } from "react";
import { useSurahContext } from "../context/Constant";
import { AiOutlineSearch } from "react-icons/ai";
import AudioPlayer from "../utils/Audio";
import Loading from "../utils/Loading";
export default function SurahDetail() {
  const [state] = useSurahContext();
  const [inputAyat, setInputAyat] = useState();
  const surah = state.detailSurah;
  const ayat = surah.ayat;

  const ayatRef = useRef([]);

  useEffect(() => {
    if (ayat) {
      ayatRef.current = new Array(surah.jumlahAyat);
    }
  }, [ayat, surah])

  function getAyat(e) {
    e.preventDefault();

    if (!surah) {
      console.error("ga ada");
      return;
    }

    const filteredAyat = ayat.filter((ayatObj) => {
      return inputAyat == ayatObj.nomorAyat;
    });

    if (filteredAyat.length > 0) {
      const targetAyat = filteredAyat[0];
      
      const selectedAyatRef = ayatRef.current[targetAyat.nomorAyat - 1];

      if (selectedAyatRef) {
        selectedAyatRef.scrollIntoView({ behavior: "smooth" });
      }

      return targetAyat;
    }

    setInputAyat("");
  }

  return (
    <div className="h-max w-full relative">
      <div className=" pt-20">
        {surah.length === 0 ? (
          <Loading text='Orang Sabar Disayang Allah🤗'/>
        ) : (
          <div className="">
            <div className="border m-auto w-[80%] h-max rounded-md p-2 text-center card-detail">
              <div className="text-center text-[2.2rem]">
                <h1 className="underline">{surah.nama}</h1>
              </div>
              <div className="mt-2 text-[.9rem]">
                <p>Nama: {surah.namaLatin}</p>
                <p>Nomor: {surah.nomor}</p>
                <p>Jumlah Ayat: {surah.jumlahAyat}</p>
                <p>Arti: {surah.arti}</p>
                <p>Tempat Turun: {surah.tempatTurun}</p>
              </div>
            </div>
            <div className=" w-[80%] m-auto mt-4">
              <audio controls className="m-auto">
                <source src={surah.audioFull['05']} />
              </audio>
            </div>
            <div className=" w-[80%] m-auto mt-5 flex justify-center">
              <form onSubmit={getAyat} className="flex justify-center items-center gap-2">
                <input 
                  type="text"
                  value={inputAyat}
                  onChange={(e) => setInputAyat(e.target.value)}
                  className={`outline-none bg-transparent border m-auto rounded-md text-[.9rem] px-3 py-1 ${state.theme === 'dark' ? 'border-w' : 'border-b'}`}
                />
                <button>
                  <AiOutlineSearch size={25} />
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {ayat &&
            ayat.map((e, i) => {
              return (
                <div className="border mt-10 w-[87%] h-max m-auto flex gap-2 flex-col justify-between p-2 lg:w-[80%] rounded-md card-ayat" key={i} ref={(ref) => (ayatRef.current[e.nomorAyat] = ref)}>
                  <div className=" ">
                    <p className="text-[1.1rem] lg:text-[1.4rem]">{e.nomorAyat}.</p>
                  </div>
                  <div className="flex flex-col justify-center w-[100%] gap-4">
                    <div className=" w-full text-right">
                      <p className="text-[1.7rem] lg:text-[2.2rem]">{e.teksArab}</p>
                    </div>
                    <div className="border-bottom-b latin">
                      <i className="text-[.7rem] lg:text-[1rem] text-left">{e.teksLatin}</i>
                    </div>
                    <div className="">
                      <p className="text-[.7rem] lg:text-[1rem] text-black">"{e.teksIndonesia}"</p>
                    </div>
                  </div>
                  <div className="">
                    <AudioPlayer url={`${e.audio['05']}`} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
