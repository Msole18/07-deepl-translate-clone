import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

interface Props {
  type: SectionType,
  value: string,
  loading?: boolean,
  onChange: (value: string) => void,
}

const commonStyles: React.CSSProperties = {
  border: 0, 
  height: '300px', 
  width: '500px', 
  resize: 'none'
}

const getPlacehorder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Type or paste the text here'
  if (loading === true) return 'Translating...'
  return 'Translation'
}

export function TranslationArea({ type, value, loading, onChange }: Props) {

  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      as='textarea'
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      onChange={handleChange}
      placeholder={getPlacehorder({ type, loading })}
      style={styles}
      value={value}
    />
    
  )
}
