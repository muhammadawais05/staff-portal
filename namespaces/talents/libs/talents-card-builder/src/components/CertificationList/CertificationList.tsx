import { Section, List } from '@toptal/picasso'
import React, { useCallback } from 'react'

import { HighlightItem, ProfileCertification } from '../../types'
import CertificationItem from '../CertificationItem'

export interface CertificationListProps {
  value: HighlightItem[]
  toggleItem: (id: string) => void
  data: ProfileCertification[]
}

const CertificationList = ({
  data,
  value,
  toggleItem
}: CertificationListProps) => {
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
    <Section title='Certifications'>
      <List>
        {data.map(certification => (
          <CertificationItem
            key={certification.id}
            certification={certification}
            selected={value.some(item => item.id === certification.id)}
            data-item-id={certification.id}
            onClick={handleClick}
            data-testid='certificationItem'
          />
        ))}
      </List>
    </Section>
  )
}

export default CertificationList
