export const SIMPLE_OBJECT_PAYLOAD_TEMPLATE = {
  id: '00058cef-a630-c03a-0000-000001c92832',
  occurredAt: '2019-07-05T10:09:56-04:00',
  action: 'added_flag',
  subjectGID: 'gid://platform/Company/1472501',
  subjectName: null,
  performerGID: 'gid://platform/Staff/128917',
  comment: 'This part was obfuscated, some content was here.',
  payload: '{"flag":{"gid":"gid://platform/Flag/24"}}',
  template:
    "%{performer} added flag '%{payload.flag}' to %{subject.designation} %{subject}"
}

export const MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Staff/128917',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Mahiara Pimentel',
      accessible: true,
      options: [],
      path: '/platform/staff/advanced_recruiters/128917'
    }
  },
  {
    gid: 'gid://platform/Company/1472501',
    associationReferences: [],
    designation: 'company',
    reference: {
      text: 'Senger, West and Abernathy',
      accessible: true,
      options: [],
      path: '/platform/staff/companies/1472501'
    }
  },
  {
    gid: 'gid://platform/Flag/24',
    associationReferences: [],
    designation: 'flag',
    reference: {
      text: 'Publicity not accepted',
      accessible: true,
      options: [],
      path: null
    }
  }
]
