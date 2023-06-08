export async function getSurah() {
    const surah = await fetch('https://equran.id/api/v2/surat')
    const json = await surah.json()
    // console.log(json.data);
    return json.data
}