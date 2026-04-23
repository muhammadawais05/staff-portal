import React from 'react'
import { DetailedList as DL, LinkWrapper, SubSection } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import { Container, Tag, TypographyOverflow } from '@toptal/picasso'
import { ClientLinkField } from '@staff-portal/jobs'
import { EngagementCommitment } from '@staff-portal/engagements'
import { EngagementStatus } from '@staff-portal/engagements-interviews'

import { ParallelEngagementsFragment } from '../../../../data/get-availability-step-data'
import * as S from './styles'

type Props = {
  last?: boolean
  engagementStatus?: Pick<
    ParallelEngagementsFragment,
    'status' | 'cumulativeStatus'
  >
} & Omit<ParallelEngagementsFragment, 'id'>

const ParallelInterview = ({
  last,
  client,
  commitment,
  engagementStatus,
  job,
  currentInterviewLock
}: Props) => (
  <SubSection
    css={S.subSection}
    last={last}
    title={
      <Container bottom='small' flex alignItems='center'>
        <LinkWrapper
          wrapWhen={Boolean(job?.webResource.url)}
          href={job?.webResource.url as string}
        >
          <TypographyOverflow weight='semibold' color='inherit' as='span'>
            {job?.webResource.text}
          </TypographyOverflow>
        </LinkWrapper>

        {client?.enterprise && (
          <Container as='span' left='xsmall'>
            <Tag variant='light-grey'>Enterprise</Tag>
          </Container>
        )}
      </Container>
    }
  >
    <DL defaultValue={NO_VALUE} labelColumnWidth={10}>
      <DL.Row>
        <DL.Item label='Company'>
          {client && <ClientLinkField client={client} />}
        </DL.Item>

        <DL.Item label='Status'>
          {engagementStatus && (
            <EngagementStatus.Default engagement={engagementStatus} />
          )}
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Commitment'>
          <EngagementCommitment
            commitment={commitment}
            commitmentHours={job?.expectedWeeklyHours}
          />
        </DL.Item>
      </DL.Row>

      {currentInterviewLock && (
        <DL.Row>
          <DL.Item label='Lock Type' value={currentInterviewLock.type} />
        </DL.Row>
      )}
    </DL>
  </SubSection>
)

export default ParallelInterview
