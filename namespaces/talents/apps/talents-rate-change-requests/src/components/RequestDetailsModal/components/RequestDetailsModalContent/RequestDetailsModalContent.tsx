import React, { ComponentProps, useMemo } from 'react'
import { Container, Typography, Link } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { differenceInMonths, formatDate } from '@staff-portal/date-time-utils'
import { ENGAGEMENT_COMMITMENT_MAPPING } from '@staff-portal/engagements'
import { WebResourceLinkWrapper } from '@staff-portal/billing'
import { HourlyRateField } from '@staff-portal/facilities'

import RateChangeRequestAnswers from '../RateChangeRequestAnswers'
import RequestDetailsModal from '../../RequestDetailsModal'
import * as S from './styles'

const RequestDetailsModalContent = ({
  currentRate,
  desiredRate,
  talent,
  engagement,
  createdAt,
  answers
}: Omit<ComponentProps<typeof RequestDetailsModal>, 'hideModal'>) => {
  const job = engagement?.job
  const client = job?.client
  const engagementCommitment = engagement
    ? ENGAGEMENT_COMMITMENT_MAPPING[engagement.commitment]
    : NO_VALUE
  const criticalSkills = useMemo(
    () => job?.skillSets?.nodes.map(node => node.skill.name).join(', '),
    []
  )

  return (
    <>
      <Container>
        <Typography as='span' weight='semibold' color='black'>
          General Info
        </Typography>
      </Container>
      <Container top='small'>
        <Typography>
          <Typography as='span' weight='semibold'>
            A new talent raise has been submitted by{' '}
          </Typography>
          <Link data-testid='talent-email-link' href={`mailto:${talent.email}`}>
            {talent.email}
          </Link>
        </Typography>
      </Container>
      <Container top='small'>
        <Typography css={S.label}>
          <Typography as='span' weight='semibold'>
            Company:{' '}
          </Typography>
          <WebResourceLinkWrapper
            webResource={job?.client.webResource}
            inline
          />
        </Typography>
        <Typography>
          <Typography as='span' weight='semibold'>
            AM/RM handling client account:{' '}
          </Typography>
          {client?.accountManager?.fullName ??
            client?.relationshipManager?.fullName ??
            NO_VALUE}
        </Typography>
      </Container>
      <Container top='small'>
        <Typography css={S.label}>
          <Typography as='span' weight='semibold'>
            Talent:{' '}
          </Typography>
          <WebResourceLinkWrapper webResource={talent.webResource} inline />
        </Typography>
        <Typography>
          <Typography as='span' weight='semibold'>
            Talent country of residence:{' '}
          </Typography>
          {talent.locationV2?.countryName}
        </Typography>
      </Container>
      <Container top='small'>
        <Typography css={S.label}>
          <Typography as='span' weight='semibold'>
            Engagement link:{' '}
          </Typography>
          <WebResourceLinkWrapper
            webResource={engagement?.webResource}
            inline
          />
        </Typography>
        <Typography css={S.label}>
          <Typography as='span' weight='semibold'>
            Engagement type:{' '}
          </Typography>
          {engagementCommitment}
        </Typography>
        <Typography>
          <Typography as='span' weight='semibold'>
            Duration of the engagement in months:{' '}
          </Typography>
          {engagement?.startDate
            ? differenceInMonths(
                new Date(createdAt),
                new Date(engagement.startDate)
              )
            : NO_VALUE}
        </Typography>
      </Container>
      <Container top='small'>
        <Typography>
          <Typography as='span' weight='semibold'>
            Date of original rate increase request:{' '}
          </Typography>
          {formatDate(new Date(createdAt))}
        </Typography>
      </Container>
      <Container top='small'>
        <Typography css={S.label}>
          <Typography as='span' weight='semibold'>
            Desired talent amount increase:{' '}
          </Typography>
          ${desiredRate}/hour
        </Typography>
        <Typography css={S.label}>
          <Typography as='span' weight='semibold'>
            Current talent rate:{' '}
          </Typography>
          ${currentRate}/hour
        </Typography>
        <Typography>
          <Typography as='span' weight='semibold'>
            Current client rate:{' '}
          </Typography>
          <HourlyRateField
            hourlyRate={
              engagement?.currentCommitment?.adjustedCompanyRate.hourlyHint
                ?.value
            }
          />
        </Typography>
      </Container>
      <Container top='small'>
        <Typography>
          <Typography as='span' weight='semibold'>
            Critical skills for the job:{' '}
          </Typography>
          {criticalSkills}
        </Typography>
      </Container>
      <RateChangeRequestAnswers answers={answers} />
    </>
  )
}

export default RequestDetailsModalContent
