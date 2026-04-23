import React from 'react'
import { DetailedList } from '@staff-portal/ui'

import { LABEL_COLUMN_WIDTH } from '../../../../utils/constants'
import { OpportunityTimelineFragment } from '../../data'
import { useOpportunityTimelineItems } from '../../utils/use-opportunity-timeline-items'

interface Props {
  opportunityTimeline: OpportunityTimelineFragment
}

export const OpportunityTimelineContent = ({ opportunityTimeline }: Props) => {
  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList
      columns={2}
      multilines
      labelColumnWidth={LABEL_COLUMN_WIDTH}
      items={useOpportunityTimelineItems({
        opportunityTimeline
      })}
    />
  )
}

export default OpportunityTimelineContent
