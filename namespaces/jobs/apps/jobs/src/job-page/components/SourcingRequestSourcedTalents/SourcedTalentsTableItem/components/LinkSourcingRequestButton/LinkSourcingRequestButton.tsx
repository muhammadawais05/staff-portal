import React, { memo } from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@staff-portal/error-handling'
import { Operation, OperationType } from '@staff-portal/operations'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useLinkJobSourcingRequest } from './data/link-sourcing-request'

export interface Props {
  jobId: string
  operation: OperationType
  talentId: string
}

const LinkSourcingRequestButton = ({
  jobId,
  operation,
  talentId
}: Props) => {
  const { showError } = useNotifications()

  const { linkSourcingRequest, loading } = useLinkJobSourcingRequest({
    onError: () =>
      showError(`Unable to link the talent profile to the sourcing request.`)
  })

  const { handleMutationResult } = useHandleMutationResult()

  const handleClick = async () => {
    const { data } = await linkSourcingRequest(talentId, jobId)

    return handleMutationResult({
      mutationResult: data?.linkSourcingRequest,
      successNotificationMessage: `The talent profile was successfully linked to the sourcing request.`
    })
  }

  return (
    <Operation operation={operation}>
      <Button
        size='small'
        variant='secondary'
        onClick={handleClick}
        disabled={operation.callable === OperationCallableTypes.DISABLED}
        loading={loading}
        data-testid='link-sourcing-request-button'
      >
        Link
      </Button>
    </Operation>
  )
}

export default memo(LinkSourcingRequestButton)
