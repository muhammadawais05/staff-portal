import React from 'react'
import { Container, Link16, List, Typography } from '@toptal/picasso'

import { Section } from '../../types'
import * as S from './styles'

interface Props {
  section: Section
}

const SkillConnectionSection = ({
  section: { descriptions, name, amount }
}: Props) => {
  const hasDescriptions = descriptions.filter(Boolean).length > 0

  return (
    <Container
      css={S.section}
      key={name}
      data-testid='skill-tag-tooltip-section'
    >
      <Container flex justifyContent='space-between' alignItems='center'>
        <Typography
          weight='semibold'
          inline
          color='black'
          data-testid='skill-tag-tooltip-section-name'
        >
          {name}
        </Typography>
        <Container flex alignItems='center'>
          <Container as='span' flex alignItems='center' right='xsmall'>
            <Link16 />
          </Container>
          <Typography
            weight='semibold'
            inline
            size='xsmall'
            data-testid='skill-tag-tooltip-section-amount'
          >
            {amount}
          </Typography>
        </Container>
      </Container>
      {hasDescriptions && (
        <Container top='xsmall'>
          <List>
            {descriptions.map((description, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <List.Item key={index} css={S.description}>
                {description}
              </List.Item>
            ))}
          </List>
        </Container>
      )}
    </Container>
  )
}

SkillConnectionSection.displayName = 'SkillConnectionSection'

export default SkillConnectionSection
