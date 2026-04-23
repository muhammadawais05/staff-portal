import React from 'react'
import { DetailedList } from '@staff-portal/ui'

import { LABEL_COLUMN_WIDTH } from '../../../../utils/constants'
import { OpportunityAttributionFragment } from '../../data'
import { useOpportunityAttributionItems } from '../../utils/use-opportunity-attribution-items'

interface Props {
  opportunityAttribution: OpportunityAttributionFragment
}

export const OpportunityAttributionContent = ({
  opportunityAttribution
}: Props) => {
  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList
      columns={2}
      striped
      multilines
      labelColumnWidth={LABEL_COLUMN_WIDTH}
      items={useOpportunityAttributionItems({
        opportunityAttribution
      })}
    />
  )
}

export default OpportunityAttributionContent
