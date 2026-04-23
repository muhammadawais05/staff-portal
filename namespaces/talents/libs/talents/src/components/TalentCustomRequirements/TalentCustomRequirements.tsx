import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { titleize } from '@staff-portal/string'

import { hasCustomRequirements, POSSIBLE_REQUIREMENTS } from '../../utils'
import { CustomRequirements } from '../../types'

export interface Props {
  customRequirements?: CustomRequirements
}

const TalentCustomRequirements = ({ customRequirements }: Props) => {
  if (!hasCustomRequirements(customRequirements)) {
    return <>{NO_VALUE}</>
  }

  return (
    <>
      {POSSIBLE_REQUIREMENTS.filter(item => customRequirements?.[item])
        .map(item =>
          titleize(item, {
            splitter: /(?=[A-Z])/,
            capitalizeAllWords: false
          })
        )
        .join(' / ')}
    </>
  )
}

export default TalentCustomRequirements
