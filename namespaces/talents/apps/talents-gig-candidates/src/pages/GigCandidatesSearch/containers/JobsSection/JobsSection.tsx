import React, { useState } from 'react'
import { Typography, Container, Switch, Section } from '@toptal/picasso'

import { SkillPair } from '../../types'
import JobItems from './components/JobItems/JobItems'
import * as S from './styles'

interface Props {
  talentId: string
  talentSkills?: SkillPair[]
}

const JobsSection = (props: Props) => {
  const [includeRejected, setIncludeRejected] = useState(true)

  return (
    <Section
      title='Toptal Jobs'
      actions={
        <Container
          css={S.filter}
          flex
          onClick={() => setIncludeRejected(!includeRejected)}
        >
          <Typography size='medium' color='dark-grey'>
            Include rejected during interview
          </Typography>
          <Switch checked={includeRejected} />
        </Container>
      }
    >
      <JobItems {...props} includeRejected={includeRejected} />
    </Section>
  )
}

export default JobsSection
