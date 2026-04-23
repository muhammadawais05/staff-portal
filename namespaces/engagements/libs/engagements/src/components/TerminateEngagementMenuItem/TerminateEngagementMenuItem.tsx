import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'
import { Operation } from '@staff-portal/operations'

import TerminateEngagementModal from '../TerminateEngagementModal'
import { getTerminateEngagementTitle } from '../../services'

type Props = {
  engagementId: string
  operation: OperationType
  talentCount?: Maybe<number>
}

const TerminateEngagementMenuItem = ({
  engagementId,
  operation,
  talentCount
}: Props) => {
  const title = getTerminateEngagementTitle(talentCount)
  const { showModal } = useModal(TerminateEngagementModal, {
    engagementId,
    talentCount
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='terminate-trial'
          onClick={showModal}
          disabled={disabled}
        >
          {title}
        </Menu.Item>
      )}
    />
  )
}

export default TerminateEngagementMenuItem
