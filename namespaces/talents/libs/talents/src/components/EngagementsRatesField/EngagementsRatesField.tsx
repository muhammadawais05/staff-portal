import React from 'react'

import TalentEngagementsRates from '../TalentEngagementsRates/TalentEngagementsRates'
import { TalentEngagementRatesFragment } from '../../data/talent-engament-rates-fragment'

export type Props = {
  engagementRates?: TalentEngagementRatesFragment | null
}

const EngagementsRatesField = ({ engagementRates }: Props) => {
  if (!engagementRates) {
    return null
  }

  const {
    engagements: {
      counters: {
        acceptedInterviewsNumber,
        approvedTrialsNumber,
        interviewsNumber,
        successRate,
        trialsNumber
      }
    }
  } = engagementRates

  return (
    <TalentEngagementsRates
      acceptedInterviewsNumber={acceptedInterviewsNumber}
      approvedTrialsNumber={approvedTrialsNumber}
      interviewsNumber={interviewsNumber}
      successRate={successRate}
      trialsNumber={trialsNumber}
    />
  )
}

export default EngagementsRatesField
