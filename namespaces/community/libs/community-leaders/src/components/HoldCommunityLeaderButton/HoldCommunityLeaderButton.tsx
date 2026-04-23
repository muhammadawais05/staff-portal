import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import CommunityLeaderApplicationResponseModal from '../CommunityLeaderApplicationResponseModal/CommunityLeaderApplicationResponseModal'
import { useHoldCommunityLeader } from '../../data/hold-community-leader'

interface Props extends Omit<ButtonProps, 'children'> {
  id: string
  name: string
  operation: OperationGQL
  refetchQueries?: RefetchQueries
  onHoldLeader?: () => void
  children?: ReactNode
}

const HoldCommunityLeaderButton = ({
  id,
  name,
  operation,
  refetchQueries,
  onHoldLeader,
  children,
  ...props
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [holdCommunityLeader, { loading }] = useHoldCommunityLeader({
    onError() {
      showError(`Could not hold ${name} Community Leader application`)
    }
  })

  const handleConfirm = async ({ comment }: { comment: string }) => {
    if (loading) {
      return
    }

    const { data } = await holdCommunityLeader({
      variables: {
        id,
        comment
      },
      refetchQueries
    })

    return handleMutationResult({
      mutationResult: data?.holdCommunityLeaderApplication,
      successNotificationMessage: `${name} application was successfully holded.`,
      onSuccessAction: () => {
        onHoldLeader?.()
      }
    })
  }

  const { showModal } = useModal(CommunityLeaderApplicationResponseModal, {
    title: `Pause ${name} Community Leader application`,
    loading,
    requireComment: true,
    onSubmit: handleConfirm
  })

  const ButtonComponent = props.icon ? Button.Action : Button

  return (
    <Operation operation={operation}>
      <ButtonComponent
        size='small'
        variant='secondary'
        {...props}
        onClick={showModal}
      >
        {children ?? 'Pause Application'}
      </ButtonComponent>
    </Operation>
  )
}

export default HoldCommunityLeaderButton
