import React, { useState } from 'react'
import { Container, Table, EmptyState } from '@toptal/picasso'

import { AvailabilityRequestItemFragment } from '../../data/get-availability-requests'
import AvailabilityRequestsTableItem from '../AvailabilityRequestsTableItem'
import * as S from './styles'

export interface Props {
  availabilityRequests?: AvailabilityRequestItemFragment[] | null
  jobType?: string
  totalCount: number
  jobId: string
}

const AvailabilityRequestsTable = ({
  availabilityRequests = [],
  jobType,
  totalCount,
  jobId
}: Props) => {
  const [expandedAvailabilityRequestId, setExpandedAvailabilityRequestId] =
    useState<string | null>(null)

  if (totalCount === 0) {
    return null
  }

  if (availabilityRequests?.length === 0) {
    return (
      <EmptyState.Collection
        key='empty-state'
        data-testid='availability-requests-table-empty'
      >
        No availability requests for this criteria
      </EmptyState.Collection>
    )
  }

  return (
    <Container css={S.tableContainer}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell css={S.talentCol}>Talent</Table.Cell>
            <Table.Cell css={S.createdCol}>Created</Table.Cell>
            <Table.Cell css={S.bestMatchCol}>Best Match</Table.Cell>
            <Table.Cell css={S.ratesCol}>Rates</Table.Cell>
            <Table.Cell css={S.availabilityCol}>Availability</Table.Cell>
            <Table.Cell css={S.statusCol}>Status</Table.Cell>
            <Table.Cell css={S.actionsCol}>Actions</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {availabilityRequests?.map((availabilityRequest, index) => {
            if (!availabilityRequest.talent) {
              return null
            }

            return (
              <AvailabilityRequestsTableItem
                key={availabilityRequest.id}
                availabilityRequest={availabilityRequest}
                jobType={jobType}
                jobId={jobId}
                index={index}
                isExpanded={
                  expandedAvailabilityRequestId === availabilityRequest.id
                }
                expandItem={setExpandedAvailabilityRequestId}
              />
            )
          })}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default AvailabilityRequestsTable
