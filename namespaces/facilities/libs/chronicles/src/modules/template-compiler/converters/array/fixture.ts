/* eslint-disable no-useless-escape */

export const ARRAY_TYPE_PAYLOAD_TEMPLATE = {
  CHANGE_ITEMS_SECOND_VARIANT: {
    id: '00058976-e1d7-5512-0000-000001b23ed6',
    occurredAt: '2019-05-22T12:49:31+03:00',
    action: 'updated',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"changes":[{"to":"40","from":"30","name":"allow_anonymous_booking","$type":"change","label":"Allow anonymous booking"},{"to":"15","from":"30","name":"owner_ids","$type":"change","label":"Owner ids"}]}',
    template: '%{subject} %{action} %{subject.designation} %{payload.changes}'
  },
  CHANGE_ITEMS: {
    id: '00058976-e1d7-5512-0000-000001b23ed6',
    occurredAt: '2019-05-22T12:49:31+03:00',
    action: 'updated',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"changes":[{"to":true,"from":false,"name":"allow_anonymous_booking","$type":"change","label":"Allow anonymous booking"},{"to":["531826",""],"from":[531826],"name":"owner_ids","$type":"change","label":"Owner ids"}]}',
    template: '%{subject} %{action} %{subject.designation} %{payload.changes}'
  },
  CHANGE_ITEMS_MULTIPLE: {
    id: '00058976-e1d7-5512-0000-000001b23ed6',
    occurredAt: '2019-05-22T12:49:31+03:00',
    action: 'updated',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"changes":[{"to":"40","from":"30","name":"allow_anonymous_booking","$type":"change","label":"Allow anonymous booking"},{"to":"15","from":"30","name":"owner_ids","$type":"change","label":"Owner ids"}, {"to":"20","from":"200","name":"allow_anonymous_booking","$type":"change","label":"Allow anonymous booking"}]}',
    template: '%{subject} %{action} %{subject.designation} %{payload.changes}'
  },
  PLAIN_ITEMS: {
    id: '00058d3c-8010-d66c-0000-000001cabff6',
    occurredAt: '2019-07-09T12:51:09+03:00',
    action: 'denied_all',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"abilities":[{"gid":"gid://platform/Ability/85","reference":"Master booking page configurations: Manage"},{"gid":"gid://platform/Ability/5","reference":"Matcher"}]}',
    template: 'Removed all permissions for %{subject}: %{payload.abilities}'
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
