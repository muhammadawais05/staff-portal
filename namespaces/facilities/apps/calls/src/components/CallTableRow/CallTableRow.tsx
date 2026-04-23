import React from 'react'
import { Table, TypographyOverflow } from '@toptal/picasso'
import { TypographyOverflowLink } from '@staff-portal/ui'
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT
} from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import { StartCallLink } from '@staff-portal/communication'

import { CallsListItemFragment } from '../CallTablePage/data/get-calls-list/calls-list-item-fragment.staff.gql.types'
import UserField from '../UserField/UserField'
import formatCallType from '../../utils/format-call-type'
import formatDuration from '../../utils/format-duration'
import CallActionsCell from '../CallActionsCell'
import EditableCallPurposeCell from '../EditableCallPurposeCell'
import DismissedCell from '../DismissedCell'
import * as S from '../CallTable/styles'

export interface Props {
  call: CallsListItemFragment
  stripeEven?: boolean
}

const CallTableRow = ({ call, stripeEven }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  return (
    <Table.Row stripeEven={stripeEven} data-testid='table-row'>
      <Table.Cell css={S.dateColumn} data-testid='table-row-date'>
        <TypographyOverflow>
          {formatDateTime(call.createdAt, DEFAULT_DATE_FORMAT)}
        </TypographyOverflow>
      </Table.Cell>

      <Table.Cell css={S.timeColumn} data-testid='table-row-time'>
        <TypographyOverflow>
          {formatDateTime(call.createdAt, DEFAULT_TIME_FORMAT)}
        </TypographyOverflow>
      </Table.Cell>

      <Table.Cell css={S.typeColumn} data-testid='table-row-type'>
        {formatCallType(call)}
      </Table.Cell>

      <Table.Cell css={S.userColumn} data-testid='table-row-user'>
        <DismissedCell isDismissed={call.isDismissed}>
          <UserField
            callId={call.id}
            initialValue={call.counterparty?.fullName ?? undefined}
            profileUrl={call.counterparty?.profileUrl ?? undefined}
          />
        </DismissedCell>
      </Table.Cell>

      <Table.Cell css={S.detailsColumn} data-testid='table-row-details'>
        {call.counterparty?.phoneNumber && (
          <StartCallLink phoneNumber={call.counterparty.phoneNumber as string}>
            <TypographyOverflowLink
              css={S.detailsText}
              size='medium'
              color='inherit'
            >
              {call.counterparty?.phoneNumber}
            </TypographyOverflowLink>
          </StartCallLink>
        )}
      </Table.Cell>

      <Table.Cell css={S.purposeColumn} data-testid='table-row-purpose'>
        <DismissedCell isDismissed={call.isDismissed}>
          <EditableCallPurposeCell
            callId={call.id}
            counterparty={call.counterparty}
            purpose={call.purpose}
            customPurpose={call.customPurpose}
          />
        </DismissedCell>
      </Table.Cell>

      <Table.Cell css={S.durationColumn} data-testid='table-row-duration'>
        <TypographyOverflow>
          {!!call.duration && formatDuration(call.duration)}
        </TypographyOverflow>
      </Table.Cell>

      <Table.Cell css={S.actionsColumn}>
        <CallActionsCell
          isUnfilled={call.isUnfilled}
          isDismissed={call.isDismissed}
          callId={call.id}
          voicemailUrl={call.voicemail?.url}
        />
      </Table.Cell>
    </Table.Row>
  )
}

export default CallTableRow
