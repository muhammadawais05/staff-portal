import React, { useMemo, useCallback } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { FormCancelButton } from '@staff-portal/forms'
import { useQuery } from '@staff-portal/data-layer-service'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { SchedulerForBecomeOrganizerFragment } from './data/get-possible-schedulers-for-become-organizer/'
import { MeetingFragment } from '../../../../data/meeting-fragment'
import { GetPossibleSchedulersForBecomeOrganizerDocument } from './data/get-possible-schedulers-for-become-organizer'
import { calculateTill } from '../../utils/calculate-till'

type FormValues = { schedulerId: string }

export type Props = {
  hideModal: () => void
  setSelectedScheduler: (
    scheduler: SchedulerForBecomeOrganizerFragment | null
  ) => void
} & Pick<
  MeetingFragment,
  'id' | 'organizer' | 'scheduledAt' | 'durationMinutes'
>

const BecomeMeetingOrganizerModalsSelectContent = ({
  hideModal,
  setSelectedScheduler,
  id: meetingId,
  organizer,
  scheduledAt,
  durationMinutes
}: Props) => {
  const { data, loading } = useQuery(
    GetPossibleSchedulersForBecomeOrganizerDocument,
    {
      variables: {
        meetingId,
        from: scheduledAt,
        till: calculateTill(scheduledAt, durationMinutes)
      },
      fetchPolicy: 'cache-first'
    }
  )

  const possibleSchedulers =
    data?.node?.possibleSchedulersForBecomeOrganizer.nodes

  const handleSubmit = useCallback(
    ({ schedulerId }: FormValues) => {
      const scheduler = possibleSchedulers?.find(
        possibleScheduler => possibleScheduler.id === schedulerId
      )

      if (scheduler) {
        setSelectedScheduler(scheduler)
      }
    },
    [possibleSchedulers, setSelectedScheduler]
  )

  const possibleSchedulersOptions = useMemo(
    () =>
      possibleSchedulers?.map(({ id, code }) => ({
        value: id,
        text: code
      })) ?? [],
    [possibleSchedulers]
  )

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <ModalForm<FormValues>
      title='Assign self as organizer'
      onSubmit={handleSubmit}
      initialValues={{ schedulerId: possibleSchedulersOptions[0]?.value }}
    >
      <Modal.Content>
        <Form.Select
          disabled
          options={[]}
          width='full'
          name='organizer'
          label='Current Organizer'
          placeholder={organizer.fullName}
          data-testid='current-meeting-organizer-select'
        />
        <Form.Select
          required
          width='full'
          name='schedulerId'
          placeholder={NOT_SELECTED_PLACEHOLDER}
          label='Meeting Scheduler'
          options={possibleSchedulersOptions}
          data-testid='assign-self-as-organizer-select'
        />
      </Modal.Content>
      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />
        <Form.SubmitButton variant='positive'>Confirm</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default BecomeMeetingOrganizerModalsSelectContent
