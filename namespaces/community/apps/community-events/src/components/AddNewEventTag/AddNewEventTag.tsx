import React, { useState, ChangeEvent, useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useNotifications } from '@toptal/picasso/utils'

import { useCreateEventTag } from '../../data/create-event-tag/create-event-tag.staff.gql'
import * as S from './styles'

const AddNewEventTag = () => {
  const [eventTagTitle, setEventTagTitle] = useState('')
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [createEventTag] = useCreateEventTag({
    onError() {
      showError(`Unable to create event tag ${eventTagTitle}`)
    }
  })

  const handleSubmit = async (fields: { eventTagTitle: string }) => {
    const { data } = await createEventTag({
      variables: {
        input: {
          title: fields.eventTagTitle,
          active: true
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createCommunityEventTag,
      successNotificationMessage: `Event tag ${fields.eventTagTitle} successfully created`,
      onSuccessAction() {
        setEventTagTitle('')
      }
    })
  }

  const handleInputChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setEventTagTitle(event.currentTarget.value)
    },
    [setEventTagTitle]
  )

  const validateEventTagName = (value?: string) => {
    if (!value) {
      return 'Please type an event tag name'
    }
  }

  return (
    <Form onSubmit={handleSubmit} initialValues={{ eventTagTitle }}>
      <Container top='medium' bottom='medium' flex gap={1}>
        <Container css={S.inputTextWrapper}>
          <Form.Input
            placeholder='Type event tag name'
            value={eventTagTitle}
            name='eventTagTitle'
            onChange={handleInputChange}
            width='full'
            validate={validateEventTagName}
          />
        </Container>
        <Form.SubmitButton>Add New Event Tag</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default AddNewEventTag
