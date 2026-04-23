import { Link } from '@staff-portal/graphql/staff'
import { Link as NavigationLink } from '@staff-portal/navigation'
import { LinkWrapper } from '@staff-portal/ui'
import {
  Button,
  Container,
  Link as PicassoLink,
  Typography
} from '@toptal/picasso'
import React from 'react'

import EmailIcon from '../EmailIcon/EmailIcon'

interface Props {
  talentType: string
  engagementUrl?: string | null
  talentLink?: Link
  jobLink?: Link
}

const TalentSent = ({
  talentLink,
  jobLink,
  talentType,
  engagementUrl
}: Props) => (
  <Container direction='column' flex justifyContent='center'>
    <Container top='medium' bottom='medium' flex justifyContent='center'>
      <EmailIcon />
    </Container>

    <Container bottom='medium'>
      <Typography
        variant='heading'
        size='large'
        align='center'
        data-testid='talent-sent-header'
      >
        Congratulations — you've just sent a {talentType} to a job!
      </Typography>
    </Container>

    <Container bottom='xsmall'>
      <Typography
        align='center'
        size='medium'
        color='black'
        data-testid='talent-sent-success-message'
      >
        You have successfully sent{' '}
        <LinkWrapper
          wrapWhen={Boolean(talentLink?.url)}
          href={talentLink?.url as string}
        >
          {talentLink?.text}
        </LinkWrapper>{' '}
        to the job{' '}
        <LinkWrapper
          wrapWhen={Boolean(jobLink?.url)}
          href={jobLink?.url as string}
        >
          {jobLink?.text}
        </LinkWrapper>
        .
      </Typography>
    </Container>

    <Typography
      align='center'
      size='medium'
      color='black'
      data-testid='talent-sent-schedule-message'
    >
      The company now has 3 days to either reject the profile or schedule an
      interview.
    </Typography>

    <Container top='medium' align='right'>
      <Button
        as={NavigationLink as typeof PicassoLink}
        href={engagementUrl}
        variant='positive'
        noUnderline
      >
        Jump to Interview
      </Button>
    </Container>
  </Container>
)

export default TalentSent
