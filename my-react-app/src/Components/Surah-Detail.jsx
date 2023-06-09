import { useSurahContext } from "../context/Constant";
import AudioPlayer from "../utils/Audio";
export default function SurahDetail() {
  const [state] = useSurahContext();
  const surah = state.detailSurah;
  const ayat = surah.ayat;


  return (
    <div className="h-max w-full relative">
      <div className=" pt-20">
        <div className="border m-auto w-[80%] h-max rounded-md p-2 text-center bg-[#0b5c39]">
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
        <div className="flex flex-col gap-4">
          {ayat &&
            ayat.map((e, i) => {
              return (
                <div className="border mt-10 w-[87%] h-max m-auto flex justify-between p-2" key={i}>
                  <div className=" items-center flex flex-wrap flex-col justify-between">
                    <p className="text-[1.1rem]">{e.nomorAyat}</p>
                    <AudioPlayer url={`${e.audio['05']}`} />
                  </div>
                  <div className="flex flex-col justify-center w-[90%] gap-4">
                    <div className=" w-full text-right">
                      <p className="text-[1.7rem]">{e.teksArab}</p>
                      <p className="text-[.7rem]">{e.teksLatin}</p>
                    </div>
                    <div className=" ml-8">
                      <p>Arti: </p>
                      <i className="text-[.7rem]">{e.teksIndonesia}</i>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
