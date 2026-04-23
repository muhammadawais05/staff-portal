import React from 'react'
import { TypographyOverflow, Typography } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'

import { SkillNamesListItemSkillFragment } from '../../data/get-skill-names-list'

export interface Props {
  skills: SkillNamesListItemSkillFragment[]
}

const SkillNameVerticalsCell = ({ skills }: Props) => {
  if (!skills.length) {
    return <Typography color='grey'>No Verticals</Typography>
  }

  return (
    <TypographyOverflow>
      {skills
        .map(
          ({ category: { vertical } }) =>
            vertical && titleize(vertical.talentType)
        )
        .filter(talentType => talentType)
        .join(', ')}
    </TypographyOverflow>
  )
}

export default SkillNameVerticalsCell
