/* eslint-disable no-useless-escape */

export const EMPHASIZED_TEMPLATE = {
  id: '000591a7-3579-415d-0000-000001ecf7bd',
  occurredAt: '2019-09-03T10:50:26-04:00',
  action: 'reopened',
  subjectGID: 'gid://platform/OperationalIssue/136540',
  subjectName: null,
  performerGID: 'gid://platform/Staff/1259524',
  comment: 'This part was obfuscated, some content was here.',
  payload: '{"role_or_team":{"gid":"gid://platform/Staff/411440"}}',
  template:
    '%{performer} %{action|emphasized(bad)} operational issue %{subject}'
}

export const MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Staff/411440',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Matthew Mitchell',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/Staff/1259524',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Ruthanne Bartoletti',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/OperationalIssue/136540',
    associationReferences: [],
    designation: 'operational issue',
    reference: {
      text: 'Overdue tasks',
      accessible: false,
      options: [],
      path: null
    }
  }
]
