import { AUTO_LANGUAGE } from '../constants';
import { Action, FromLanguage, Language, State } from '../types.d';
import { useReducer } from 'react';

// 1. Create a initialState
const initialState: State = {
  fromLanguage: 'es',
  toLanguage: 'en',
  fromText: '',
  toText: '',
  loading: false
}

// 2. Create a reducer
const reducer = (state: State, action: Action) => {
  const { type } = action

  if (type === `INTERCHANGE_LANGUANGES`) {
    
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''
    return {
      ...state,
      loading, 
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === `SET_FROM_LANGUAGE`) {

    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      toText: '',
      fromLanguage: action.payload
    }
  }

  if (type === `SET_TO_LANGUAGE`) {
    if (state.toLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      toText: '',
      toLanguage: action.payload
    }
  }

  if (type === `SET_FROM_TEXT`) {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      toText: '',
      fromText: action.payload
    }
  }

  if (type === `SET_TO_TEXT`) {
    return {
      ...state,
      loading: false,
      toText: action.payload
    }
  }

  if (type === `INTERCHANGE_TEXT`) {
    console.log(state)
    if (state.fromLanguage === AUTO_LANGUAGE) return state
    
    const loading = state.toText !== ''

    return {
      ...state,
      loading,
      fromText: state.toText,
      toText: state.fromText
    }
  }

  return state
}

export function useStore() {
  // 3. Use the useReducer hook
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interChangeLanguages = () => {
    dispatch({ type: `INTERCHANGE_LANGUANGES` })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: `SET_FROM_LANGUAGE`, payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: `SET_TO_LANGUAGE`, payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: `SET_FROM_TEXT`, payload })
  }

  const setToText = (payload: string) => {
    dispatch({ type: `SET_TO_TEXT`, payload })
  }

  const interChangeText = () => {
    dispatch({ type: `INTERCHANGE_TEXT` })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    loading,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setToText,
    interChangeText
  }
}