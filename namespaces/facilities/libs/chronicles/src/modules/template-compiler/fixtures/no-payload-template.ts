export const NO_PAYLOAD_TEMPLATE = {
  id: '00058d19-e6f9-44fc-0000-000001c9bf02',
  occurredAt: '2019-07-07T12:34:32-04:00',
  action: 'updated',
  subjectGID: 'gid://platform/Company/1493407',
  subjectName: null,
  performerGID: 'gid://platform/Staff/128917',
  comment: 'This part was obfuscated, some content was here.',
  payload: '{}',
  template: '%{performer} updated profile of %{subject}'
}

export const MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Staff/128917',
    associationReferences: [],
    designation: 'advanced recruiter',
    reference: {
      text: 'Mahiara Pimentel',
      accessible: true,
      options: [],
      path: '/platform/staff/advanced_recruiters/128917'
    }
  },
  {
    gid: 'gid://platform/Company/1493407',
    associationReferences: [],
    designation: 'company',
    reference: {
      text: 'Schimmel-Weimann',
      accessible: true,
      options: [],
      path: '/platform/staff/companies/1493407'
    }
  }
]
