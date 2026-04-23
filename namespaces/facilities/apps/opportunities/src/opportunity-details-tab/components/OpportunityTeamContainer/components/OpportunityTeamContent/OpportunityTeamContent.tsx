import React from 'react'

import { OpportunityTeamFragment } from '../../data'
import EnterpriseOpportunityInternalTeamContent from '../EnterpriseOpportunityInternalTeamContent'
import ProjectOpportunityInternalTeamContent from '../ProjectOpportunityInternalTeamContent'

interface Props {
  opportunity: OpportunityTeamFragment
}

const OpportunityTeamContent = ({ opportunity }: Props) => {
  const { enterprise } = opportunity

  if (enterprise) {
    return (
      <EnterpriseOpportunityInternalTeamContent opportunity={opportunity} />
    )
  }

  return <ProjectOpportunityInternalTeamContent opportunity={opportunity} />
}

export default OpportunityTeamContent
