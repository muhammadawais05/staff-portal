/* eslint-disable no-useless-escape */

export const CHANGE_SWITCH_TEMPLATE = {
  id: '00058ed2-86bd-2b70-0000-000001d58665',
  occurredAt: '2019-07-29T17:15:38+03:00',
  action: 'updated_auto_allocate_memos',
  subjectGID: 'gid://platform/Company/1489755',
  subjectName: null,
  performerGID: 'gid://platform/Staff/420656',
  comment: null,
  payload: '{"auto_allocate_memos":{"to":false,"from":true,"$type":"change"}}',
  template:
    '%{performer} %{payload.auto_allocate_memos|switch} automatic allocation of memorandums to new invoices for %{subject}'
}

export const CHANGE_SWITCH_MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Staff/420656',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Joanna Cavazos',
      accessible: true,
      options: [],
      path: '/platform/staff/staff/420656'
    }
  },
  {
    gid: 'gid://platform/Company/1489755',
    associationReferences: [],
    designation: 'company',
    reference: {
      text: "Bartoletti-O'Reilly",
      accessible: true,
      options: [],
      path: '/platform/staff/companies/1489755'
    }
  }
]
