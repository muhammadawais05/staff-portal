/* eslint-disable no-useless-escape */

export const RANGE_TYPE_PAYLOAD_TEMPLATE = {
  DATE: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"period_on": {"stop": "2019-06-19", "$type": "range", "start": "2019-06-17"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  DATE_START: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload: '{"period_on": {"$type": "range", "start": "2019-06-17"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  DATE_STOP: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload: '{"period_on": {"stop": "2019-06-19", "$type": "range"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  DATE_EQUAL: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"period_on": {"stop": "2019-06-19", "$type": "range", "start": "2019-06-19"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  TIME: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"period_on": {"stop": "12:00:00", "$type": "range", "start": "10:20:30"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  TIME_START: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload: '{"period_on": {"$type": "range", "start": "10:20:30"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  TIME_STOP: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload: '{"period_on": {"stop": "12:00:00", "$type": "range"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  TIME_EQUAL: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"period_on": {"stop": "12:00:00", "$type": "range", "start": "12:00:00"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  PLAIN: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"period_on": {"stop": "today", "$type": "range", "start": "yesterday"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  PLAIN_START: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload: '{"period_on": {"$type": "range", "start": "yesterday"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  PLAIN_STOP: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload: '{"period_on": {"stop": "today", "$type": "range"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  },
  PLAIN_EQUAL: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-08T15:04:25+03:00',
    action: 'scheduled_workdays',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"period_on": {"stop": "today", "$type": "range", "start": "today"}}',
    template: '%{subject} scheduled working day(s) %{payload.period_on}'
  }
}

export const MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Talent/1513001',
    associationReferences: [],
    designation: 'developer',
    reference: {
      text: 'Piotr Imb',
      accessible: true,
      options: [],
      path: '/platform/staff/talents/1513001'
    }
  }
]
