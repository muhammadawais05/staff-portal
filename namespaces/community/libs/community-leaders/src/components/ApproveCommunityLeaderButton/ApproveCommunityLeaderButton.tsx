import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { useModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { useApproveCommunityLeader } from '../../data/approve-community-leader'
import CommunityLeaderApplicationResponseModal from '../CommunityLeaderApplicationResponseModal/CommunityLeaderApplicationResponseModal'

interface Props extends Omit<ButtonProps, 'children'> {
  id: string
  name: string
  operation: OperationGQL
  refetchQueries?: RefetchQueries
  onApproveLeader?: () => void
  children?: ReactNode
}

const ApproveCommunityLeaderButton = ({
  id,
  name,
  operation,
  refetchQueries,
  onApproveLeader,
  children,
  ...props
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const endsWithS = name.endsWith('s')

  const applicantName = endsWithS ? `${name}'` : `${name}'s`

  const [approveCommunityLeader, { loading }] = useApproveCommunityLeader({
    onError() {
      showError(`Could not approve ${name} as Community Leader`)
    }
  })

  const handleConfirm = async ({ comment }: { comment: string }) => {
    if (loading) {
      return
    }

    const { data } = await approveCommunityLeader({
      variables: {
        id,
        comment
      },
      refetchQueries
    })

    return handleMutationResult({
      mutationResult: data?.approveCommunityLeaderApplication,
      successNotificationMessage: `${applicantName} application was successfully approved.`,
      onSuccessAction: () => {
        onApproveLeader?.()
      }
    })
  }

  const { showModal } = useModal(CommunityLeaderApplicationResponseModal, {
    title: `Approve ${applicantName} Community Leader Application`,
    loading,
    requireComment: false,
    onSubmit: handleConfirm,
    submitText: 'Approve'
  })

  const ButtonComponent = props.icon ? Button.Action : Button

  return (
    <Operation operation={operation}>
      <ButtonComponent
        size='small'
        variant='positive'
        {...props}
        onClick={showModal}
      >
        {children ?? 'Approve Application'}
      </ButtonComponent>
    </Operation>
  )
}

export default ApproveCommunityLeaderButton
