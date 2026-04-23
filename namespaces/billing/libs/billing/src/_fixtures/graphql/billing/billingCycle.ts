import { LegacyGidFormat } from '../../../_lib/helpers/apollo'

export default {
  __typename: 'BillingCycle',
  operations: {
    __typename: 'BillingCycleOperations',
    timesheetApprove: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    timesheetReject: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    timesheetSubmit: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    timesheetUnsubmit: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    timesheetUpdate: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    }
  },
  actualCommitment: {
    __typename: 'Commitment',
    availability: 'full_time',
    availabilityHours: 40,
    companyRate: '2800.0',
    startDate: '2019-02-18',
    talentRate: '1600.0'
  },
  breaksPeriod: ['2019-04-24', '2019-04-29'],
  endDate: '2019-05-05',
  id: 'VjEtQmlsbGluZ0N5Y2xlLTMzMzY3Ng',
  gid: `${LegacyGidFormat.billingCycle}333676`,
  hours: '80.0',
  chargedHours: '80.0',
  extraHours: '0.0',
  kind: 'development',
  minimumCommitment: {
    __typename: 'MinimumCommitment',
    minimumHours: 20,
    applicable: true,
    reasonNotApplicable: 'IS_TRIAL'
  },
  originalCommitment: {
    __typename: 'Commitment',
    availability: 'full_time',
    availabilityHours: 40,
    companyRate: '2800.0',
    startDate: '2019-02-18',
    talentRate: '1600.0'
  },
  startDate: '2019-04-22',
  status: 'paid',
  timesheetApproved: false,
  timesheetComment: '',
  timesheetOverdue: false,
  timesheetRecords: [
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-22',
      duration: '180.0',
      note: ''
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-23',
      duration: '120.0',
      note: ''
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-24',
      duration: '0.0',
      note: 'Sample note 1'
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-25',
      duration: '0.0',
      note: 'Sample note 2'
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-26',
      duration: '0.0',
      note: ''
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-27',
      duration: '120.0',
      note: ''
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-28',
      duration: '0.0',
      note: ''
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-29',
      duration: '0.0',
      note: ''
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-04-30',
      duration: '0.0',
      note: 'My Note 3'
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-05-01',
      duration: '0.0',
      note: 'My Note 4'
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-05-02',
      duration: '0.0',
      note: 'My Note 5'
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-05-03',
      duration: '0.0',
      note: 'My Note 6'
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-05-04',
      duration: '0.0',
      note: 'My Note 7'
    },
    {
      __typename: 'TimesheetRecord',
      date: '2019-05-05',
      duration: '0.0',
      note: 'My Note 8'
    }
  ],
  timesheetRejected: true,
  timesheetRejectionComment: 'example reject commend',
  timesheetRequiresApproval: false,
  timesheetSubmissionBlocked: true,
  timesheetSubmissionDeadline: '2019-06-02T00:00:00-04:00',
  timesheetSubmitted: true,
  timesheetExtraHours: false
}
