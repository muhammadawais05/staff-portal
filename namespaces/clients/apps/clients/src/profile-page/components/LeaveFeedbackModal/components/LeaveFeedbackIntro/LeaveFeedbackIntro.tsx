import React from 'react'
import { Container, Typography, List } from '@toptal/picasso'
import { Link as LinkType } from '@staff-portal/graphql/staff'
import pluralize from 'pluralize'
import { Link } from '@staff-portal/navigation'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import EngagementItemContent from '../EngagementItemContent'

interface Props {
  webResource: LinkType
  engagements: NonNullable<SurveyEngagementFragment['engagements']>
}

const LeaveFeedbackIntro = ({ webResource, engagements }: Props) => {
  return (
    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography size='medium'>
          Please gather feedback from{' '}
          <Link href={webResource.url as string} target='_blank'>
            {webResource.text}
          </Link>{' '}
          for the following {engagements.totalCount}{' '}
          {pluralize('engagement', engagements.totalCount)}:
        </Typography>
      </Container>
      <List variant='unordered'>
        {engagements.nodes.map(({ talent, job, id }) => (
          <List.Item key={id}>
            <EngagementItemContent
              jobLink={job?.webResource}
              talentLink={talent?.webResource}
              verticalName={job?.vertical?.name}
            />
          </List.Item>
        ))}
      </List>
    </Container>
  )
}

export default LeaveFeedbackIntro
