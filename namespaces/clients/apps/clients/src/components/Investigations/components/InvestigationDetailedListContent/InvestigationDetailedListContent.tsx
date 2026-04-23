import React from 'react'
import { Accordion, Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import {
  DEFAULT_FULL_DATE_FORMAT,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { DetailedList } from '@staff-portal/ui'

import { Investigation } from '../../types'
import InvestigationComment from '../InvestigationComment'
import InvestigationResolution from '../InvestigationResolution'
import JobListingTable from '../JobListingTable'
import * as S from './styles'

interface Props {
  investigation: Investigation
  isResolutionExpanded: boolean
  isJobsExpanded: boolean
}

const InvestigationDetailedListContent = ({
  investigation: {
    startedAt,
    clientSpecialistTeamAssignee,
    resolvedAt,
    comment,
    resolution,
    jobs: { nodes: jobs }
  },
  isResolutionExpanded,
  isJobsExpanded
}: Props) => {
  const user = useGetCurrentUser()
  const timeZone = user?.timeZone?.value

  return (
    <>
      <DetailedList.Row>
        <DetailedList.Item
          label='Started at'
          value={parseAndFormatDate(startedAt, {
            dateFormat: DEFAULT_FULL_DATE_FORMAT,
            timeZone
          })}
          data-testid='InvestigationDetailedListContent-startedAt'
        />
        <DetailedList.Item
          label='Resolved at'
          value={
            resolvedAt
              ? parseAndFormatDate(resolvedAt, {
                  dateFormat: DEFAULT_FULL_DATE_FORMAT,
                  timeZone
                })
              : NO_VALUE
          }
          data-testid='InvestigationDetailedListContent-resolvedAt'
        />
      </DetailedList.Row>
      <DetailedList.Row striped>
        <DetailedList.Item
          label='CS team assignee'
          value={
            clientSpecialistTeamAssignee ? (
              <Typography weight='semibold' size='medium'>
                <Link
                  href={clientSpecialistTeamAssignee.webResource.url || ''}
                  data-testid='InvestigationDetailedListContent-csTeamAssignee-link'
                >
                  {clientSpecialistTeamAssignee.webResource.text}
                </Link>
              </Typography>
            ) : (
              NO_VALUE
            )
          }
          data-testid='InvestigationDetailedListContent-cxTeamAssignee'
        />
      </DetailedList.Row>
      <DetailedList.Row>
        <Container
          left='small'
          right='small'
          top='xsmall'
          bottom='xsmall'
          data-testid='InvestigationDetailedListContent-comment'
        >
          <InvestigationComment comment={comment} />
        </Container>
      </DetailedList.Row>
      <Accordion
        content={
          <DetailedList.Row striped css={S.resolutionAccordion}>
            <Container
              left='small'
              right='small'
              top='xsmall'
              bottom='xsmall'
              data-testid='InvestigationDetailedListContent-resolution'
            >
              <InvestigationResolution resolution={resolution} />
            </Container>
          </DetailedList.Row>
        }
        expanded={isResolutionExpanded}
        borders='none'
      />
      <Accordion
        content={<JobListingTable jobs={jobs} />}
        expanded={isJobsExpanded}
        borders='none'
      />
    </>
  )
}

export default InvestigationDetailedListContent
