import React, { useMemo, useState } from 'react'
import { Accordion, Container } from '@toptal/picasso'

import JobItemContent from './JobItemContent'
import * as S from './styles'
import { CandidateJobsEngagementFragment } from '../../data/get-candidate-jobs/get-candidate-jobs.staff.gql.types'
import { SkillPair } from '../../../../types'
import ClientFeedback from '../ClientFeedback'

interface Props {
  engagement: CandidateJobsEngagementFragment
  talentSkills?: SkillPair[]
}

const JobItem = (props: Props) => {
  const [expanded, setExpanded] = useState(false)
  const { engagement } = props

  const clientFeedback = useMemo(
    () =>
      engagement.feedbacks?.nodes.filter(
        feedback => feedback.clientAnswers.nodes.length > 0
      ),
    [engagement]
  )

  return (
    <Container css={S.container} data-testid='job-item'>
      {clientFeedback && clientFeedback.length > 0 ? (
        <Accordion
          content={
            expanded && <ClientFeedback clientFeedback={clientFeedback} />
          }
          borders='none'
          onChange={(_, open) => setExpanded(open)}
          expanded={expanded}
          css={S.accordion}
          data-testid='job-item-accordion'
        >
          <Accordion.Summary css={S.accordion}>
            <JobItemContent {...props} />
          </Accordion.Summary>
        </Accordion>
      ) : (
        <JobItemContent {...props} />
      )}
    </Container>
  )
}

export default JobItem
