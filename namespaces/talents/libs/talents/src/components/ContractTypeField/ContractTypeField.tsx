import React from 'react'
import { Typography } from '@toptal/picasso'
import { ContractKind } from '@staff-portal/graphql/staff'
import { WrapWithTooltip } from '@staff-portal/ui'

const TYPE_MAP: Record<ContractKind, string> = {
  [ContractKind.CLIENT_SERVICES_AGREEMENT]: 'Client Services Agreement',
  [ContractKind.ENGAGEMENT_LETTER]: 'Engagement Letter',
  [ContractKind.STA]: 'STA',
  [ContractKind.TALENT_AGREEMENT]: 'Talent Agreement',
  [ContractKind.TAX_FORM]: 'Tax Form',
  [ContractKind.TOP]: 'TOP'
}

type Props = {
  kind: ContractKind
  tooltip?: string
}

const ContractTypeField = ({ kind, tooltip }: Props) => {
  return <WrapWithTooltip
    interactive={false}
    enableTooltip={Boolean(tooltip)}
    content={tooltip}
  >
    <Typography as='span' weight='semibold' size='medium'>
      {TYPE_MAP[kind]}
    </Typography>
  </WrapWithTooltip>
}

export default ContractTypeField
