import React, { PropsWithChildren } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { UpdateCommunityLeaderModal } from '../../TalentCommunityLeaderModal'
import { CommunityLeaderData } from '../../../types'

interface Props extends ButtonProps {
  communityLeaderData: CommunityLeaderData
  icon?: JSX.Element
  refetchQueries?: RefetchQueries
  operation: OperationGQL
  hidden?: boolean
  asAction?: boolean
}

const UpdateCommunityLeaderButton = ({
  communityLeaderData,
  refetchQueries,
  icon,
  children,
  operation,
  hidden = false,
  asAction = false,
  ...props
}: PropsWithChildren<Props>) => {
  const { showModal } = useModal(UpdateCommunityLeaderModal, {
    communityLeaderData,
    refetchQueries
  })

  if (!children) {
    return null
  }

  const Component = asAction ? Button.Action : Button

  return (
    <Operation operation={operation} hidden={hidden}>
      <Component icon={icon} onClick={showModal} {...props}>
        {children}
      </Component>
    </Operation>
  )
}

export default UpdateCommunityLeaderButton
