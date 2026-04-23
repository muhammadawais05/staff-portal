import React, { useMemo } from 'react'
import { Section, Container, Table } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TableSkeleton } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import SourcedTalentsTableItem from '../SourcedTalentsTableItem'
import * as S from './styles'
import { GetJobSourcingRequestTalentsDocument } from './data/get-job-sourcing-request-talents/get-job-sourcing-request-talents.staff.gql.types'

export interface Props {
  jobId: string
}

const SourcedTalentsTable = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(
    GetJobSourcingRequestTalentsDocument
  )({ jobId }, { throwOnError: true })
  const sourcedTalents = useMemo(
    () => [
      ...(data?.sourcingRequest?.sourcingRequestTalents?.nodes || []),
      ...(data?.sourcingRequest?.unlinkedSourcingRequestTalents?.nodes || [])
    ],
    [
      data?.sourcingRequest?.sourcingRequestTalents?.nodes,
      data?.sourcingRequest?.unlinkedSourcingRequestTalents?.nodes
    ]
  )

  const showActionsColumn = useMemo(
    () =>
      sourcedTalents.some(
        sourcedTalent =>
          sourcedTalent.operations.unlinkSourcingRequestTalent.callable ===
            OperationCallableTypes.ENABLED ||
          sourcedTalent.talent.operations.linkSourcingRequest.callable ===
            OperationCallableTypes.ENABLED
      ),
    [sourcedTalents]
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (loading && !data) {
    return (
      <Container top='large'>
        <Section title='Sourced Talents' variant='withHeaderBar'>
          <TableSkeleton
            rows={5}
            cols={4}
            dataTestId='sourcing-request-talents-list-loader'
            variant='clear'
          />
        </Section>
      </Container>
    )
  }

  if (!sourcedTalents?.length) {
    return null
  }

  return (
    <Container top='medium'>
      <Section title='Sourced Talents' variant='withHeaderBar'>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell css={S.talentCol}>Talent</Table.Cell>
              <Table.Cell css={S.statusCol}>Talent Status</Table.Cell>
              <Table.Cell css={S.statusCol}>Reserved Status</Table.Cell>
              {showActionsColumn && (
                <Table.Cell css={S.actionsCol}>Actions</Table.Cell>
              )}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {sourcedTalents.map((sourcedTalent, index) => (
              <SourcedTalentsTableItem
                key={sourcedTalent.talent.id}
                jobId={jobId}
                sourcingTalentRequest={sourcedTalent}
                showActionsColumn={showActionsColumn}
                index={index}
              />
            ))}
          </Table.Body>
        </Table>
      </Section>
    </Container>
  )
}

export default SourcedTalentsTable
