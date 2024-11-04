import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { TranslationArea } from './components/TranslationArea';
import { LanguageSelector } from './components/LanguageSelector';
import { ArrowsIcon } from './components/Icons';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';
import { SectionType, VoicesLanguage } from './types.d';
import { translate } from './services/translate';
import { useStore } from './hooks/useStore';
import { useDebounce } from './hooks/useDebounced';
import { useEffect } from 'react';
import { TextControls } from './components/TextControls';

function App() {

  const {
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
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 300)

  const handleInterChange = () => {
    interChangeLanguages();
    interChangeText();
  }

  const handleEraseText = ({ type }: { type: SectionType}) => {
    if (type === SectionType.From) return setFromText('')
    setToText('')
  }

  const handleClipboard = ({ type }: { type: SectionType }) => {
    if (type === SectionType.From) return navigator.clipboard.writeText(fromText).catch(() => { })
    navigator.clipboard.writeText(toText).catch(() => { })
  }

  const handleSpeak = ({ type }: { type: SectionType }) => {
    const newSpeech = type === SectionType.From ? fromText : toText
    const newLenguage = type === SectionType.From ? fromLanguage : toLanguage

    const utterance = new SpeechSynthesisUtterance(newSpeech)
    utterance.lang = VOICE_FOR_LANGUAGE[newLenguage as VoicesLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(toText => {
        if (toText == null) return
        setToText(toText)
      })
      .catch(() => { setToText('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h2>DeepL Translate Clone</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={setFromLanguage}
              type={SectionType.From}
              value={fromLanguage}
            />
            <div style={{ position: 'relative'}}>
              <TranslationArea
                onChange={setFromText}
                type={SectionType.From}
                value={fromText}
              />
              <TextControls
                languageSpeaker= {VOICE_FOR_LANGUAGE[fromLanguage as VoicesLanguage] ? true : false }
                type={SectionType.From}
                onEraseText={handleEraseText}
                onClipboard={handleClipboard}
                onSpeaker={handleSpeak}
              />
            </div>
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={handleInterChange}
            variant='link'
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={setToLanguage}
              type={SectionType.To}
              value={toLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TranslationArea
                loading={loading}
                type={SectionType.To}
                value={toText}
                onChange={setToText}
              />
              <TextControls
                languageSpeaker={VOICE_FOR_LANGUAGE[toLanguage as VoicesLanguage] ? true : false}
                type={SectionType.To}
                onEraseText={handleEraseText}
                onClipboard={handleClipboard}
                onSpeaker={handleSpeak}
              />
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
