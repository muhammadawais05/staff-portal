import { useState } from 'react'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'
import {
  EngagementFragment,
  useUpdateInterviewGoogleEventModal
} from '@staff-portal/engagements-interviews'
import { useCommonEngagementActions } from '@staff-portal/engagements'

interface Props {
  engagement: EngagementFragment
}

export const useGetRenderMoreButtonActions = ({ engagement }: Props) => {
  const [operationIsLoading, setOperationIsLoading] = useState(false)

  const { isInInterviewStatus } = useCommonEngagementActions({ engagement })

  const editInterviewDetailsOperation =
    engagement?.interview?.operations?.updateInterviewGoogleCalendarEvent
  const {
    loading: updateInterviewGoogleEventLoading,
    showModal: showUpdateInterviewGoogleEventModal
  } = useUpdateInterviewGoogleEventModal(engagement?.interview?.id as string)
  const renderEditInterviewDetailsLazyOperation = useRenderLazyOperation({
    initialOperation: editInterviewDetailsOperation,
    getLazyOperationVariables: {
      nodeId: engagement?.interview?.id as string,
      nodeType: NodeType.INTERVIEW,
      operationName: 'updateInterviewGoogleCalendarEvent'
    },
    onSettled: () => setOperationIsLoading(false),
    onSuccess: showUpdateInterviewGoogleEventModal
  })

  const handleOperationClick = (checkOperation: () => void) => () => {
    setOperationIsLoading(true)
    checkOperation()
  }

  const loading = operationIsLoading || updateInterviewGoogleEventLoading

  return {
    loading,
    isInInterviewStatus,
    handleOperationClick,
    renderEditInterviewDetailsLazyOperation
  }
}
