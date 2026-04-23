import React from 'react'
import { Tag, Typography } from '@toptal/picasso'
import { TalentCoachingEngagementState } from '@staff-portal/graphql/staff'
import { VariantType } from '@toptal/picasso/TagRectangular/TagRectangular'

import * as S from './styles'

interface Props {
  states: TalentCoachingEngagementState[]
}

const TalentCoachingStates = ({ states }: Props) => {
  if (states.length === 0) {
    return (
      <Typography variant='body' size='medium'>
        —
      </Typography>
    )
  }

  return (
    <Tag.Group>
      {states.map(({ id, color, label }) => (
        <Tag.Rectangular
          variant={color as VariantType}
          key={id}
          css={S.tagStyle}
        >
          {label}
        </Tag.Rectangular>
      ))}
    </Tag.Group>
  )
}

export default TalentCoachingStates
