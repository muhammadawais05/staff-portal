import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Alert, Container } from '@toptal/picasso'
import { arrayMutators, Form } from '@toptal/picasso-forms'
import React, { useRef, useState } from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { FormCancelButton } from '@staff-portal/forms'
import { TimeZoneFragment } from '@staff-portal/date-time-utils'

import { ScheduleEngagementFragment } from '../../data/fragments/schedule-engagement-fragment'
import { ScheduleInterviewFragment } from '../../data/fragments/schedule-interview-fragment'
import {
  ScheduleInterviewFormValues,
  ScheduleInterviewSubmitType
} from '../../types'
import ScheduleInterviewForm from '../ScheduleInterviewForm'
import ScheduleInterviewModalHeader from '../ScheduleInterviewModalHeader'
import { ConfirmationModalContent } from './components'
import { adjustFormData } from './utils'

const TOP_SCHEDULER_NOT_AVAILABLE_MESSAGE = 'Top Scheduler is not available.'

export interface Props {
  isTopSchedulerAvailable: boolean
  areTopSchedulerTimeSlotsUnavailable?: boolean
  timezones: TimeZoneFragment[]
  scheduleEngagement: ScheduleEngagementFragment
  scheduleInterview: ScheduleInterviewFragment
  zoomExperimentEnabled: boolean
  isNew?: boolean
  prefix?: string
  buttonPrefix?: string
  onClose: () => void
  onSubmit: (props: {
    isClassic: boolean
    values: ScheduleInterviewFormValues
  }) => ScheduleInterviewSubmitType
}

const ScheduleGenericInterviewModalContent = ({
  isTopSchedulerAvailable,
  areTopSchedulerTimeSlotsUnavailable,
  scheduleEngagement,
  scheduleInterview,
  timezones,
  zoomExperimentEnabled,
  isNew = false,
  prefix = 'Schedule',
  buttonPrefix,
  onClose,
  onSubmit
}: Props) => {
  const { showError } = useNotifications()
  const currentUser = useGetCurrentUser()

  const { job } = scheduleEngagement

  const [isClassic, setIsClassic] = useState(!isTopSchedulerAvailable)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const showClaimer = currentUser?.id !== job?.claimer?.id

  const title = isClassic
    ? `${prefix} Interview`
    : `${prefix} Top Scheduler Interview`

  const buttonText = `${buttonPrefix ?? prefix} Interview`

  const initialValues = useRef(
    adjustFormData({
      scheduleEngagement,
      scheduleInterview,
      currentUserTimeZone: currentUser?.timeZone
    })
  )

  const handleToggle = () => setIsClassic(value => !value)

  const handleConfirmationStep = () =>
    setIsConfirmationOpen(prevIsConfirmationOpen => !prevIsConfirmationOpen)

  const handleSubmit = async (values: ScheduleInterviewFormValues) => {
    if (isNew || isConfirmationOpen) {
      if (!isClassic && areTopSchedulerTimeSlotsUnavailable) {
        return showError(TOP_SCHEDULER_NOT_AVAILABLE_MESSAGE)
      }

      const errors = await onSubmit({ isClassic, values })

      if (errors && isConfirmationOpen) {
        setIsConfirmationOpen(false)
      }

      return errors
    }

    return handleConfirmationStep()
  }

  const handleOnClose = () => {
    if (isConfirmationOpen) {
      return handleConfirmationStep()
    }

    return onClose()
  }

  return (
    <ModalForm<ScheduleInterviewFormValues>
      initialValues={initialValues.current}
      title={title}
      onSubmit={handleSubmit}
      mutators={{ ...arrayMutators }}
    >
      <Modal.Content>
        {!isClassic &&
          !isConfirmationOpen &&
          areTopSchedulerTimeSlotsUnavailable && (
            <Container
              bottom='xsmall'
              data-testid='ScheduleGenericInterviewModal-top-scheduler-not-available'
            >
              <Alert variant='red'>{TOP_SCHEDULER_NOT_AVAILABLE_MESSAGE}</Alert>
            </Container>
          )}

        {isConfirmationOpen && !isNew ? (
          <ConfirmationModalContent showClaimerWarning={showClaimer} />
        ) : (
          <>
            <ScheduleInterviewModalHeader
              isTopSchedulerAvailable={isTopSchedulerAvailable}
              isClassic={isClassic}
              showClaimerWarning={showClaimer}
              onToggle={handleToggle}
            />

            <ScheduleInterviewForm
              isClassic={isClassic}
              scheduleEngagement={scheduleEngagement}
              scheduleInterview={scheduleInterview}
              timezones={timezones}
              zoomExperimentEnabled={zoomExperimentEnabled}
              isNew={isNew}
            />
          </>
        )}
      </Modal.Content>

      <Modal.Actions>
        <FormCancelButton onClick={handleOnClose} />
        <Form.SubmitButton
          data-testid='ScheduleGenericInterviewModal-submit-button'
          variant='positive'
        >
          {buttonText}
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ScheduleGenericInterviewModalContent
