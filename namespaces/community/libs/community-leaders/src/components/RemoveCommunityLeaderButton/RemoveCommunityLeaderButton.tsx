import React, { PropsWithChildren } from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useRemoveCommunityLeader } from '../../data/remove-community-leader'

interface Props {
  id: string
  name: string
  refetchQueries?: RefetchQueries
  onRemoveLeader?: () => void
  render?: (action: () => void, loading: boolean) => JSX.Element
  operation: OperationGQL
  hidden?: boolean
}

const RemoveCommunityLeaderButton = ({
  id,
  name,
  refetchQueries,
  onRemoveLeader,
  render,
  children,
  operation,
  hidden = false
}: PropsWithChildren<Props>) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [removeCommunityLeader, { loading }] = useRemoveCommunityLeader({
    onError() {
      showError('Could not remove Community Leader')
    }
  })

  const handleConfirm = async () => {
    if (loading) {
      return
    }

    const { data } = await removeCommunityLeader({
      variables: {
        input: {
          id
        }
      },
      refetchQueries
    })

    return handleMutationResult({
      mutationResult: data?.removeCommunityLeader,
      successNotificationMessage: `Community Leader ${name} was removed successfully`,
      onSuccessAction: () => {
        onRemoveLeader?.()
      }
    })
  }

  return (
    <Operation operation={operation} hidden={hidden}>
      {render ? (
        render(handleConfirm, loading)
      ) : (
        <Button
          size='small'
          variant='negative'
          disabled={loading}
          onClick={handleConfirm}
        >
          {children ?? 'Remove Community Leader'}
        </Button>
      )}
    </Operation>
  )
}

export default RemoveCommunityLeaderButton
