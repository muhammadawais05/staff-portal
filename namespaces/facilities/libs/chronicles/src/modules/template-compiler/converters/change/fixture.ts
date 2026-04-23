/* eslint-disable no-useless-escape */

export const CHANGE_TYPE_PAYLOAD_TEMPLATE_PLAIN = {
  id: '00058e6c-fa31-5718-0000-000001d2e4d7',
  occurredAt: '2019-07-24T16:06:28+03:00',
  action: 'inactive_rejection_date_updated',
  subjectGID: 'gid://platform/Talent/1513001',
  subjectName: null,
  performerGID: null,
  comment: null,
  payload:
    '{"inactive_rejection_date":{"to":"2019-07-26","from":null,"$type":"change"}}',
  template:
    '%{performer} changed inactive rejection date of %{subject} %{payload.inactive_rejection_date|nolabel}'
}

export const CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_NAME_AND_LABEL = {
  id: '00058976-e1d7-5512-0000-000001b23ed6',
  occurredAt: '2019-05-22T12:49:31+03:00',
  action: 'updated',
  subjectGID: 'gid://platform/Talent/1513001',
  subjectName: null,
  performerGID: null,
  comment: null,
  payload:
    '{"booking":{"to":true,"from":false,"name":"allow_anonymous_booking","$type":"change","label":"Allow anonymous booking"}}',
  template: '%{subject} %{action} %{subject.designation} %{payload.booking}'
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

export const CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_USING_KEY = {
  id: '0005884b-6a84-2878-0000-000001a96cf2',
  occurredAt: '2019-05-07T15:32:54+03:00',
  action: 'counterparty_updated',
  subjectGID: 'gid://platform/Call/307650',
  subjectName: null,
  performerGID: 'gid://platform/Staff/859288',
  comment: null,
  payload:
    '{"counterparty":{"to":{"gid":"gid://platform/Company/1242682"},"from":null,"$type":"change"}}',
  template: '%{performer} updated call %{payload.counterparty}'
}

export const CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_USING_KEY_MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Call/307650',
    associationReferences: [],
    designation: 'call',
    reference: {
      text: '',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/Staff/859288',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Mackenzie Messenger',
      accessible: true,
      options: [],
      path: '/platform/staff/sales/859288'
    }
  },
  {
    gid: 'gid://platform/Company/1242682',
    associationReferences: [],
    designation: 'company',
    reference: {
      text: 'Stamm-Herzog',
      accessible: true,
      options: [],
      path: '/platform/staff/companies/1242682'
    }
  }
]
