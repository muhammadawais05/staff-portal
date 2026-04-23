import React from 'react'
import { Container } from '@toptal/picasso'

import { TalentProfileIndustrySetFragment } from '../../../../data'
import IndustryTagWithTooltip from '../IndustryTagWithTooltip'
import * as S from './styles'

export interface Props {
  industrySets?: TalentProfileIndustrySetFragment[]
}

const TalentIndustries = ({ industrySets }: Props) => {
  if (!industrySets) {
    return null
  }

  return (
    <Container css={S.container}>
      {industrySets.map(
        ({
          industry: { id, name },
          connections: { totalCount, nodes }
        }: TalentProfileIndustrySetFragment) => {
          return (
            <IndustryTagWithTooltip
              key={id}
              industryName={name}
              connectionsCount={totalCount}
              profileItems={nodes}
            />
          )
        }
      )}
    </Container>
  )
}

export default TalentIndustries
