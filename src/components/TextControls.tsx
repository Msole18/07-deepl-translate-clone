import { Container, Button, } from 'react-bootstrap';
import { ClipboardIcon, SpeakerIcon, XMarkIcon } from './Icons';
import { SectionType } from '../types.d';

type Props = { 
  type: SectionType, 
  languageSpeaker: boolean, 
  onEraseText: (type: { type: SectionType }) => void 
  onClipboard: (type: { type: SectionType }) => void 
  onSpeaker: (type: { type: SectionType }) => void 
}

export function TextControls({ type, languageSpeaker, onEraseText, onClipboard, onSpeaker }: Props) {
  return (
    <>
      <Container style={{ position: 'absolute', right: 0, top: 0, display: 'flex', justifyContent: 'end', width: 'auto' }}>
        <Button
          onClick={() => onEraseText({ type })}
          variant='link' 
        >
          <XMarkIcon/>
        </Button>
      </Container>
      <Container style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex', justifyContent: 'end', width: 'auto' }}>
        {languageSpeaker &&
          <Button
            onClick={() => onSpeaker({ type })}
            variant='link' 
          >
            <SpeakerIcon />
          </Button>
        }
        <Button
          onClick={() => onClipboard({ type })}
          variant='link' 
        >
          <ClipboardIcon />
        </Button>
      </Container>
    </>
  )
}
