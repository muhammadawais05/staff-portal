import React from 'react'
import {
  Container,
  Table,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { LinkWrapper } from '@staff-portal/ui'
import { formatDate } from '@staff-portal/date-time-utils'

import { TalentSpecializationApplicationFragment } from '../../data/talent-specialization-application-fragment'
import TalentSpecializationApplicationItemStatus from '../TalentSpecializationApplicationItemStatus'
import ConvertSpecializationApplicationButton from '../ConvertSpecializationApplicationButton'
import ResumeTalentSpecializationApplicationButton from '../ResumeTalentSpecializationApplicationButton'
import RejectSpecializationApplicationButton from '../RejectSpecializationApplicationButton'
import * as S from './styles'

export interface Props {
  talentId: string
  talentName: string
  item: TalentSpecializationApplicationFragment
  userTimezone: string
  hasActions: boolean
  stripeEven?: boolean
}

const getActions = ({
  item,
  hasActions,
  talentId,
  talentName
}: {
  item: TalentSpecializationApplicationFragment
  hasActions: boolean
} & Pick<Props, 'talentId' | 'talentName'>) => {
  if (!hasActions) {
    return null
  }

  const {
    id,
    specialization,
    operations: {
      convertSpecializationApplication: convertOperation,
      restoreSpecializationApplication: restoreOperation,
      rejectSpecializationApplication: rejectOperation
    }
  } = item

  return (
    <Table.Cell>
      <Container flex css={S.buttonContainer}>
        {rejectOperation && (
          <RejectSpecializationApplicationButton
            talentId={talentId}
            specializationApplicationId={id}
            operation={rejectOperation}
          />
        )}
        {convertOperation && (
          <ConvertSpecializationApplicationButton
            talentId={talentId}
            specializationTitle={specialization?.title as string}
            specializationId={specialization?.id as string}
            specializationApplicationId={id}
            operation={convertOperation}
          />
        )}
        {restoreOperation && (
          <ResumeTalentSpecializationApplicationButton
            talentId={talentId}
            talentName={talentName}
            specializationTitle={specialization?.title || ''}
            specializationId={id}
            operation={restoreOperation}
          />
        )}
      </Container>
    </Table.Cell>
  )
}

const TalentSpecializationApplicationItem = ({
  talentId,
  talentName,
  item,
  userTimezone,
  hasActions,
  stripeEven
}: Props) => {
  const {
    status,
    performer,
    specialization,
    rejectionReason,
    startedAt,
    completedAt
  } = item

  const startedBy = performer?.webResource.text ?? 'System'

  return (
    <Table.Row stripeEven={stripeEven}>
      <Table.Cell>
        {specialization ? (
          specialization.title
        ) : (
          <Typography as='span' data-testid='empty-name'>
            {NO_VALUE}
          </Typography>
        )}
      </Table.Cell>
      <Table.Cell>
        <TalentSpecializationApplicationItemStatus
          status={status}
          rejectionReason={rejectionReason}
        />
      </Table.Cell>
      <Table.Cell css={S.startedByCell}>
        <LinkWrapper
          href={performer?.webResource.url || ''}
          wrapWhen={!!performer}
          data-testid='talent-specialization-application-item-started-by'
        >
          <TypographyOverflow as='span' weight='inherit' color='inherit'>
            {startedBy}
          </TypographyOverflow>
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>
        {startedAt
          ? // eslint-disable-next-line @miovision/disallow-date/no-new-date
            formatDate(new Date(startedAt), { timeZone: userTimezone })
          : NO_VALUE}
      </Table.Cell>
      <Table.Cell>
        {completedAt
          ? // eslint-disable-next-line @miovision/disallow-date/no-new-date
            formatDate(new Date(completedAt), { timeZone: userTimezone })
          : NO_VALUE}
      </Table.Cell>
      {getActions({
        hasActions,
        talentId,
        talentName,
        item
      })}
    </Table.Row>
  )
}

export default TalentSpecializationApplicationItem
