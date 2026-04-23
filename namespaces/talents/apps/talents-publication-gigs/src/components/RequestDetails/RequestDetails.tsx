import React from 'react'
import { Container, Table, Typography } from '@toptal/picasso'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import { WebResourceLink } from '@staff-portal/ui'
import { GigFragment } from '@staff-portal/talents-gigs'
import { NO_VALUE } from '@staff-portal/config'

import { getRequestStatusDetails, getRequestAssignee } from '../../utils'
import * as S from './styles'

type Props = {
  request: GigFragment
}

const RequestDetails = ({ request }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()
  const [status, statusColor] = getRequestStatusDetails(
    request.status,
    !!request.reachOuts?.totalCount
  )

  const requestAssignee = getRequestAssignee(request.slackConversations.nodes)

  return (
    <Container>
      <Table variant='striped'>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Created at</Table.Cell>
            <Table.Cell css={S.cellContent}>
              {formatDateTime(request.createdAt)}
            </Table.Cell>
            <Table.Cell>Claimed by</Table.Cell>
            <Table.Cell css={S.cellContent} data-testid='claimed-by'>
              {request.claimedBy ? (
                <WebResourceLink link={request.claimedBy.role.webResource} />
              ) : (
                NO_VALUE
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Created by</Table.Cell>
            <Table.Cell css={S.cellContent}>
              <WebResourceLink link={request.createdBy.role.webResource} />
            </Table.Cell>
            <Table.Cell>Approved at</Table.Cell>
            <Table.Cell css={S.cellContent}>
              {formatDateTime(request.approvedAt) || NO_VALUE}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Request Status</Table.Cell>
            <Table.Cell css={S.cellContent}>
              <Typography
                color={statusColor}
                weight='semibold'
                data-testid='request-status'
              >
                {status}
              </Typography>
            </Table.Cell>
            <Table.Cell>Matched at</Table.Cell>
            <Table.Cell css={S.cellContent} data-testid='matched-at'>
              {request.matchedAt ? formatDateTime(request.matchedAt) : NO_VALUE}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Time Zone</Table.Cell>
            <Table.Cell css={S.cellContent}>
              {request.createdBy.role.timeZone?.name}
            </Table.Cell>
            <Table.Cell>Candidate</Table.Cell>
            <Table.Cell css={S.cellContent} data-testid='candidate'>
              {requestAssignee ? (
                <WebResourceLink link={requestAssignee.webResource} />
              ) : (
                NO_VALUE
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Claimed at</Table.Cell>
            <Table.Cell css={S.cellContent}>
              {formatDateTime(request.claimedAt) || NO_VALUE}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  )
}

export default RequestDetails
