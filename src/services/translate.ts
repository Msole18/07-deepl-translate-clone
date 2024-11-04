import axios from 'axios'
import { AUTO_LANGUAGE } from '../constants'
import { type FromLanguage, type Language } from '../types.d'

const apiUrl = import.meta.env.VITE_DEEPL_API_URL;
const apiKey = import.meta.env.VITE_DEEPL_API_KEY;

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage,
  toLanguage: Language, 
  text: string
}) {

  
  if (fromLanguage === toLanguage) return text

  try {
    const response = await axios.post(apiUrl, null,{
      params: {
        auth_key: apiKey,
        text: text,
        ...(fromLanguage !== AUTO_LANGUAGE && { source_lang: fromLanguage.toLocaleUpperCase() }),
        target_lang: toLanguage.toLocaleUpperCase(),
      }
    })

    return response.data.translations[0]?.text; 

  } catch (error) {
    console.error('Error in translation:', error);
    throw error; 
  }

}
