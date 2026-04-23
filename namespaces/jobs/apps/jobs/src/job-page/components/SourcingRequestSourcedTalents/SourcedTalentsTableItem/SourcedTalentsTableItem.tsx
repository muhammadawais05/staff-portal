import React, { memo } from 'react'
import { Container, Table, Typography } from '@toptal/picasso'
import { ColoredStatus, LinkWrapper } from '@staff-portal/ui'
import {
  getTalentProfileLinkTarget,
  SourcingRequestTalentFragment
} from '@staff-portal/jobs'

import * as S from './styles'
import * as TableStyles from '../SourcedTalentsTable/styles'
import LinkSourcingRequestButton from './components/LinkSourcingRequestButton'
import UnlinkSourcingRequestButton from './components/UnlinkSourcingRequestButton'
import { TALENT_DETAILED_STATUS_MAPPING } from './constants'

export interface Props {
  jobId: string
  sourcingTalentRequest: SourcingRequestTalentFragment
  showActionsColumn: boolean
  index: number
}

const SourcedTalentsTableItem = ({
  jobId,
  sourcingTalentRequest,
  showActionsColumn,
  index
}: Props) => {
  const { talent } = sourcingTalentRequest

  const isDeletedAt = sourcingTalentRequest.deletedAt !== null
  const actionsCol = showActionsColumn && (
    <Container flex justifyContent='space-between'>
      {isDeletedAt && (
        <LinkSourcingRequestButton
          jobId={jobId}
          talentId={sourcingTalentRequest.talent.id}
          operation={
            sourcingTalentRequest.talent.operations.linkSourcingRequest
          }
        />
      )}
      {!isDeletedAt && (
        <UnlinkSourcingRequestButton
          operation={
            sourcingTalentRequest.operations.unlinkSourcingRequestTalent
          }
          sourcingTalentRequestId={sourcingTalentRequest.id}
          talentFullName={sourcingTalentRequest.talent.fullName}
        />
      )}
    </Container>
  )
  const { text: statusText, color: statusColor } =
    TALENT_DETAILED_STATUS_MAPPING[
      talent.detailedStatus ?? talent.cumulativeStatus
    ]

  return (
    <Table.Row
      css={[isDeletedAt && S.unlinked]}
      stripeEven={Boolean(index % 2)}
    >
      <Table.Cell css={TableStyles.talentCol}>
        <LinkWrapper
          wrapWhen={Boolean(talent.webResource.url)}
          href={talent.webResource.url as string}
          target={getTalentProfileLinkTarget(talent.webResource.url)}
        >
          {talent.fullName}
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell css={TableStyles.statusCol}>
        <ColoredStatus status={statusText} color={statusColor} />
      </Table.Cell>
      <Table.Cell css={TableStyles.statusCol}>
        <Typography weight='semibold'>
          {!isDeletedAt ? 'Reserved' : 'Not Reserved'}
        </Typography>
      </Table.Cell>
      {showActionsColumn && (
        <Table.Cell
          className='actions'
          data-testid='actions-column'
          css={TableStyles.actionsCol}
        >
          {actionsCol}
        </Table.Cell>
      )}
    </Table.Row>
  )
}

export default memo(SourcedTalentsTableItem)
