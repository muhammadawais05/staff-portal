/* eslint-disable no-useless-escape */

export const CHANGE_NO_LABEL_TEMPLATE = {
  id: '00058f5e-7e02-ae60-0000-000001d8fb03',
  occurredAt: '2019-08-05T16:14:47+03:00',
  action: 'changed_allocated_hours',
  subjectGID: 'gid://platform/Talent/125545',
  subjectName: null,
  performerGID: null,
  comment: null,
  payload: '{"allocated_hours":{"to":20,"from":10,"$type":"change"}}',
  template:
    '%{performer} changed allocated hours of %{subject} %{payload.allocated_hours|nolabel} hours/week'
}

export const MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/Talent/125545',
    associationReferences: [],
    designation: 'developer',
    reference: {
      text: 'Isiah Ferry',
      accessible: true,
      options: [],
      path: '/platform/staff/talents/125545'
    }
  }
]
