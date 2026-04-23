import { Container, Typography, List } from '@toptal/picasso'
import React from 'react'

import { ProfileEmployment } from '../../types'
import ApplicationCardListItem from '../ApplicationCardListItem'
import EmploymentDescription from '../EmploymentDescription'
import * as S from './styles'

export interface EmploymentItemProps {
  employment: ProfileEmployment
  highlighted?: {
    description_items?: string[]
  }
  toggleItem: (id: string) => void
  toggleItemDescription: (id: string, description: string) => void
}

const EmploymentItem = ({
  employment,
  highlighted,
  toggleItem,
  toggleItemDescription
}: EmploymentItemProps) => {
  const toggleItemOff = highlighted
    ? () => toggleItem(employment.id)
    : undefined

  return (
    <Container css={S.employmentItemContainer}>
      <Container css={S.opacityStyle(!!highlighted)}>
        <Typography
          size='small'
          weight='semibold'
          color='black'
          onClick={toggleItemOff}
          css={S.title(!!toggleItemOff)}
        >
          {employment.position}
        </Typography>

        <EmploymentDescription employment={employment} />
      </Container>

      <Container>
        <List css={S.list}>
          {employment.experienceItems.map(item => {
            const itemHighlighted = highlighted
              ? Boolean(highlighted.description_items?.includes(item))
              : false

            return (
              <ApplicationCardListItem
                key={item}
                onClick={() => toggleItemDescription(employment.id, item)}
                highlighted={itemHighlighted}
                data-testid='workExperienceItem'
              >
                <Typography size='xsmall' color='dark-grey'>
                  {item}
                </Typography>
              </ApplicationCardListItem>
            )
          })}
        </List>
      </Container>
    </Container>
  )
}

export default EmploymentItem
