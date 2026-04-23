import React, { useMemo, useState } from 'react'
import { Section, Button, Container, Table } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { INTERVIEW_UPDATED } from '@staff-portal/engagements-interviews'

import { useGetJobCandidates } from './data/get-job-candidates.staff.gql'
import SectionSkeletonLoader from '../SectionSkeletonLoader'
import CandidatesTableItem from '../CandidatesTableItem'

interface Props {
  jobId: string
}

const JobCandidatesSection = ({ jobId }: Props) => {
  const { candidateEngagements, canViewEngagements, loading, refetch } =
    useGetJobCandidates(jobId)
  const [expandedItemsIds, setExpandedItemsIds] = useState<string[]>([])

  const engagementsIds = useMemo(
    () => candidateEngagements?.map(engagement => engagement.node.id) || [],
    [candidateEngagements]
  )
  const showCollapseAll = engagementsIds?.length === expandedItemsIds.length

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(
    [ENGAGEMENT_UPDATED],
    ({ engagementId }) =>
      engagementsIds.some(id => engagementId === id) && refetch()
  )

  useMessageListener(
    [INTERVIEW_UPDATED],
    ({ interviewId }) =>
      candidateEngagements?.some(
        ({ node: { interview } }) => interview?.id === interviewId
      ) && refetch()
  )

  if (loading && !candidateEngagements) {
    return (
      <SectionSkeletonLoader
        title='Candidates'
        sectionVariant='withHeaderBar'
      />
    )
  }

  if (!candidateEngagements?.length) {
    return null
  }

  const onToggleAll = () => {
    if (showCollapseAll) {
      setExpandedItemsIds([])

      return
    }
    setExpandedItemsIds(
      candidateEngagements?.map(engagement => engagement.node.id)
    )
  }

  const onToggleExpand = (engagementId: string, expanded: boolean) => {
    if (expanded) {
      setExpandedItemsIds(expandedItemsIds.filter(id => id !== engagementId))
    } else {
      setExpandedItemsIds([...expandedItemsIds, engagementId])
    }
  }

  return (
    <Container top='medium' data-testid='JobCandidatesSection'>
      <Section
        title='Candidates'
        variant='withHeaderBar'
        actions={
          <Button
            variant='secondary'
            size='small'
            onClick={onToggleAll}
            data-testid='CandidatesTableItemActions-toggle-all-button'
          >
            {showCollapseAll ? 'Collapse All' : 'Expand All'}
          </Button>
        }
      >
        <Table data-testid='engagements-table' variant='striped'>
          <Table.Body>
            {candidateEngagements.map(
              ({ node: candidateEngagement, jobIssues }, index) => (
                <CandidatesTableItem
                  key={candidateEngagement.id}
                  stripEvent={Boolean(index % 2)}
                  expanded={expandedItemsIds.includes(candidateEngagement.id)}
                  setExpanded={onToggleExpand}
                  candidateEngagement={candidateEngagement}
                  jobIssues={jobIssues}
                  canViewEngagements={canViewEngagements}
                  engagementId={candidateEngagement.id}
                />
              )
            )}
          </Table.Body>
        </Table>
      </Section>
    </Container>
  )
}

export default JobCandidatesSection
