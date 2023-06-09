

const BASE_URL = 'https://equran.id/api/v2';
const DETAIL_SURAH_URL = 'https://equran.id/api/v2/surat';

export async function getSurah() {
  const surah = await fetch(`${BASE_URL}/surat`);
  
  if(!surah.ok) {
    return false
  }
  
  const json = await surah.json();
  return json.data;
}

export async function detailSurah(nomor) {
    const surahDetail = await fetch(`${DETAIL_SURAH_URL}/${nomor}`)

    if(!surahDetail.ok) {
        return  Error
    }
    
    const json = await surahDetail.json();
    return json.data
}