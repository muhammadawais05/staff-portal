import { Container, Tooltip, Typography, Info16 } from '@toptal/picasso'
import React from 'react'

import { SkillsListFragment } from '../../data'

const SkillUsageTooltipContent = () => (
  <>
    <Container>
      <Typography weight='semibold'>Explicit</Typography> means that jobs or
      talent are linked directly to the current skill.
    </Container>
    <Container>
      <Typography weight='semibold'>Implicit</Typography> means that jobs or
      talent are linked to skills that can be reduced to the current skill, by
      navigating up the skill tree hierarchy.
    </Container>
  </>
)

export interface Props {
  skill?: Partial<SkillsListFragment>
}

const SkillUsage = ({
  skill = {
    activeExplicitJobsCount: 0,
    activeExplicitTalentsCount: 0,
    activeImplicitJobsCount: 0,
    activeImplicitTalentsCount: 0
  }
}: Props) => {
  const {
    activeExplicitJobsCount,
    activeExplicitTalentsCount,
    activeImplicitJobsCount,
    activeImplicitTalentsCount
  } = skill

  return (
    <Container bottom='small' left='medium'>
      <Tooltip placement='left-start' content={<SkillUsageTooltipContent />}>
        <Typography size='xsmall' color='grey' weight='semibold' as='span'>
          Skill usage <Info16 scale={1} />
        </Typography>
      </Tooltip>
      <Container>
        <Typography size='xsmall' color='grey'>
          Active jobs (implicit):{' '}
          <Typography size='xsmall' color='grey' weight='semibold' as='span'>
            {activeExplicitJobsCount}
          </Typography>
        </Typography>
      </Container>
      <Container>
        <Typography size='xsmall' color='grey'>
          Active jobs (explicit):{' '}
          <Typography size='xsmall' color='grey' weight='semibold' as='span'>
            {activeExplicitTalentsCount}
          </Typography>
        </Typography>
      </Container>
      <Container>
        <Typography size='xsmall' color='grey'>
          Active talents (implicit):{' '}
          <Typography size='xsmall' color='grey' weight='semibold' as='span'>
            {activeImplicitJobsCount}
          </Typography>
        </Typography>
      </Container>
      <Container>
        <Typography size='xsmall' color='grey'>
          Active talents (explicit):{' '}
          <Typography size='xsmall' color='grey' weight='semibold' as='span'>
            {activeImplicitTalentsCount}
          </Typography>
        </Typography>
      </Container>
    </Container>
  )
}

export default SkillUsage
