import React, { useCallback } from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  ActivityType,
  CreateActivityInput,
  Scalars
} from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/TagSelector'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { RoleOrClientFragment } from '@staff-portal/facilities'
import { isNotNullish } from '@staff-portal/utils'

import * as S from './styles'
import { CreateActivityDocument } from './data'
import ActivityForm from '../ActivityForm'
import { useGetFormInitialValues } from './utils'
import { MODAL_TITLE } from '../AddActivityModal/AddActivityModal'
import { ACTIVITY_UPDATED } from '../../messages'

export type CreateActivityFormValues = Omit<
  CreateActivityInput,
  'duration' | 'occurredAt'
> & {
  contacts?: Item[]
  duration?: string | null
  occurredAt?: Scalars['Time'] | null
}

type Props = {
  availableContacts?: { id: string; fullName: string }[]
  contact?: RoleOrClientFragment | null
  subjectId: string
  type?: ActivityType
  hideModal: () => void
}

const AddActivityModalContent = ({
  availableContacts,
  contact,
  subjectId,
  type,
  hideModal
}: Props) => {
  const initialValues = useGetFormInitialValues({ contact, subjectId, type })
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: CreateActivityDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Activity was added successfully.',
        successMessageEmitOptions: { type: ACTIVITY_UPDATED },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    ({
      contacts: selectedContacts,
      duration,
      occurredAt,
      ...rest
    }: CreateActivityFormValues) =>
      handleMutationSubmit({
        ...rest,
        activityContactRoleIds: selectedContacts
          ?.map(({ value }) => value)
          .filter(isNotNullish),
        duration: duration ? parseInt(duration) : undefined,
        occurredAt: occurredAt ?? ''
      }),
    [handleMutationSubmit]
  )

  return (
    <ModalForm<CreateActivityFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      title={MODAL_TITLE}
    >
      <Modal.Content css={S.modalContact}>
        <ActivityForm contacts={availableContacts} typeHidden={Boolean(type)} />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>Add Activity</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default AddActivityModalContent
