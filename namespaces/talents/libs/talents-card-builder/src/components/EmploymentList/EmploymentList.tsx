import { Section } from '@toptal/picasso'
import React from 'react'

import { HighlightItem, ProfileEmployment } from '../../types'
import EmploymentItem from '../EmploymentItem'

export interface EmploymentListProps {
  data: ProfileEmployment[]
  value: HighlightItem[]
  toggleItem: (id: string) => void
  toggleItemDescription: (id: string, description: string) => void
}

const EmploymentList = ({
  data,
  value,
  toggleItem,
  toggleItemDescription
}: EmploymentListProps) => {
  return (
    <Section title='Work Experience'>
      {data.map(employment => (
        <EmploymentItem
          key={employment.id}
          employment={employment}
          highlighted={value.find(item => item.id === employment.id)}
          toggleItem={toggleItem}
          toggleItemDescription={toggleItemDescription}
        />
      ))}
    </Section>
  )
}

export default EmploymentList
