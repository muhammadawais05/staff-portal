import { Form, useField } from '@toptal/picasso-forms'
import React, { ReactNode } from 'react'
import { CompanyAction } from '@staff-portal/graphql/staff'

import { CompanyNoteType } from '../../enums'
import NoteFormCompanyActions from '../NoteFormCompanyActions'

export interface Props {
  actions?: CompanyAction[]
  children?: ReactNode
}

const AddNoteFormWrapper = ({
  actions,
  children
}: Props) => {
  const {
    input: { value: noteType }
  } = useField('noteType')

  return (
    <>
      <Form.RadioGroup name='noteType' horizontal>
        <Form.Radio
          label='General Information'
          value={CompanyNoteType.General}
        />
        <Form.Radio
          label='Client Communications'
          value={CompanyNoteType.Communication}
        />
      </Form.RadioGroup>

      {children}

      {noteType === CompanyNoteType.Communication && (
        <NoteFormCompanyActions actions={actions} />
      )}
    </>
  )
}

export default AddNoteFormWrapper
