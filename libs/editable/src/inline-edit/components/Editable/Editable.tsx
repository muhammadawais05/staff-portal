import React, { FunctionComponent, useState, ReactNode } from 'react'
import { Container, Button, Pencil16, SelectOption } from '@toptal/picasso'

import { EditorProps } from '../../types'
import * as S from './styles'

export interface EditableProps<Value> {
  editor: FunctionComponent<EditorProps<Value>>
  value?: Value
  options?: SelectOption[]
  loading?: boolean
  required?: boolean
  disabled?: boolean
  viewer?: string | ReactNode
  onEditToggle?: () => void
  onChange?: (value?: Value) => void
  updateOnBlur?: boolean
}

/**
 * @deprecated use EditableField
 */
const Editable = <Value,>({
  editor: EditorComponent,
  loading,
  required,
  disabled,
  value,
  viewer,
  onEditToggle,
  onChange,
  updateOnBlur,
  options
}: EditableProps<Value>) => {
  const [isInEditMode, setInEditMode] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [internalValue, setInternalValue] = useState(value)

  const setIsInEditMode = (state: boolean) => {
    onEditToggle?.()
    setInEditMode(state)
  }

  const changeInternalValue = (newValue?: Value) => setInternalValue(newValue)

  const changeValue = (newValue?: Value) => {
    setIsInEditMode(false)
    onChange?.(newValue)
  }

  const currentValue = updateOnBlur ? internalValue : value
  const handleChange = updateOnBlur ? changeInternalValue : changeValue

  const handleBlur = () => {
    if (updateOnBlur && internalValue !== undefined) {
      changeValue(internalValue)
    }
  }

  const reset = () => {
    setIsInEditMode(false)
    setHasError(false)
  }

  if (isInEditMode && !loading) {
    return (
      <EditorComponent
        error={hasError}
        required={required}
        value={currentValue}
        onChange={handleChange}
        onReset={reset}
        onBlur={handleBlur}
        onError={setHasError}
        options={options}
      />
    )
  }

  return (
    <Container
      flex
      alignItems='flex-start'
      direction='row'
      data-testid='editable-viewer'
      css={S.editableViewerWidth}
    >
      {viewer}
      {!disabled && (
        <Button.Circular
          variant='transparent'
          icon={<Pencil16 />}
          onClick={() => setIsInEditMode(true)}
          aria-label='Edit'
          data-testid='edit-button'
          loading={loading}
          css={S.editButton}
        />
      )}
    </Container>
  )
}

export default Editable
