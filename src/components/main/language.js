
import { textEn, textUa, textRu } from '../constant/constant';

export const SwitchLanguage = (select) => {
    let setLang = [textEn.FEELS_LIKE, textEn.WIND, textEn.HUMIDITY, textEn.PRESSURE, textEn.PA, textEn.M_S];

    if(select === "en") return setLang = [textEn.FEELS_LIKE, textEn.WIND, textEn.HUMIDITY, textEn.PRESSURE, textEn.PA, textEn.M_S]
    if(select === "ua") return setLang = [textUa.FEELS_LIKE, textUa.WIND, textUa.HUMIDITY, textUa.PRESSURE, textUa.PA, textUa.M_S]
    if(select === "ru") return setLang = [textRu.FEELS_LIKE, textRu.WIND, textRu.HUMIDITY, textRu.PRESSURE, textRu.PA, textRu.M_S]

}