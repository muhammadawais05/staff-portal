import React, { useEffect } from 'react'
import { Select, SelectOption, SelectProps } from '@toptal/picasso'

import { EditorProps } from '../../types'
import { isEmpty } from '../../../utils'

export interface InlineSelectProps extends EditorProps<string | number> {
  loading?: boolean
  enableReset?: boolean
  placeholder?: string
  options?: SelectOption[]
  width?: SelectProps['width']
  searchThreshold?: number
  'data-testid'?: string
}

const InlineSelect = ({
  enableReset,
  error,
  placeholder,
  loading,
  required,
  value,
  width = 'full',
  searchThreshold,
  onChange,
  onError,
  options = [],
  onReset,
  'data-testid': testId
}: InlineSelectProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onReset()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onReset])

  const changeValue = (newValue: string | number) => {
    const isValid = !required || !isEmpty(String(newValue))

    if (isValid) {
      onChange(newValue)
    } else {
      onError(true)
    }
  }

  return (
    <Select
      data-testid={testId}
      loading={loading}
      enableReset={enableReset}
      error={error}
      placeholder={placeholder}
      required={required}
      size='small'
      value={value}
      width={width}
      options={options}
      searchThreshold={searchThreshold}
      onChange={({ target: { value: newValue } }) => changeValue(newValue)}
    />
  )
}

export default InlineSelect
