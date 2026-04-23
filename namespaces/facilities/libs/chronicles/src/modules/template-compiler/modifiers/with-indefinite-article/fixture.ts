/* eslint-disable no-useless-escape */

export const ENTRY_WITH_INDEFINITE_ARTICLE_TEMPLATE = {
  id: '00058f5e-7e02-ae60-0000-000001d8fb03',
  occurredAt: '2019-08-05T16:14:47+03:00',
  action: 'changed_allocated_hours',
  subjectGID: 'gid://platform/Talent/125545',
  subjectName: null,
  performerGID: null,
  comment: null,
  payload: '{"performed_via":"SMS"}',
  template:
    '%{performer} informed by %{payload.performed_via|with_indefinite_article}'
}

export const ENTRY_WITH_ORDINARY_ARTICLE_TEMPLATE = {
  id: '00058f5e-7e02-ae60-0000-000001d8fb03',
  occurredAt: '2019-08-05T16:14:47+03:00',
  action: 'changed_allocated_hours',
  subjectGID: 'gid://platform/Talent/125545',
  subjectName: null,
  performerGID: null,
  comment: null,
  payload: '{"performed_via":"social network"}',
  template:
    '%{performer} informed by %{payload.performed_via|with_indefinite_article}'
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
