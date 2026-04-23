import { Container, Tag, Typography } from '@toptal/picasso'
import { Form, useField, useFieldArray, useForm } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { isNotNullish } from '@staff-portal/utils'

import {
  INTERVIEW_CONTACTS_FIELD_NAME,
  PRIMARY_CONTACT_ID_FIELD_NAME
} from '../../config'
import { ContactType } from '../../types'

export interface Props {
  availableContacts: ContactType[]
}

const FormInterviewContactsTags = ({ availableContacts }: Props) => {
  const { change } = useForm()

  const {
    fields: { value: interviewContactIds, remove }
  } = useFieldArray<string>(INTERVIEW_CONTACTS_FIELD_NAME)

  const {
    input: { value: primaryContactId }
  } = useField<string>(PRIMARY_CONTACT_ID_FIELD_NAME)

  const contacts = useMemo(
    () =>
      interviewContactIds
        .map(contactId => availableContacts?.find(({ id }) => id === contactId))
        .filter(isNotNullish),
    [availableContacts, interviewContactIds]
  )

  const handleDelete = (index: number, contactId: string) => {
    if (contactId === primaryContactId) {
      const newPrimaryContactId = contacts.find(({ id }) => id != contactId)?.id

      change(PRIMARY_CONTACT_ID_FIELD_NAME, newPrimaryContactId)
    }

    remove(index)
  }

  if (!availableContacts.length || !interviewContactIds.length) {
    return null
  }

  return (
    <Container bottom='small' data-testid='FormInterviewContactsTags-section'>
      <Form.RadioGroup
        horizontal
        name={PRIMARY_CONTACT_ID_FIELD_NAME}
        hint='Click on the radio button to select primary contact.'
      >
        <Tag.Group data-testid='FormInterviewContactsTags-group'>
          {contacts.map(({ id, fullName }, index) => (
            <Tag
              key={id}
              variant={primaryContactId === id ? 'green' : undefined}
              onDelete={() => handleDelete(index, id)}
              data-testid={`FormInterviewContactsTags-tag-${index}`}
            >
              <Form.Radio
                value={id}
                label={
                  <Typography
                    color={primaryContactId === id ? 'green' : undefined}
                    size='xsmall'
                    weight='inherit'
                  >
                    {fullName}
                  </Typography>
                }
              />
            </Tag>
          ))}
        </Tag.Group>
      </Form.RadioGroup>
    </Container>
  )
}

export default FormInterviewContactsTags
