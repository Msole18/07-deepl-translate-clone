import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES, VOICE_FOR_LANGUAGE } from "./constants";

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage
export type VoicesLanguage = keyof typeof VOICE_FOR_LANGUAGE

export interface  State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  toText: string;
  loading: boolean ;
}

export type Action =
  | {type: `INTERCHANGE_LANGUANGES`}
  | {type: `SET_FROM_LANGUAGE`, payload: FromLanguage }
  | {type: `SET_TO_LANGUAGE`, payload: Language }
  | {type: `SET_FROM_TEXT`, payload: string}
  | {type: `SET_TO_TEXT`, payload: string}
  | { type: `INTERCHANGE_TEXT` }

export enum SectionType {
  From = 'from',
  To = 'to'
}