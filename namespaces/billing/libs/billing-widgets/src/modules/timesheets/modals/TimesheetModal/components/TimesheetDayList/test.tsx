import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetDayList from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TimesheetDayList>
) => renderComponent(<TimesheetDayList {...props}>{children}</TimesheetDayList>)

const baseProps = {
  breaksArray: ['2019-04-24', '2019-04-25'],
  timesheetRecords: [
    {
      date: '2019-04-22',
      hours: '01',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-04-23',
      hours: '00',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-04-24',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: 'Sample note 1'
    },
    {
      date: '2019-04-25',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: 'Sample note 2'
    },
    {
      date: '2019-04-26',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: 'Sample note 3'
    },
    {
      date: '2019-04-27',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-04-28',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-04-29',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-04-30',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-05-01',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-05-02',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-05-03',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    {
      date: '2019-05-04',
      hours: '09',
      isBreak: false,
      minutes: '15',
      note: ''
    },
    { date: '2019-05-05', hours: '09', isBreak: false, minutes: '15', note: '' }
  ],
  endDate: fixtures.MockBillingCycle.endDate,
  isEdit: false,
  startDate: fixtures.MockBillingCycle.startDate
}

describe('TimesheetDayList', () => {
  describe('non edit variant', () => {
    it('default render', () => {
      const { container } = render(null, baseProps)

      expect(container).toMatchSnapshot()
    })
  })
})
