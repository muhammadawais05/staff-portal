import React, { memo } from 'react'
import { Table, Typography, ColorType } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { OfacStatus } from '@staff-portal/graphql/staff'
import { DescriptionFormatter } from '@staff-portal/ui'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import * as S from './styles'
import { OfacStatusChangeFragment } from '../../data/ofac-status-change-fragment'

export interface Props {
  items: OfacStatusChangeFragment[]
}

const STATUS_TO_COLOR_MAPPING: Record<OfacStatus, ColorType> = {
  [OfacStatus.NORMAL]: 'green',
  [OfacStatus.INVESTIGATION]: 'yellow',
  [OfacStatus.RESTRICTED]: 'red'
}

const OFACStatusChangesTable = memo(({ items }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  if (items.length === 0) {
    return null
  }

  return (
    <Table css={S.table} variant='striped'>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Change date and time</Table.Cell>
          <Table.Cell>OFAC status</Table.Cell>
          <Table.Cell>Performer</Table.Cell>
          <Table.Cell css={S.commentColumn}>Comment</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map(ofacStatusChange => {
          const { createdAt, status, performer, comment } = ofacStatusChange
          const performerName = performer?.fullName ? (
            <Link
              href={performer?.webResource.url || ''}
              data-testid='ofac-status-change-performer-link'
            >
              {performer?.fullName}
            </Link>
          ) : (
            'System'
          )

          return (
            <Table.Row key={createdAt}>
              <Table.Cell data-testid='ofac-status-change-createdAt'>
                {formatDateTime(createdAt)}
              </Table.Cell>
              <Table.Cell>
                <Typography
                  color={STATUS_TO_COLOR_MAPPING[status]}
                  weight='semibold'
                  titleCase
                  data-testid='ofac-status-change-value'
                >
                  {status.toLowerCase()}
                </Typography>
              </Table.Cell>
              <Table.Cell data-testid='ofac-status-change-performer'>
                {performerName}
              </Table.Cell>
              <Table.Cell data-testid='ofac-status-change-comment'>
                {comment && <DescriptionFormatter text={comment} />}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
})

export default OFACStatusChangesTable
