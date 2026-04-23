import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import CommitmentChangeContent, {
  CommitmentChangeContentProps
} from '../../modules/engagement/components/CommitmentChangeContent'

export interface Props extends CommitmentChangeContentProps {
  baseAppProps?: BaseAppProps
}

const WidgetCommitmentChange: FC<Props> = memo(
  ({ children, engagementId, baseAppProps }) => {
    const baseProps = useBillingBaseProps()
    const { id: decodedEngagementId } = decodeEntityId(engagementId)

    return (
      <App {...baseProps} {...baseAppProps}>
        <CommitmentChangeContent engagementId={decodedEngagementId}>
          {showModal => children(showModal)}
        </CommitmentChangeContent>
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

export default WidgetCommitmentChange
