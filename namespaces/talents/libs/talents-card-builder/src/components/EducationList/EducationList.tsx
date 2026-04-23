import { Section, List } from '@toptal/picasso'
import React, { useCallback } from 'react'

import type { HighlightItem, ProfileEducation } from '../../types'
import EducationItem from '../EducationItem'
import * as S from './styles'

export interface EducationListProps {
  value: HighlightItem[]
  toggleItem: (id: string) => void
  data: ProfileEducation[]
}

const EducationList = ({ data, value, toggleItem }: EducationListProps) => {
  const handleClick = useCallback(
    e => {
      toggleItem(e.currentTarget.dataset.itemId)
    },
    [toggleItem]
  )

  if (data.length === 0) {
    return null
  }

  return (
    <Section title='Education'>
      <List css={S.list}>
        {data.map(education => (
          <EducationItem
            key={education.id}
            education={education}
            selected={value.some(item => item.id === education.id)}
            data-item-id={education.id}
            onClick={handleClick}
            data-testid='educationItem'
          />
        ))}
      </List>
    </Section>
  )
}

export default EducationList
