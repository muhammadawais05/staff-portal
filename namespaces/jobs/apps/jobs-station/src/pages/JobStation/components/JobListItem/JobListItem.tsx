import React, { memo } from 'react'
import {
  ArrowDownMinor16,
  ArrowUpMinor16,
  Button,
  Container,
  ExclamationSolid16,
  Slack16,
  Table,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { Handoff, Job, Link } from '@staff-portal/graphql/staff'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import {
  JobStatus,
  DESIRED_COMMITMENT_TITLES,
  getMultipleHiresTooltip
} from '@staff-portal/jobs'
import { useAnalytics } from '@staff-portal/monitoring-service'
import { JobStationSegmentEvents } from '@staff-portal/facilities'
import { JobCards } from '@staff-portal/jobs-cards'

import * as S from './styles'
import { isEngagementCommitment, renderCommitment } from './utils/utils'
import JobListContactItem from '../JobListContactItem/JobListContactItem'

interface Props {
  job: Job
  index: number
  isExpanded: boolean
  expandCollapseJob: (jobId: string) => void
}

const JobListItem = ({ job, index, isExpanded, expandCollapseJob }: Props) => {
  const { id: jobId } = job
  const isExpandedVisible = isExpanded
  const { track } = useAnalytics()

  const toggleTaskExpandRow = () => {
    if (!isExpanded) {
      track(JobStationSegmentEvents.JOB_RECORDS)
    }
    expandCollapseJob(jobId)
  }

  const slackLink = (slack?: Link) => {
    if (slack) {
      return (
        <Button.Circular
          variant='flat'
          href={slack.url || ''}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => track(JobStationSegmentEvents.MATCHER_SLACK_LINK)}
          css={S.slackButton}
          icon={<Slack16 />}
        />
      )
    }
  }

  const commitmentIcon = (desiredCommitment?: string) => {
    if (desiredCommitment) {
      return (
        <Tooltip
          maxWidth='none'
          content={`Desired Commitment: ${DESIRED_COMMITMENT_TITLES[desiredCommitment]}`}
        >
          <Container
            css={S.commitmentIcon}
            data-testid='job-desired-commitment'
          >
            <ExclamationSolid16 color='grey' />
          </Container>
        </Tooltip>
      )
    }
  }

  const handoff = (claimerHandoff?: Handoff) => {
    if (claimerHandoff) {
      return (
        <Tooltip
          maxWidth='none'
          content={
            <>
              <Container>
                {`Temporary Recruiter: ${claimerHandoff.replacement.webResource.text}`}
              </Container>
              <Container>
                {`Primary Recruiter: ${claimerHandoff.subject.webResource.text} (On vacation)`}
              </Container>
            </>
          }
        >
          <Container css={S.handoffIcon} data-testid='job-handoff-icon'>
            <ExclamationSolid16 color='yellow' />
          </Container>
        </Tooltip>
      )
    }
  }

  const renderWebResource = ({
    webResource,
    slack,
    claimerHandoff,
    eventType = JobStationSegmentEvents.JOBS_TABLE_LINK,
    maxLines = 1
  }: {
    webResource?: Link
    slack?: Link
    eventType?: JobStationSegmentEvents
    maxLines?: number
    claimerHandoff?: Handoff
  }) => {
    if (!webResource) {
      return null
    }

    return (
      <Container flex direction='row' justifyContent='space-between'>
        {handoff(claimerHandoff)}
        <TypographyOverflowLink lines={maxLines} css={S.webResource} color='inherit'>
          <LinkWrapper
            wrapWhen={Boolean(webResource.url)}
            href={webResource.url as string}
            title={webResource.text}
            onClick={() => {
              track(eventType)
            }}
          >
            {webResource.text}
          </LinkWrapper>
        </TypographyOverflowLink>
        {slackLink(slack)}
      </Container>
    )
  }

  const renderJobPostDate = () =>
    job.postedAt && getDateDistanceFromNow(job.postedAt)

  const renderMatcherName = () => {
    const claimerInternalSlackContactResource =
      job.claimer?.contacts.nodes[0]?.webResource

    const claimerHandoff = job.claimerHandoff || undefined
    const webResource = claimerHandoff
      ? claimerHandoff.replacement.webResource
      : job.claimer?.webResource

    return claimerInternalSlackContactResource ? (
      renderWebResource({
        webResource: webResource,
        slack: claimerInternalSlackContactResource,
        maxLines: 1,
        claimerHandoff: claimerHandoff
      })
    ) : (
      <TypographyOverflow>{job.claimer?.fullName}</TypographyOverflow>
    )
  }

  const renderFirstContact = () => {
    const contact = job.contacts?.nodes[0] || job.client.contact
    const contacts = job.contacts?.nodes[0]
      ? job.contacts.nodes
      : job.client.contact
      ? [job.client.contact]
      : []

    return (
      contact && <JobListContactItem contact={contact} contacts={contacts} />
    )
  }

  const renderOtherContacts = () => {
    const contact = job.contacts?.nodes[1]
    const contacts = job.contacts?.nodes

    return (
      contact && (
        <JobListContactItem contact={contact} contacts={contacts} multiple />
      )
    )
  }

  return (
    <Table.ExpandableRow
      content={<JobCards job={job} />}
      expanded={isExpandedVisible}
      stripeEven={Boolean(index % 2)}
    >
      <Table.Cell css={S.title}>
        {renderWebResource({
          webResource: job.webResource,
          eventType: JobStationSegmentEvents.JOB_LINK_CLICKS
        })}
        <TypographyOverflow>
          <Container flex direction='row' alignItems='center'>
            {renderCommitment(job)}
            {commitmentIcon(
              (isEngagementCommitment(job) && job.commitment) || undefined
            )}
            , {titleize(job.jobType)}
          </Container>
        </TypographyOverflow>
      </Table.Cell>
      <Table.Cell css={S.company}>
        {renderWebResource({
          webResource: job.client.webResource,
          eventType: JobStationSegmentEvents.COMPANY_LINK_CLICKS
        })}
      </Table.Cell>
      <Table.Cell css={S.postDate} title={renderJobPostDate() || ''}>
        <TypographyOverflow>{renderJobPostDate()}</TypographyOverflow>
      </Table.Cell>
      <Table.Cell css={S.matcher} data-testid='job-matcher-cell'>
        {renderMatcherName()}
      </Table.Cell>
      <Table.Cell css={S.status}>
        <JobStatus
          job={job}
          inheritStyling
          tooltipContent={getMultipleHiresTooltip(job)}
        />
      </Table.Cell>
      <Table.Cell css={S.contacts} data-testid='job-contacts-cell'>
        <TypographyOverflow as='div' disableTooltip>
          {renderFirstContact()}
          {renderOtherContacts()}
        </TypographyOverflow>
      </Table.Cell>
      <Table.Cell css={S.arrow}>
        <Button.Circular
          title='Expand job'
          variant='flat'
          icon={isExpandedVisible ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
          onClick={toggleTaskExpandRow}
        />
      </Table.Cell>
    </Table.ExpandableRow>
  )
}

export default memo(JobListItem)
