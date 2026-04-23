import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'

import { INTERVIEW_UPDATED } from '../../../../messages'
import { ScheduleInternalInterviewFormValues } from '../../../../types'
import {
  GetRescheduleInternalInterviewDataDocument,
  ClearAndChangeInternalInterviewProposedTimeSlotsDocument,
  ClearAndRescheduleInternalSingleCommitInterviewDocument
} from '../../data'
import ScheduleGenericInterviewModalContent from '../../../ScheduleGenericInterviewModalContent/ScheduleGenericInterviewModalContent'
import {
  prepareFormDataForInternalClassicScheduling,
  prepareFormDataForInternalTopScheduler
} from '../../../ScheduleGenericInterviewModalContent/utils'
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
} from '../../../RescheduleInterviewModal/config'
import { useGetInterviewTimeSlotsForTimeZone } from '../../../../data'
import { getInterviewModalTimeZone } from '../../../../utils'

export type Props = {
  hideModal: () => void
  interviewId: string
}

const RescheduleInternalInterviewModalContent = ({
  hideModal,
  interviewId
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const { timezones, initialLoading: timezonesInitialLoading } =
    useGetAvailableTimeZones()

  const { data, initialLoading: rescheduleInterviewDataInitialLoading } =
    useQuery(GetRescheduleInternalInterviewDataDocument, {
      variables: { interviewId },
      onError: () => {
        showError('An error occurred, unable to get data.')
        hideModal()
      }
    })

  const currentUser = useGetCurrentUser()

  const { timeSlots, timeSlotsInitialLoading: timeSlotsInitialLoading } =
    useGetInterviewTimeSlotsForTimeZone({
      timeZoneName: getInterviewModalTimeZone({
        clientTimeZone: data?.node?.engagement?.client?.timeZone,
        currentUserTimeZone: currentUser?.timeZone,
        kind: data?.node?.kind,
        timeZone: data?.node?.timeZone
      }),
      interviewId: data?.node?.id
    })

  const [clearAndRescheduleInternalSingleCommitInterview] = useMutation(
    ClearAndRescheduleInternalSingleCommitInterviewDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const [clearAndChangeInternalInterviewProposedTimeSlots] = useMutation(
    ClearAndChangeInternalInterviewProposedTimeSlotsDocument,
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
    values: ScheduleInternalInterviewFormValues
  ) => {
    if (!data?.node?.engagement) {
      return
    }

    const { data: dataResult } =
      await clearAndRescheduleInternalSingleCommitInterview({
        variables: {
          input: {
            interviewId,
            lockVersion: Number(data?.node?.lockVersion),
            ...prepareFormDataForInternalTopScheduler({
              values,
              gcUserReceivers: [],
              scheduleEngagement: data.node.engagement,
              scheduleInterview: data.node
            })
          }
        }
      })

    return handleMutationResult({
      mutationResult:
        dataResult?.clearAndRescheduleInternalSingleCommitInterview,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: handleSuccess
    })
  }

  const saveClassicSchedulingInterview = async (
    values: ScheduleInternalInterviewFormValues
  ) => {
    if (!data?.node?.engagement) {
      return
    }

    const { data: dataResult } =
      await clearAndChangeInternalInterviewProposedTimeSlots({
        variables: {
          input: {
            interviewId,
            lockVersion: Number(data?.node?.lockVersion),
            ...prepareFormDataForInternalClassicScheduling({
              values,
              gcUserReceivers: [],
              scheduleEngagement: data.node.engagement,
              scheduleInterview: data.node
            })
          }
        }
      })

    return handleMutationResult({
      mutationResult:
        dataResult?.clearAndChangeInternalInterviewProposedTimeSlots,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: handleSuccess
    })
  }

  const handleSubmit = ({
    isClassic = false,
    values
  }: {
    isClassic?: boolean
    values: ScheduleInternalInterviewFormValues
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
        data.node.operations.clearAndRescheduleInternalSingleCommitInterview
      )}
      scheduleEngagement={data.node.engagement}
      scheduleInterview={data.node}
      areTopSchedulerTimeSlotsUnavailable={!timeSlots?.length}
      timezones={timezones}
      zoomExperimentEnabled={Boolean(
        data.experiments.clientTalentZoomSupport?.enabled
      )}
      onClose={hideModal}
      buttonPrefix='Reschedule Internal'
      prefix='Reschedule'
    />
  )
}

export default RescheduleInternalInterviewModalContent
