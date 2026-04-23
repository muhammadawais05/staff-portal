import React, { useMemo } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Scalars, UpdateActivityInput } from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/TagSelector'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isNotNullish } from '@staff-portal/utils'

import { ActivityFragment } from '../../data'
import { useUpdateActivity } from './data'
import ActivityForm from '../ActivityForm'
import { convertContactToItem } from '../ActivityForm/utils'

interface UpdateActivityFormValues
  extends Omit<UpdateActivityInput, 'duration' | 'occurredAt'> {
  contacts: Item[]
  occurredAt: Scalars['Time'] | null
  duration?: string | null
}

export interface Props {
  activity: ActivityFragment
  typeHidden?: boolean
  onClose: () => void
  onEditActivity: () => void
}

const toInt = (value?: string | null): number | undefined =>
  value ? parseInt(value, 10) : undefined

const EditActivityModal = ({
  activity: {
    id: activityId,
    type,
    subtype,
    outcome,
    occurredAt,
    details,
    duration,
    subject,
    activityContactRoles: { nodes: contacts }
  },
  typeHidden,
  onClose,
  onEditActivity
}: Props) => {
  const clientRepresentatives = subject?.representatives?.nodes
  const initialValues = useMemo<UpdateActivityFormValues>(
    () => ({
      activityId,
      duration: duration?.toString(),
      details,
      type,
      subtype,
      outcome,
      contacts: contacts.map(convertContactToItem),
      occurredAt: occurredAt ?? null
    }),
    [
      activityId,
      contacts,
      details,
      occurredAt,
      outcome,
      subtype,
      duration,
      type
    ]
  )
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateActivity, { loading }] = useUpdateActivity({
    onError: () => showError('An error occurred, activity was not edited.')
  })

  const handleSubmit = async ({
    contacts: selectedContacts,
    occurredAt: selectedOccurredAt,
    duration: selectedDuration,
    ...rest
  }: UpdateActivityFormValues) => {
    const { data } = await updateActivity({
      variables: {
        input: {
          ...rest,
          activityContactRoleIds: selectedContacts
            ?.map(({ value }) => value)
            .filter(isNotNullish),
          occurredAt: selectedOccurredAt ?? '',
          duration: toInt(selectedDuration)
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateActivity,
      successNotificationMessage: 'Activity was edited successfully.',
      onSuccessAction: () => onEditActivity()
    })
  }

  return (
    <Modal withForm onClose={onClose} open size='small'>
      <Modal.Title>Edit Activity</Modal.Title>

      <Form<UpdateActivityFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Modal.Content>
          <ActivityForm
            contacts={clientRepresentatives}
            typeHidden={Boolean(typeHidden)}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            Edit Activity
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default EditActivityModal
