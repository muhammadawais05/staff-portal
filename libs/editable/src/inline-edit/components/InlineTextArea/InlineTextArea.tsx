import React, { useState } from 'react'
import {
  Input,
  CloseMinor16,
  Container,
  Button,
  Check16
} from '@toptal/picasso'

import { EditorProps } from '../../types'
import * as S from './styles'

export interface InlineTextAreaProps
  extends Omit<EditorProps<string | null>, 'onBlur' | 'onError'> {
  placeholder?: string
}

/**
 * @deprecated use EditableField + EditableTextarea
 */
const InlineTextArea = ({
  error,
  placeholder,
  required,
  value,
  onChange,
  onReset
}: InlineTextAreaProps) => {
  const [inputValue, setInputValue] = useState(value as string)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        onReset()
        break
    }
  }

  return (
    <Container flex bottom='xsmall'>
      <Container css={S.editorContainer}>
        <Input
          autoFocus
          error={error}
          placeholder={placeholder}
          required={required}
          value={inputValue}
          width='full'
          multiline
          rows={4}
          rowsMax={10}
          data-testid='inline-textarea-editor-input'
          onChange={({ target: { value: newValue } }) =>
            setInputValue(newValue)
          }
          onKeyDown={handleKeyDown}
        />
      </Container>
      <Container left='xsmall'>
        <Container bottom='xsmall'>
          <Button.Circular
            icon={<Check16 />}
            disabled={required && !inputValue}
            onClick={() => onChange(inputValue)}
            data-testid='inline-textarea-editor-submit'
          />
        </Container>
        <Container>
          <Button.Circular
            icon={<CloseMinor16 color='dark-grey' />}
            variant='transparent'
            onClick={() => onReset()}
            data-testid='inline-textarea-editor-cancel'
          />
        </Container>
      </Container>
    </Container>
  )
}

export default InlineTextArea
