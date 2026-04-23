import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { useCompleteMeeting } from '../../data'

export interface Props {
  meetingId: string
  muted: boolean
  operation: Operation
}

const MeetingMarkAsCompletedButton = ({
  meetingId,
  muted,
  operation
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [completeMeeting, { loading: mutationLoading }] = useCompleteMeeting()

  const submit = async () => {
    const { data } = await completeMeeting({
      variables: {
        meetingId
      }
    })

    return handleMutationResult({
      mutationResult: data?.completeMeeting,
      successNotificationMessage: 'Meeting was marked as "Completed"'
    })
  }

  const renderOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: meetingId,
      nodeType: NodeType.MEETING,
      operationName: 'completeMeeting'
    },
    onSuccess: () => {
      submit()
    }
  })

  return (
    <>
      {renderOperation(({ disabled, loading, checkOperation }) => (
        <Button
          size='small'
          variant={muted ? 'secondary' : 'positive'}
          titleCase={false}
          loading={loading || mutationLoading}
          disabled={disabled}
          onClick={checkOperation}
        >
          Mark as Completed
        </Button>
      ))}
    </>
  )
}

export default MeetingMarkAsCompletedButton
