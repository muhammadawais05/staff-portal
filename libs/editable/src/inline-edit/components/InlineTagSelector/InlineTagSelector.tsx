import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Props } from '@toptal/picasso-forms/TagSelector/TagSelector'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'

import { EditableWrapper } from '../../../EditableField'

export interface InlineTagSelectorProps extends Props {
  onReset?: () => void
  submitButtonLabel?: string
}

const InlineTagSelector = ({
  value,
  required = false,
  onReset,
  setSelectedValues,
  disabled = false,
  name,
  submitButtonLabel = 'Save',
  ...rest
}: InlineTagSelectorProps) => (
  <EditableWrapper
    disabled={disabled}
    submitText={submitButtonLabel}
    submitDisabled={required && !value}
    data-testid='inline-tagselector-editor'
    onReset={onReset}
  >
    <Form.TagSelector
      {...rest}
      name={name}
      disabled={disabled}
      onChange={setSelectedValues}
      noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
      autoFocus
      // A hack to keep the field on focus even after a re-render
      onFocus={({ target }) => target.click()}
    />
  </EditableWrapper>
)

export default InlineTagSelector
