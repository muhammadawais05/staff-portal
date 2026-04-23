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

interface Props {
  talentType: string
  talentLink?: Link
  jobLink?: Link
}

const TalentAssigned = ({ talentLink, jobLink, talentType }: Props) => (
  <Container direction='column' flex justifyContent='center'>
    <Container top='medium' bottom='medium'>
      <Typography
        variant='heading'
        size='large'
        align='center'
        data-testid='talent-assigned-header'
      >
        Congratulations — you've just assigned a {talentType} to a job!
      </Typography>
    </Container>

    <Container bottom='xsmall'>
      <Typography
        align='center'
        size='medium'
        color='black'
        data-testid='talent-assigned-content'
      >
        You have successfully assigned{' '}
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

    <Container top='medium' align='right'>
      <Button
        as={NavigationLink as typeof PicassoLink}
        href={jobLink?.url}
        variant='positive'
        noUnderline
      >
        Jump to Job
      </Button>
    </Container>
  </Container>
)

export default TalentAssigned
