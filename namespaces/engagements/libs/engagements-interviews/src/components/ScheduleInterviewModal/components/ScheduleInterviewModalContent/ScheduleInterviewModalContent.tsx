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
import { ScheduleInterviewFormValues } from '../../../../types'
import ScheduleGenericInterviewModalContent from '../../../ScheduleGenericInterviewModalContent/ScheduleGenericInterviewModalContent'
import {
  GetScheduleInterviewDataDocument,
  ProposeInterviewTimeSlotsDocument,
  ScheduleSingleCommitInterviewDocument
} from '../../data'
import {
  prepareFormDataForClassicScheduling,
  prepareFormDataForTopScheduler
} from '../../../ScheduleGenericInterviewModalContent/utils'
import { getInterviewModalTimeZone } from '../../../../utils'
import { useGetInterviewTimeSlotsForTimeZone } from '../../../../data'
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../config'

export type Props = {
  hideModal: () => void
  engagementId: string
}

const ScheduleInterviewModalContent = ({ hideModal, engagementId }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const { timezones, initialLoading: timezonesInitialLoading } =
    useGetAvailableTimeZones()

  const { data, initialLoading: scheduleInterviewDataInitialLoading } =
    useQuery(GetScheduleInterviewDataDocument, {
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
        kind: data?.node?.newExternalInterview?.kind,
        timeZone: data?.node?.newExternalInterview?.timeZone
      }),
      interviewId: data?.node?.newExternalInterview?.id
    })

  const [scheduleSingleCommitInterview] = useMutation(
    ScheduleSingleCommitInterviewDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const [proposeInterviewTimeSlots] = useMutation(
    ProposeInterviewTimeSlotsDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleSuccess = () => {
    emitMessage(INTERVIEW_SCHEDULED, { engagementId })
    hideModal()
  }

  const saveTopSchedulerInterview = async (
    values: ScheduleInterviewFormValues
  ) => {
    const { data: dataResult } = await scheduleSingleCommitInterview({
      variables: {
        input: {
          engagementId,
          lockVersion: Number(data?.node?.newExternalInterview?.lockVersion),
          ...prepareFormDataForTopScheduler(values)
        }
      }
    })

    return handleMutationResult({
      mutationResult: dataResult?.scheduleSingleCommitInterview,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: handleSuccess
    })
  }

  const saveClassicSchedulingInterview = async (
    values: ScheduleInterviewFormValues
  ) => {
    const { data: dataResult } = await proposeInterviewTimeSlots({
      variables: {
        input: {
          engagementId,
          lockVersion: Number(data?.node?.newExternalInterview?.lockVersion),
          ...prepareFormDataForClassicScheduling(values)
        }
      }
    })

    return handleMutationResult({
      mutationResult: dataResult?.proposeInterviewTimeSlots,
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
    scheduleInterviewDataInitialLoading ||
    timezonesInitialLoading ||
    timeSlotsInitialLoading

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node?.newExternalInterview || !timezones?.length) {
    return null
  }

  return (
    <ScheduleGenericInterviewModalContent
      onSubmit={handleSubmit}
      isTopSchedulerAvailable={isOperationEnabled(
        data.node.newExternalInterview?.operations.scheduleSingleCommitInterview
      )}
      scheduleEngagement={data.node}
      scheduleInterview={data.node.newExternalInterview}
      zoomExperimentEnabled={Boolean(
        data.experiments.clientTalentZoomSupport?.enabled
      )}
      areTopSchedulerTimeSlotsUnavailable={!timeSlots?.length}
      timezones={timezones}
      onClose={hideModal}
      isNew
    />
  )
}

export default ScheduleInterviewModalContent
