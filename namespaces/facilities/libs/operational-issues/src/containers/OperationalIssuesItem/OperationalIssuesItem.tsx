import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { getOperationalIssuePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { isOperationHidden } from '@staff-portal/operations'

import * as S from './styles'
import { OperationalIssueFragment } from '../../data/operational-issue-fragment/operational-issue-fragment.staff.gql.types'
import OperationalIssueBadge from '../../components/OperationalIssueBadge/OperationalIssueBadge'
import ResolveButton from '../ResolveButton/ResolveButton'
import ClaimButton from '../ClaimButton/ClaimButton'
import VerifyButton from '../VerifyButton/VerifyButton'
import ApproveButton from '../ApproveButton/ApproveButton'
import ReOpenButton from '../ReOpenButton/ReOpenButton'

interface Props {
  operationalIssue: OperationalIssueFragment
}

const OperationalIssuesItem = ({
  operationalIssue: {
    id,
    description,
    lastTimeOccurredAt,
    operations: {
      approveOperationalIssue: approveOperationalIssueOperation,
      resolveOperationalIssue: resolveOperationalIssueOperation,
      claimOperationalIssue: claimOperationalIssueOperation,
      reopenOperationalIssue: reopenOperationalIssueOperation,
      verifyOperationalIssue: verifyOperationalIssueOperation
    },
    template,
    occurrencesCount
  }
}: Props) => {
  const { id: decodedId } = decodeEntityId(id)

  return (
    <Container padded='small' css={S.withBorder}>
      <Container flex>
        {occurrencesCount && occurrencesCount > 1 && (
          <Container right='xsmall'>
            <OperationalIssueBadge count={occurrencesCount} />
          </Container>
        )}

        <Link href={getOperationalIssuePath(decodedId)}>
          <Typography size='medium' as='span'>
            {description}
          </Typography>
        </Link>
      </Container>

      <Container
        flex
        direction='row'
        justifyContent='space-between'
        top='small'
      >
        {lastTimeOccurredAt && (
          <Typography size='xsmall'>
            {getDateDistanceFromNow(lastTimeOccurredAt)}
          </Typography>
        )}
        <Container justifyContent='flex-end' css={S.buttonContainer}>
          {template?.id && (
            <ResolveButton
              operationalIssueId={id}
              templateId={template.id}
              templateName={template?.name}
              recommendedSolutions={template?.recommendedSolutions}
              operation={resolveOperationalIssueOperation}
            />
          )}

          <ClaimButton
            operationalIssueId={id}
            operation={claimOperationalIssueOperation}
          />

          <VerifyButton
            hidden={!isOperationHidden(approveOperationalIssueOperation)}
            operationalIssueId={id}
            operation={verifyOperationalIssueOperation}
          />

          <ApproveButton
            operationalIssueId={id}
            operation={approveOperationalIssueOperation}
          />

          <ReOpenButton
            operationalIssueId={id}
            operation={reopenOperationalIssueOperation}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default OperationalIssuesItem
