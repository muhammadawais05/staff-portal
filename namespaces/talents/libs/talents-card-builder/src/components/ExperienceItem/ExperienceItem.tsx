import { multilineText } from '@staff-portal/string'
import { Container, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { ProfileExperience } from '../../types'
import ApplicationCardListItem from '../ApplicationCardListItem'
import * as S from './styles'

export interface ExperienceItemProps {
  item: ProfileExperience
  highlighted: boolean
  toggle: (id: string) => void
}

const ExperienceItem = ({ item, highlighted, toggle }: ExperienceItemProps) => {
  const description = useMemo(
    () =>
      multilineText(item.description ?? '').map((paragraph: string) => (
        <Container key={paragraph} top='xsmall'>
          <Typography size='xsmall'>{paragraph.trim()}</Typography>
        </Container>
      )),
    [item.description]
  )

  return (
    <ApplicationCardListItem
      highlighted={highlighted}
      onClick={() => toggle(item.id)}
      cssStyle={S.listItemContentComponent}
    >
      <Typography size='xsmall' color='black' weight='semibold'>
        {item.title}
      </Typography>
      {item.link && (
        <Typography size='xsmall' css={S.WordBreak}>
          {item.link}
        </Typography>
      )}
      {description}
    </ApplicationCardListItem>
  )
}

export default ExperienceItem
