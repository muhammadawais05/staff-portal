import React from 'react'
import { Container } from '@toptal/picasso'

import { ProfileItemFragment } from '../../../../data'
import { generateIndustryConnectionsSections } from '../../utils'
import IndustryTagTooltipSection from '../IndustryTagTooltipSection'

type Props = {
  profileItems: ProfileItemFragment[]
}

const IndustryTagTooltip = ({ profileItems }: Props) => {
  const sections = generateIndustryConnectionsSections(profileItems)

  return (
    <Container>
      {sections.map(section => (
        <IndustryTagTooltipSection section={section} key={section.name} />
      ))}
    </Container>
  )
}

export default IndustryTagTooltip
