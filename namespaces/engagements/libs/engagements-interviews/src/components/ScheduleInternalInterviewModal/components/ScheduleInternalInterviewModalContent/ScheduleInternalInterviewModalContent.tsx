import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'

import { INTERVIEW_SCHEDULED } from '../../../../messages'
import { ScheduleInternalInterviewFormValues } from '../../../../types'
import ScheduleGenericInterviewModalContent from '../../../ScheduleGenericInterviewModalContent/ScheduleGenericInterviewModalContent'
import {
  GetScheduleInternalInterviewDataDocument,
  ProposeInternalInterviewTimeSlotsDocument,
  ScheduleInternalSingleCommitInterviewDocument
} from '../../data'
import {
  prepareFormDataForInternalClassicScheduling,
  prepareFormDataForInternalTopScheduler
} from '../../../ScheduleGenericInterviewModalContent/utils'
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
} from '../../../ScheduleInterviewModal/config'
import { useGetInterviewTimeSlotsForTimeZone } from '../../../../data'
import { getInterviewModalTimeZone } from '../../../../utils'

export type Props = {
  hideModal: () => void
  engagementId: string
}

const ScheduleInternalInterviewModalContent = ({
  hideModal,
  engagementId
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const { timezones, initialLoading: timezonesInitialLoading } =
    useGetAvailableTimeZones()

  const { data, initialLoading: scheduleInterviewDataInitialLoading } =
    useQuery(GetScheduleInternalInterviewDataDocument, {
      variables: { engagementId },
      onError: () => {
        showError('An error occurred, unable to get data.')
        hideModal()
      }
    })

  const currentUser = useGetCurrentUser()

  const { timeSlots, timeSlotsInitialLoading } =
    useGetInterviewTimeSlotsForTimeZone({
      timeZoneName: getInterviewModalTimeZone({
        clientTimeZone: data?.node?.client?.timeZone,
        currentUserTimeZone: currentUser?.timeZone,
        kind: data?.node?.newInternalInterview?.kind,
        timeZone: data?.node?.newInternalInterview?.timeZone
      }),
      interviewId: data?.node?.newInternalInterview?.id
    })

  const [scheduleSingleCommitInterview] = useMutation(
    ScheduleInternalSingleCommitInterviewDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const [proposeInterviewTimeSlots] = useMutation(
    ProposeInternalInterviewTimeSlotsDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleSuccess = () => {
    emitMessage(INTERVIEW_SCHEDULED, { engagementId })
    hideModal()
  }

  const saveTopSchedulerInterview = async (
    values: ScheduleInternalInterviewFormValues
  ) => {
    if (!data?.node?.newInternalInterview) {
      return
    }

    const { data: dataResult } = await scheduleSingleCommitInterview({
      variables: {
        input: {
          engagementId,
          lockVersion: Number(data?.node?.newInternalInterview?.lockVersion),
          ...prepareFormDataForInternalTopScheduler({
            values,
            gcUserReceivers: [],
            scheduleEngagement: data.node,
            scheduleInterview: data.node.newInternalInterview
          })
        }
      }
    })

    return handleMutationResult({
      mutationResult: dataResult?.scheduleInternalSingleCommitInterview,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: handleSuccess
    })
  }

  const saveClassicSchedulingInterview = async (
    values: ScheduleInternalInterviewFormValues
  ) => {
    if (!data?.node?.newInternalInterview) {
      return
    }

    const { data: dataResult } = await proposeInterviewTimeSlots({
      variables: {
        input: {
          engagementId,
          lockVersion: Number(data?.node?.newInternalInterview?.lockVersion),
          ...prepareFormDataForInternalClassicScheduling({
            values,
            gcUserReceivers: [],
            scheduleEngagement: data.node,
            scheduleInterview: data.node.newInternalInterview
          })
        }
      }
    })

    return handleMutationResult({
      mutationResult: dataResult?.proposeInternalInterviewTimeSlots,
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
    scheduleInterviewDataInitialLoading ||
    timezonesInitialLoading ||
    timeSlotsInitialLoading

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node?.newInternalInterview || !timezones?.length) {
    return null
  }

  return (
    <ScheduleGenericInterviewModalContent
      onSubmit={handleSubmit}
      isTopSchedulerAvailable={isOperationEnabled(
        data.node.newInternalInterview?.operations
          .scheduleInternalSingleCommitInterview
      )}
      scheduleEngagement={data.node}
      scheduleInterview={data.node.newInternalInterview}
      areTopSchedulerTimeSlotsUnavailable={!timeSlots?.length}
      zoomExperimentEnabled={Boolean(
        data.experiments.clientTalentZoomSupport?.enabled
      )}
      timezones={timezones}
      onClose={hideModal}
      buttonPrefix='Schedule Internal'
      isNew
    />
  )
}

export default ScheduleInternalInterviewModalContent
