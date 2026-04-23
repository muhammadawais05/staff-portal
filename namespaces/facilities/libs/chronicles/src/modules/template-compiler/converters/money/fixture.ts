/* eslint-disable no-useless-escape */

export const MONEY_TYPE_PAYLOAD_TEMPLATE = {
  id: '00058e6c-fa31-5718-0000-000001d2e4d7',
  occurredAt: '2019-07-24T16:06:28+03:00',
  action: 'inactive_rejection_date_updated',
  subjectGID: 'gid://platform/Talent/1513001',
  subjectName: null,
  performerGID: null,
  comment: null,
  payload:
    '{"refund": {"$type": "money", "amount": "7200.0"}, "transfer": {"gid": "gid://platform/AccrualAccounting::Transfer/459708"}}',
  template: '%{payload.refund}'
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
