import { Container, Form, Select } from '@toptal/picasso'
import {
  Form as PicassoForm,
  useFieldArray,
  useForm
} from '@toptal/picasso-forms'
import React, { useEffect, useMemo, useState } from 'react'

import {
  INTERVIEW_CONTACTS_FIELD_NAME,
  PRIMARY_CONTACT_ID_FIELD_NAME
} from '../../config'
import { ContactType } from '../../types'

export interface Props {
  availableContacts: ContactType[]
}

const FormInterviewContactsSelect = ({ availableContacts }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  )
  const { resetFieldState, change } = useForm()

  const {
    fields: { value: interviewContacts, push }
  } = useFieldArray<string>(INTERVIEW_CONTACTS_FIELD_NAME)

  const options = useMemo(
    () =>
      availableContacts
        .filter(({ id }) =>
          interviewContacts?.every(contactId => contactId !== id)
        )
        .map(({ id, fullName }) => ({
          text: fullName,
          value: id
        })),
    [availableContacts, interviewContacts]
  )

  useEffect(() => {
    setSelectedValue(undefined)
  }, [selectedValue])

  const handleChange = (value: string) => {
    if (!interviewContacts.length) {
      change(PRIMARY_CONTACT_ID_FIELD_NAME, value)
    }

    setSelectedValue(value)
    push(value)
    resetFieldState('interviewContactsAttributes')
  }

  const bottomMargin = interviewContacts.length ? 'xsmall' : 'small'

  return (
    <Container top='small' bottom={bottomMargin}>
      <Form.Label requiredDecoration='asterisk'>Interview Contact</Form.Label>
      <Select
        options={options}
        placeholder='Search interview contact'
        onChange={({ target: { value } }) => handleChange(value)}
        data-testid='FormInterviewContactsSelect'
        value={selectedValue}
      />

      {/* Note: this input is used to display the interview contacts required error */}
      <PicassoForm.Input type='hidden' name='interviewContactsAttributes' />
    </Container>
  )
}

export default FormInterviewContactsSelect
