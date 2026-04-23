import React, { useState, useMemo, useCallback } from 'react'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { FormCancelButton } from '@staff-portal/forms'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import { SchedulerForTransferFragment } from '../../data/scheduler-for-transfer-fragment'
import { useGetPossibleSchedulers } from './data'
import ChangeOrganizerPossibleSchedulersAutocomplete from '../ChangeOrganizerPossibleSchedulersAutocomplete'

export type Props = {
  hideModal: () => void
  setSelectedScheduler: (scheduler: SchedulerForTransferFragment | null) => void
} & Pick<MeetingFragment, 'id' | 'organizer'>

export type FormValues = { schedulerId: string }

const ChangeMeetingOrganizerModalContent = ({
  id: meetingId,
  organizer,
  setSelectedScheduler,
  hideModal
}: Props) => {
  const { data, loading } = useGetPossibleSchedulers({
    meetingId
  })

  const [
    selectedSchedulerFromAutocomplete,
    setSelectedSchedulerFromAutocomplete
  ] = useState<SchedulerForTransferFragment | null>(null)

  const handleSubmit = useCallback(
    ({ schedulerId }: FormValues) => {
      const scheduler = data?.possibleSchedulers.find(
        possibleScheduler => possibleScheduler.id === schedulerId
      )

      if (scheduler) {
        setSelectedScheduler(scheduler)
      }

      if (selectedSchedulerFromAutocomplete) {
        setSelectedScheduler(selectedSchedulerFromAutocomplete)
      }
    },
    [
      data?.possibleSchedulers,
      setSelectedScheduler,
      selectedSchedulerFromAutocomplete
    ]
  )

  const possibleSchedulersOptions = useMemo(
    () =>
      data?.possibleSchedulers.map(({ id, code, role }) => ({
        value: id,
        text: `${role.fullName} - ${code}`
      })) ?? [],
    [data?.possibleSchedulers]
  )

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <ModalForm<FormValues> onSubmit={handleSubmit} title='Change Organizer'>
      <Modal.Content>
        <Form.Select
          disabled
          name='organizer'
          placeholder={organizer.fullName}
          width='full'
          label='Current Organizer'
          options={[]}
        />
        {data?.showPossibleSchedulersAutocomplete ? (
          <ChangeOrganizerPossibleSchedulersAutocomplete
            meetingId={meetingId}
            onSelect={setSelectedSchedulerFromAutocomplete}
          />
        ) : (
          <Form.Select
            required
            name='schedulerId'
            placeholder={NOT_SELECTED_PLACEHOLDER}
            width='full'
            label='Meeting Scheduler'
            options={possibleSchedulersOptions}
            data-testid='scheduler-select'
          />
        )}
      </Modal.Content>

      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />
        <Form.SubmitButton variant='positive'>Done</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ChangeMeetingOrganizerModalContent
