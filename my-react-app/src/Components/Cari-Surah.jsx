import { useEffect, useState } from "react";
import { useSurahContext } from "../context/Constant";
import { AiOutlineSearch } from "react-icons/ai";
import { detailSurah, getSurah } from "../Api";
import AudioPlayer from "../utils/Audio";
import { useRef } from "react";

// import { BsFillArrowDownLeftSquareFill } from "react-icons/bs";
// import Loading from "../utils/Loading";

export default function CariSurah() {
  const [state, dispatch] = useSurahContext();
  const [seacrhSurah, setSeacrhSurah] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [inputAyat, setInputAyat] = useState();
  const [isLoading, setIsloading] = useState(false);

  const theme = state.theme;
  const surah = state.surah;
  // console.log({surah});
  const ayatRef = useRef([]);

  useEffect(() => {
    getSurah().then((result) => {
      dispatch({
        type: "getSurah",
        payload: result,
      });
    });

    if (seacrhSurah) {
      ayatRef.current = new Array(seacrhSurah.jumlahAyat);
    }
  }, [dispatch, seacrhSurah]);

  async function getInputUser(e) {
    e.preventDefault();

    const filteredSurah = surah.filter((surah) => {
      const userInput = inputUser.toLowerCase();
      const surahName = surah.namaLatin.toLowerCase();

      setSeacrhSurah("");
      return userInput === surahName;
    });

    if (filteredSurah.length === 0) {
      setIsloading(true);
      setSeacrhSurah("");
      return false;
    }

    const selectedSurah = filteredSurah[0];
    setIsloading(false);
    const surat = await detailSurah(selectedSurah.nomor);
    setSeacrhSurah(surat);

    setInputUser("");
    setIsloading(false);
  }


  function getAyat(e) {
    e.preventDefault();

    if (!seacrhSurah) {
      console.error("ga ada");
      return;
    }

    const ayat = seacrhSurah.ayat;

    const filteredAyat = ayat.filter((ayatObj) => {
      return inputAyat == ayatObj.nomorAyat;
    });

    if (filteredAyat.length > 0) {
      const targetAyat = filteredAyat[0];
      setInputAyat("");

      const selectedAyatRef = ayatRef.current[targetAyat.nomorAyat - 1];

      if (selectedAyatRef) {
        selectedAyatRef.scrollIntoView({ behavior: "smooth" });
      }

      return targetAyat;
    }

    setInputAyat("");
  }

  return (
    <div className={`card h-[100vh] relative ${seacrhSurah ? "h-max" : "h-[100vh]"}`}>
      <div className="card-content pt-16 p-2">
        <div className="mt-3 pb-4 w-[90%] m-auto">
          <form onSubmit={getInputUser} className="flex gap-4 justify-center">
            <input
              type="text"
              className={`bg-transparent rounded-md outline-none px-2 h-[30px] text-[.9rem] ${theme === "light" ? "border-b" : "border-w"}`}
              placeholder="Contoh(Al-Fatihah/Al-An'am)"
              size={28}
              onChange={(e) => setInputUser(e.target.value)}
              value={inputUser}
            />
            <button type="submit">
              <AiOutlineSearch size={25} className={`${theme === "dark" ? "white" : "black"}`} />
            </button>
          </form>
        </div>
        <div className=" mt-5">
          {isLoading ? (
            <div className=" text-center">
              <p>Surah Tidak Ada</p>
            </div>
          ) : null}
          {!seacrhSurah ? null : (
            <div className="mt-2">
              <div className="border m-auto w-[80%] h-max rounded-md p-2 text-center card-detail">
                <div className="text-center text-[2.2rem]">
                  <h1 className="underline">{seacrhSurah.nama}</h1>
                </div>
                <div className="mt-2 text-[.9rem]">
                  <p>Nama: {seacrhSurah.namaLatin}</p>
                  <p>Nomor: {seacrhSurah.nomor}</p>
                  <p>Jumlah Ayat: {seacrhSurah.jumlahAyat}</p>
                  <p>Arti: {seacrhSurah.arti}</p>
                  <p>Tempat Turun: {seacrhSurah.tempatTurun}</p>
                </div>
              </div>
              <div className=" w-[80%] m-auto mt-4">
                <audio controls className="m-auto">
                  <source src={seacrhSurah.audioFull["05"]} />
                </audio>
              </div>
              <div className="mt-5 w-[90%] m-auto -mb-5">
                <form className="flex gap-1 justify-center" onSubmit={getAyat}>
                  <input
                    type="text"
                    className={`bg-transparent rounded-md outline-none px-2 h-[30px] text-[.9rem] ${theme === "light" ? "border-b" : "border-w"}`}
                    placeholder="Cari no ayat"
                    size={15}
                    onChange={(e) => setInputAyat(e.target.value)}
                    value={inputAyat}
                  />
                  <button type="submit">
                    <AiOutlineSearch size={25} className={`${theme === "dark" ? "white" : "black"}`} />
                  </button>
                </form>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            {seacrhSurah &&
              seacrhSurah.ayat.map((e, i) => {
                return (
                  <div key={i} ref={(ref) => (ayatRef.current[e.nomorAyat] = ref)} className="border mt-10 w-[87%] h-max m-auto flex gap-2 flex-col justify-between p-2 lg:w-[80%] rounded-md card-ayat">
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
                      <AudioPlayer url={`${e.audio["05"]}`} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
