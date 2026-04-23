import React from 'react'
import {
  SendTopButton,
  ImportContractAsTopButton,
  ImportTopButton,
  EngagementCommonActionsFragment
} from '@staff-portal/engagements'

export type Props = {
  engagement: EngagementCommonActionsFragment
}

const JobContractsActions = ({ engagement }: Props) => {
  return (
    <>
      <SendTopButton
        engagementId={engagement.id}
        clientHasStaSigned={Boolean(engagement.client?.contracts?.totalCount)}
        operation={engagement.operations.sendTop}
      />

      <ImportTopButton
        engagementId={engagement.id}
        operation={engagement.operations.importTop}
      />

      <ImportContractAsTopButton engagement={engagement} />
    </>
  )
}

export default JobContractsActions
