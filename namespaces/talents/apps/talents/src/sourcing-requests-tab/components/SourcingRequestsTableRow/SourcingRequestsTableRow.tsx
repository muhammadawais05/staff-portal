import React from 'react'
import { Table } from '@toptal/picasso'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'
import { SourcingRequestStatus } from '@staff-portal/talents'

import { SourcingRequestFragment } from '../data/get-talent-sourcing-requests'
import * as S from './styles'

interface Props {
  sourcingRequest: SourcingRequestFragment
  stripeEven?: boolean
}

const SourcingRequestsTableRow = ({
  sourcingRequest: { id, job, webResource, status },
  stripeEven
}: Props) => {
  const clientWebResource = job?.client.webResource

  return (
    <Table.Row key={id} stripeEven={stripeEven}>
      <Table.Cell>{job && decodeEntityId(job.id).id}</Table.Cell>
      <Table.Cell css={S.wideRow}>
        <TypographyOverflowLink tooltipContent={webResource?.text}>
          <LinkWrapper
            wrapWhen={Boolean(webResource?.url)}
            href={webResource.url as string}
          >
            {webResource.text}
          </LinkWrapper>
        </TypographyOverflowLink>
      </Table.Cell>
      <Table.Cell css={S.wideRow}>
        <TypographyOverflowLink tooltipContent={clientWebResource?.text}>
          <LinkWrapper
            wrapWhen={Boolean(clientWebResource?.url)}
            href={clientWebResource?.url as string}
          >
            {clientWebResource?.text}
          </LinkWrapper>
        </TypographyOverflowLink>
      </Table.Cell>
      <Table.Cell css={S.noWrap}>
        <SourcingRequestStatus status={status} />
      </Table.Cell>
    </Table.Row>
  )
}

export default SourcingRequestsTableRow
