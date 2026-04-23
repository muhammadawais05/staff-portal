import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

const JOB_STAGES_NAMES_COLOR = 'dark-grey'

const JobOpportunityStagesNames = ({
  opportunityStagesNames
}: {
  opportunityStagesNames: Maybe<string> | undefined
}) => {
  if (!opportunityStagesNames) {
    return <>{NO_VALUE}</>
  }

  return (
    <TypographyOverflow
      weight='semibold'
      data-testid='job-opportunity-stages-names'
      color={JOB_STAGES_NAMES_COLOR}
    >
      {opportunityStagesNames}
    </TypographyOverflow>
  )
}

export default JobOpportunityStagesNames
