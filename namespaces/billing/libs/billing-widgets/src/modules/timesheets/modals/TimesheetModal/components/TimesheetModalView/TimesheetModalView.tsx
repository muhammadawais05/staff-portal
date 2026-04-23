import { Modal } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import {
  TimesheetEditFormInput,
  getTimesheetEditTotal
} from '../../../../utils/timesheet'
import TimesheetDayList from '../TimesheetDayList'
import TimesheetJobTitle from '../TimesheetJobTitle'
import TimesheetMessage from '../TimesheetMessage'
import TimesheetModalFooter from '../../../components/TimesheetModalFooter'
import TimesheetRejectionComment from '../TimesheetRejectionComment'
import TimesheetSummary from '../TimesheetSummary'

interface Props {
  timesheet: BillingCycleItemFragment
  timesheetRecords: TimesheetEditFormInput[]
}

const displayName = 'TimesheetModalView'

const TimesheetModalView: FC<Props> = memo(
  ({ timesheet, timesheetRecords }) => {
    const { breaksPeriod, endDate, startDate } = timesheet
    const { hours, minutes } = getTimesheetEditTotal(timesheetRecords)

    return (
      <>
        <Modal.Content>
          <TimesheetRejectionComment timesheet={timesheet} />
          <TimesheetMessage timesheet={timesheet} />
          <TimesheetJobTitle />
          <TimesheetSummary
            hours={hours}
            minutes={minutes}
            timesheet={timesheet}
          />
          <TimesheetDayList
            breaksArray={breaksPeriod}
            endDate={endDate}
            isEdit={false}
            startDate={startDate}
            timesheetRecords={timesheetRecords}
          />
        </Modal.Content>
        <TimesheetModalFooter />
      </>
    )
  }
)

TimesheetModalView.displayName = displayName

export default TimesheetModalView
