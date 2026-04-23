import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { getRoleTypeText } from '@staff-portal/facilities'
import { Talent } from '@staff-portal/talents-screening-specialists'

export interface Props {
  talent: Talent
}

const VerticalCellContent = ({
  talent: { talentType, specializationApplications }
}: Props) => {
  const roleTitle = getRoleTypeText(talentType)

  const specializationTitle =
    specializationApplications?.nodes[0]?.specialization?.title

  const textContent = [roleTitle, specializationTitle]
    .filter(Boolean)
    .join(' - ')

  return (
    <TypographyOverflow lines={2} tooltipContent={textContent}>
      {textContent}
    </TypographyOverflow>
  )
}

export default VerticalCellContent
