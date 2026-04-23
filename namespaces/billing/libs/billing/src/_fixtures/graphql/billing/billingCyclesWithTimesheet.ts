import { LegacyGidFormat } from '../../../_lib/helpers/apollo'
import MockBillingCycle from './billingCycle'

export default [
  {
    ...MockBillingCycle,
    operations: {
      __typename: 'BillingCycleOperations',
      timesheetApprove: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetReject: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetSubmit: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      },
      timesheetUnsubmit: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetUpdate: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      }
    },
    timesheetComment: 'Example empty timesheet',
    timesheetRejected: false,
    timesheetRejectionComment: '',
    timesheetSubmissionBlocked: false,
    timesheetSubmitted: false,
    timesheetExtraHours: false
  },
  {
    ...MockBillingCycle,
    operations: {
      __typename: 'BillingCycleOperations',
      timesheetApprove: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetReject: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetSubmit: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      },
      timesheetUnsubmit: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetUpdate: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      }
    },
    breaksPeriod: [],
    endDate: '2019-05-19',
    id: 'VjEtQmlsbGluZ0N5Y2xlLTMzNjkyNw',
    gid: `${LegacyGidFormat.billingCycle}336927`,
    hours: '0',
    chargedHours: '0',
    startDate: '2019-05-06',
    status: 'not paid',
    timesheetApproved: false,
    timesheetComment: 'Example empty timesheet',
    timesheetOverdue: true,
    timesheetRecords: [],
    timesheetRejected: false,
    timesheetRejectionComment: '',
    timesheetSubmissionBlocked: false,
    timesheetSubmissionDeadline: '2019-06-02T00:00:00-04:00',
    timesheetSubmitted: false,
    timesheetExtraHours: false
  },
  {
    ...MockBillingCycle,
    operations: {
      __typename: 'BillingCycleOperations',
      timesheetApprove: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetReject: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetSubmit: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetUnsubmit: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      },
      timesheetUpdate: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      }
    },
    breaksPeriod: [],
    endDate: '2019-05-27',
    id: 'VjEtQmlsbGluZ0N5Y2xlLTMzNjkyOA',
    gid: `${LegacyGidFormat.billingCycle}336928`,
    hours: '40',
    chargedHours: '40',
    startDate: '2019-05-20',
    status: 'not paid',
    timesheetComment: 'Example submitted and rejected timesheet',
    timesheetRecords: [
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-20',
        duration: '180.0',
        note: ''
      },
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-21',
        duration: '120.0',
        note: ''
      },
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-22',
        duration: '0.0',
        note: ''
      },
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-23',
        duration: '0.0',
        note: ''
      },
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-24',
        duration: '0.0',
        note: ''
      },
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-25',
        duration: '120.0',
        note: ''
      },
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-26',
        duration: '0.0',
        note: ''
      },
      {
        __typename: 'TimesheetRecord',
        date: '2019-05-27',
        duration: '0.0',
        note: ''
      }
    ],
    timesheetRejected: true,
    timesheetRejectionComment: 'Example Rejection of a timesheet',
    timesheetSubmissionDeadline: '2019-06-02T00:00:00-04:00',
    timesheetExtraHours: false
  },
  {
    ...MockBillingCycle,
    operations: {
      __typename: 'BillingCycleOperations',
      timesheetApprove: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetReject: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetSubmit: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      },
      timesheetUnsubmit: {
        __typename: 'Operation',
        callable: 'DISABLED',
        messages: []
      },
      timesheetUpdate: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      }
    },
    breaksPeriod: ['2019-05-31', '2019-06-01'],
    endDate: '2019-06-04',
    id: 'VjEtQmlsbGluZ0N5Y2xlLTMzNjkyOQ',
    gid: `${LegacyGidFormat.billingCycle}336929`,
    hours: '40',
    chargedHours: '40',
    startDate: '2019-05-28',
    status: 'not paid',
    timesheetComment: 'Example Create Timesheet',
    timesheetRecords: [],
    timesheetRejected: false,
    timesheetRejectionComment: '',
    timesheetSubmissionDeadline: '2019-06-02T00:00:00-04:00',
    timesheetSubmitted: false,
    timesheetExtraHours: false
  }
]
