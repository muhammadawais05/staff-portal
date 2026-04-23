import React from 'react'
import { TypographyOverflow, Table } from '@toptal/picasso'
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT
} from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import { MeetingAttendeeItemFragment } from '../MeetingAttendeesContent/data/get-meeting-attendees/meeting-attendee-item-fragment.staff.gql.types'
import * as S from '../MeetingAttendeeTable/styles'

export interface Props {
  attendeesLogs: MeetingAttendeeItemFragment
  stripeEven?: boolean
}

const CallTableRow = ({ attendeesLogs, stripeEven }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  return (
    <Table.Row data-testid='attentees-table-row' stripeEven={stripeEven}>
      <Table.Cell css={S.commonColumn} data-testid='table-row-name'>
        <TypographyOverflow>{attendeesLogs.name}</TypographyOverflow>
      </Table.Cell>

      <Table.Cell css={S.commonColumn} data-testid='table-row-countryName'>
        <TypographyOverflow>{attendeesLogs.countryName}</TypographyOverflow>
      </Table.Cell>

      <Table.Cell css={S.commonColumn} data-testid='table-row-meetingJoinTime'>
        <TypographyOverflow>
          {`${formatDateTime(
            attendeesLogs.meetingJoinTime,
            DEFAULT_DATE_FORMAT
          )}, ${formatDateTime(
            attendeesLogs.meetingJoinTime,
            DEFAULT_TIME_FORMAT
          )}`}
        </TypographyOverflow>
      </Table.Cell>

      <Table.Cell css={S.commonColumn} data-testid='table-row-meetingLeaveTime'>
        <TypographyOverflow>
          {`${formatDateTime(
            attendeesLogs.meetingLeaveTime,
            DEFAULT_DATE_FORMAT
          )}, ${formatDateTime(
            attendeesLogs.meetingLeaveTime,
            DEFAULT_TIME_FORMAT
          )}`}
        </TypographyOverflow>
      </Table.Cell>
    </Table.Row>
  )
}

export default CallTableRow
