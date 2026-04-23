import React from 'react'
import { DetailedList } from '@staff-portal/ui'

import { OpportunityDetailsFragment } from '../../data'
import { useOpportunityDetailItems } from '../../utils/use-opportunity-detail-items'
import { LABEL_COLUMN_WIDTH } from '../../../../utils/constants'
import { useOpportunityDetailSingleColumnItems } from '../../utils/use-opportunity-detail-single-column-items'

interface Props {
  opportunityDetails: OpportunityDetailsFragment
}

const OpportunityDetailsContent = ({ opportunityDetails }: Props) => {
  return (
    <>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        columns={1}
        multilines
        labelColumnWidth={LABEL_COLUMN_WIDTH}
        items={useOpportunityDetailSingleColumnItems({
          opportunityDetails
        })}
      />
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        columns={2}
        labelColumnWidth={LABEL_COLUMN_WIDTH}
        items={useOpportunityDetailItems({
          opportunityDetails
        })}
      />
    </>
  )
}

export default OpportunityDetailsContent
