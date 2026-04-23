import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { useRejectCommunityLeaderApplication } from '../../data/reject-community-leader'
import CommunityLeaderApplicationResponseModal from '../CommunityLeaderApplicationResponseModal/CommunityLeaderApplicationResponseModal'

interface Props extends Omit<ButtonProps, 'children'> {
  id: string
  name: string
  operation: OperationGQL
  refetchQueries?: RefetchQueries
  onRejectLeader?: () => void
  children?: ReactNode
}

const RejectCommunityLeaderButton = ({
  id,
  name,
  operation,
  refetchQueries,
  onRejectLeader,
  children,
  ...props
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [rejectCommunityLeader, { loading }] =
    useRejectCommunityLeaderApplication({
      onError() {
        showError(`Could not reject ${name} as Community Leader`)
      }
    })

  const handleConfirm = async ({ comment }: { comment: string }) => {
    if (loading) {
      return
    }

    const { data } = await rejectCommunityLeader({
      variables: {
        id,
        comment
      },
      refetchQueries
    })

    return handleMutationResult({
      mutationResult: data?.rejectCommunityLeaderApplication,
      successNotificationMessage: `${name} application was successfully rejected.`,
      onSuccessAction: () => {
        onRejectLeader?.()
      }
    })
  }

  const endsWithS = name.endsWith('s')

  const applicantName = endsWithS ? `${name}'` : `${name}'s`

  const { showModal } = useModal(CommunityLeaderApplicationResponseModal, {
    title: `Reject ${applicantName} Community Leader Application`,
    loading,
    requireComment: true,
    onSubmit: handleConfirm,
    submitText: 'Reject',
    buttonVariant: 'negative'
  })

  const ButtonComponent = props.icon ? Button.Action : Button

  return (
    <Operation operation={operation}>
      <ButtonComponent
        size='small'
        variant='negative'
        {...props}
        onClick={showModal}
      >
        {children ?? 'Reject Application'}
      </ButtonComponent>
    </Operation>
  )
}

export default RejectCommunityLeaderButton
