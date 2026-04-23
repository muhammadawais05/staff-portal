import React, { memo } from 'react'
import { List, Typography, Container, Timeline } from '@toptal/picasso'
import { Vertical } from '@staff-portal/talents'

import { EmploymentsFragment } from '../../data/get-talent-employments-section/get-talent-employments-section.staff.gql.types'

export type Props = {
  talentType?: string
  data: EmploymentsFragment
}

const SKILL_SECTION_VERTICAL: string[] = [
  Vertical.FINANCE_EXPERT,
  Vertical.DEVELOPER,
  Vertical.DESIGNER
]

const EmploymentItem = ({
  talentType,
  data: {
    company,
    position,
    startDate,
    endDate,
    experienceItems,
    skills: { nodes: skills }
  }
}: Props) => {
  const hasSkillSection = Boolean(
    talentType && SKILL_SECTION_VERTICAL.includes(talentType) && skills.length
  )
  const skillSectionLabel =
    talentType === Vertical.FINANCE_EXPERT ? 'Focus areas' : 'Technologies'

  return (
    <Timeline>
      <Timeline.Row>
        <Container bottom='small'>
          <Container bottom='xsmall'>
            <Typography
              variant='heading'
              size='medium'
              data-testid='talent-employment-position'
            >
              {position}
            </Typography>
            <Typography
              size='medium'
              color='dark-grey'
              data-testid='talent-employment-company'
            >
              {company} • {startDate} &ndash; {endDate || 'PRESENT'}
            </Typography>
          </Container>

          <List variant='unordered'>
            {experienceItems.map(item => (
              <List.Item
                key={item}
                data-testid='talent-employment-experience-item'
              >
                {item}
              </List.Item>
            ))}
          </List>

          {hasSkillSection && (
            <Container top='xsmall'>
              <Typography
                size='medium'
                color='dark-grey'
                data-testid='talent-employment-skills-list'
              >
                {`${skillSectionLabel}: ${skills
                  .map(({ name }) => name)
                  .join(', ')}`}
              </Typography>
            </Container>
          )}
        </Container>
      </Timeline.Row>
    </Timeline>
  )
}

export default memo(EmploymentItem)
