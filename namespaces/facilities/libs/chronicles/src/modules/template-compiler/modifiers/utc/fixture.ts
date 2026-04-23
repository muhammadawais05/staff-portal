/* eslint-disable no-useless-escape */

export const CHANGE_UTC_TEMPLATE = {
  id: '0005944e-024e-401d-0000-000001f9167f',
  occurredAt: '2019-10-07T04:40:50-04:00',
  action: 'scheduled',
  subjectGID: 'gid://platform/Meeting/578195',
  subjectName: null,
  performerGID: 'gid://platform/Staff/100010',
  comment: null,
  payload:
    '{"organizer":{"gid":"gid://platform/Staff/1253126"},"scheduled_at":"2019-10-08T15:00:00.000000000Z"}',
  template:
    '%{performer} scheduled meeting with %{payload.organizer} for %{payload.scheduled_at|utc} UTC'
}

export const CHANGE_UTC_MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Meeting/578195',
    associationReferences: [],
    designation: 'meeting',
    reference: {
      text: 'Obfuscated subject for meeting 578195',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/Staff/100010',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Alexander Danilenko',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/Staff/1253126',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Faye Astorga',
      accessible: false,
      options: [],
      path: null
    }
  }
]
