import React, { memo } from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'

import { ProfileItemFragment } from '../../../../data'
import IndustryTagTooltip from '../IndustryTagTooltip'
import IndustryTag from '../IndustryTag'

export type Props = {
  industryName: string
  connectionsCount: number
  profileItems: ProfileItemFragment[]
}

const IndustryTagWithTooltip = ({
  industryName,
  connectionsCount,
  profileItems
}: Props) => (
  <WrapWithTooltip
    content={<IndustryTagTooltip profileItems={profileItems} />}
    placement='bottom'
    interactive={false}
    enableTooltip={!!connectionsCount}
  >
    <IndustryTag
      industryName={industryName}
      connectionsCount={connectionsCount}
    />
  </WrapWithTooltip>
)

export default memo(IndustryTagWithTooltip)
