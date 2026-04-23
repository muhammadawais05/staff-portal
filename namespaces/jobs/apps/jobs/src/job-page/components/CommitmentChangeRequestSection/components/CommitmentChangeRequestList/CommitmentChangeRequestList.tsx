import React from 'react'
import { DetailedList as DL } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { NO_VALUE } from '@staff-portal/config'

import { LABEL_COLUMN_WIDTH } from '../../config'
import { CommitmentChangeRequestFragment } from '../../data'
import CommitmentField from '../CommitmentField'

export type Props = {
  commitmentChangeRequest: CommitmentChangeRequestFragment | null | undefined
}

const CommitmentChangeRequestList = ({ commitmentChangeRequest }: Props) => {
  if (!commitmentChangeRequest) {
    return null
  }

  const { createdAt, changeDate, newAvailability, newExtraHoursEnabled } =
    commitmentChangeRequest

  return (
    <DL
      defaultValue={NO_VALUE}
      labelColumnWidth={LABEL_COLUMN_WIDTH}
      data-testid='CommitmentChangeRequestList'
    >
      <DL.Row>
        <DL.Item label='Desired Commitment'>
          <CommitmentField
            commitment={newAvailability}
            newExtraHoursEnabled={newExtraHoursEnabled}
          />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Change Date' value={parseAndFormatDate(changeDate)} />
        <DL.Item label='Submitted' value={parseAndFormatDate(createdAt)} />
      </DL.Row>
    </DL>
  )
}

export default CommitmentChangeRequestList
