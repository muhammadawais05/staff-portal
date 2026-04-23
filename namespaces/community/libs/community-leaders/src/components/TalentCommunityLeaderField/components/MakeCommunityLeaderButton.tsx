import React, { PropsWithChildren } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { MakeCommunityLeaderModal } from '../../TalentCommunityLeaderModal'
import { CommunityLeaderBasicInfo } from '../../../types'

interface Props extends ButtonProps {
  communityLeaderBasicInfo: CommunityLeaderBasicInfo
  icon?: JSX.Element
  refetchQueries?: RefetchQueries
  operation: OperationGQL
  hidden?: boolean
  asAction?: boolean
}

const MakeCommunityLeaderButton = ({
  communityLeaderBasicInfo,
  disabled = false,
  refetchQueries,
  icon,
  children,
  operation,
  hidden = false,
  asAction = false,
  ...props
}: PropsWithChildren<Props>) => {
  const { showModal } = useModal(MakeCommunityLeaderModal, {
    communityLeaderBasicInfo,
    refetchQueries
  })

  if (!children) {
    return null
  }

  const Component = asAction ? Button.Action : Button

  return (
    <Operation operation={operation} hidden={hidden}>
      <Component icon={icon} onClick={showModal} disabled={disabled} {...props}>
        {children}
      </Component>
    </Operation>
  )
}

export default MakeCommunityLeaderButton
