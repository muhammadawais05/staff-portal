import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'

import { ScheduleInterviewFormValues } from '../../../../types'
import ScheduleGenericInterviewModalContent from '../../../ScheduleGenericInterviewModalContent/ScheduleGenericInterviewModalContent'
import {
  GetRescheduleInterviewDataDocument,
  ClearAndChangeInterviewProposedTimeSlotsDocument,
  ClearAndRescheduleSingleCommitInterviewDocument
} from '../../data'
import {
  prepareFormDataForClassicScheduling,
  prepareFormDataForTopScheduler
} from '../../../ScheduleGenericInterviewModalContent/utils'
import { INTERVIEW_UPDATED } from '../../../../messages'
import { useGetInterviewTimeSlotsForTimeZone } from '../../../../data'
import { getInterviewModalTimeZone } from '../../../../utils'
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../config'

export type Props = {
  hideModal: () => void
  interviewId: string
}

const RescheduleInterviewModalContent = ({ hideModal, interviewId }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const { timezones, initialLoading: timezonesInitialLoading } =
    useGetAvailableTimeZones()

  const { data, initialLoading: rescheduleInterviewDataInitialLoading } =
    useQuery(GetRescheduleInterviewDataDocument, {
      variables: { interviewId },
      onError: () => {
        showError('An error occurred, unable to get data.')
        hideModal()
      }
    })

  const currentUser = useGetCurrentUser()

  const { timeSlots, timeSlotsInitialLoading } =
    useGetInterviewTimeSlotsForTimeZone({
      timeZoneName: getInterviewModalTimeZone({
        clientTimeZone: data?.node?.engagement?.client?.timeZone,
        currentUserTimeZone: currentUser?.timeZone,
        kind: data?.node?.kind,
        timeZone: data?.node?.timeZone
      }),
      interviewId: data?.node?.id
    })

  const [clearAndRescheduleSingleCommitInterview] = useMutation(
    ClearAndRescheduleSingleCommitInterviewDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const [clearAndChangeInterviewProposedTimeSlots] = useMutation(
    ClearAndChangeInterviewProposedTimeSlotsDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleSuccess = () => {
    if (data?.node?.engagement?.id) {
      emitMessage(INTERVIEW_UPDATED, {
        interviewId,
        engagementId: data.node.engagement.id
      })
    }
    hideModal()
  }

  const saveTopSchedulerInterview = async (
    values: ScheduleInterviewFormValues
  ) => {
    const { data: dataResult } = await clearAndRescheduleSingleCommitInterview({
      variables: {
        input: {
          interviewId,
          lockVersion: Number(data?.node?.lockVersion),
          ...prepareFormDataForTopScheduler(values)
        }
      }
    })

    return handleMutationResult({
      mutationResult: dataResult?.clearAndRescheduleSingleCommitInterview,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: handleSuccess
    })
  }

  const saveClassicSchedulingInterview = async (
    values: ScheduleInterviewFormValues
  ) => {
    const { data: dataResult } = await clearAndChangeInterviewProposedTimeSlots(
      {
        variables: {
          input: {
            interviewId,
            lockVersion: Number(data?.node?.lockVersion),
            ...prepareFormDataForClassicScheduling(values)
          }
        }
      }
    )

    return handleMutationResult({
      mutationResult: dataResult?.clearAndChangeInterviewProposedTimeSlots,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: handleSuccess
    })
  }

  const handleSubmit = ({
    isClassic,
    values
  }: {
    isClassic: boolean
    values: ScheduleInterviewFormValues
  }) => {
    if (isClassic) {
      return saveClassicSchedulingInterview(values)
    }

    return saveTopSchedulerInterview(values)
  }

  const loading =
    rescheduleInterviewDataInitialLoading ||
    timezonesInitialLoading ||
    timeSlotsInitialLoading

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node?.engagement || !timezones?.length) {
    return null
  }

  return (
    <ScheduleGenericInterviewModalContent
      onSubmit={handleSubmit}
      isTopSchedulerAvailable={isOperationEnabled(
        data.node.operations.clearAndRescheduleSingleCommitInterview
      )}
      scheduleEngagement={data.node.engagement}
      scheduleInterview={data.node}
      areTopSchedulerTimeSlotsUnavailable={!timeSlots?.length}
      zoomExperimentEnabled={Boolean(
        data.experiments.clientTalentZoomSupport?.enabled
      )}
      timezones={timezones}
      onClose={hideModal}
      prefix='Reschedule'
    />
  )
}

export default RescheduleInterviewModalContent
