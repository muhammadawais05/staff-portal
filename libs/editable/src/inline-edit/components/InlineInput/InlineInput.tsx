import React, { useState } from 'react'
import { Input, Tooltip, CloseMinor16, Container } from '@toptal/picasso'

import { EditorProps } from '../../types'
import { isEmpty } from '../../../utils'

const ERROR_MESSAGE = "You can't leave this empty"

export interface InlineInputProps extends EditorProps<string> {
  placeholder?: string
  // todo : should be supported https://toptal-core.atlassian.net/browse/SPB-2030
  parse?: unknown
  // todo : should be supported https://toptal-core.atlassian.net/browse/SPB-2030
  validate?: unknown
}

/**
 * @deprecated use EditableField + EditableInput
 */
const InlineInput = ({
  error,
  placeholder,
  required,
  value,
  onChange,
  onReset,
  onError
}: InlineInputProps) => {
  const [inputValue, setInputValue] = useState(value)

  const onBlur = () => changeValue(inputValue)

  const changeValue = (newValue?: string) => {
    const isValid = !required || !isEmpty(newValue)

    if (isValid) {
      onChange(newValue)
    } else {
      onError(true)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        onReset()
        break
      case 'Enter':
        changeValue(inputValue)
        break
    }
  }

  return (
    <Container flex alignItems='center'>
      <Input
        autoFocus
        error={error}
        placeholder={placeholder}
        required={required}
        size='small'
        value={inputValue ?? ''}
        width='full'
        onBlur={onBlur}
        onChange={({ target: { value: newValue } }) => {
          setInputValue(newValue)
          onError(false)
        }}
        onKeyDown={handleKeyDown}
      />
      {error && (
        <Tooltip open content={ERROR_MESSAGE} placement='top' interactive>
          <CloseMinor16 color='red' />
        </Tooltip>
      )}
    </Container>
  )
}

export default InlineInput
