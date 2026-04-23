import { Form } from '@toptal/picasso-forms'
import { SubSection } from '@staff-portal/ui'
import React from 'react'

const NoteFormTitle = () => {
  return (
    <SubSection>
      <Form.Input
        autoFocus
        required
        autoComplete='on'
        width='full'
        name='noteTitle'
        label='Title'
        placeholder='Title'
      />
    </SubSection>
  )
}

export default NoteFormTitle
