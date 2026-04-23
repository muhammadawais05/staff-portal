import { Typography } from '@toptal/picasso'
import React from 'react'

import type { ProfileEducation } from '../../types'
import ApplicationCardListItem from '../ApplicationCardListItem'
import * as S from './styles'

export interface EducationItemProps {
  education: ProfileEducation
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}

const EducationItem = ({
  education,
  selected,
  onClick,
  ...rest
}: EducationItemProps) => {
  return (
    <ApplicationCardListItem highlighted={selected} onClick={onClick} {...rest}>
      <div css={S.Content}>
        <Typography size='xsmall' color='black' weight='semibold'>
          {education.degree} in {education.fieldOfStudy}
        </Typography>
        <Typography size='xsmall'>
          {education.title} - {education.location}
        </Typography>
      </div>
      <div css={S.Aside}>
        <Typography size='xsmall'>
          {education.yearFrom} - {education.yearTo}
        </Typography>
      </div>
    </ApplicationCardListItem>
  )
}

export default EducationItem
