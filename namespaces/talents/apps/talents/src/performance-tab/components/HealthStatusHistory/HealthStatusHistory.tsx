import React from 'react'
import { Table, Tooltip, Typography } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { LinkWrapper } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import { HealthStatusField } from '@staff-portal/talents'

import { TalentPerformanceHealthStatusFragment } from '../../data/get-talent-health-status-with-history'
import * as S from './styles'

interface Props {
  healthStatusHistory: TalentPerformanceHealthStatusFragment[]
}

const HealthStatusHistory = ({ healthStatusHistory }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  return (
    <Table css={S.history} data-testid='HealthStatusHistory' variant='striped'>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Health Status</Table.Cell>
          <Table.Cell>Performed by</Table.Cell>
          <Table.Cell>Change Date and Time</Table.Cell>
          <Table.Cell>Comment</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {healthStatusHistory.map(
          ({ healthStatus, performer, createdAt, comment }) => (
            <Table.Row key={createdAt}>
              <Table.Cell data-testid='health-status-history-status-field'>
                <HealthStatusField status={healthStatus} />
              </Table.Cell>
              <Table.Cell>
                {performer ? (
                  <LinkWrapper
                    wrapWhen={Boolean(performer?.webResource.url)}
                    href={performer?.webResource.url as string}
                  >
                    {performer?.webResource.text}
                  </LinkWrapper>
                ) : (
                  NO_VALUE
                )}
              </Table.Cell>
              <Table.Cell css={S.noWrap}>
                <Tooltip content={getDateDistanceFromNow(createdAt)}>
                  <Typography size='medium'>
                    {formatDateTime(createdAt)}
                  </Typography>
                </Tooltip>
              </Table.Cell>
              <Table.Cell data-testid='health-status-history-comment-field'>
                {comment}
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  )
}

export default HealthStatusHistory
