export const LINK_TYPE_PAYLOAD_TEMPLATE = {
  FROM_PAYLOAD_ACCESSIBLE_WITH_PATH: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-24T16:06:28+03:00',
    action: 'test',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"some_link": {"$type": "link", "text": "Super company", "path": "/companies/123", "accessible": true}}',
    template: '%{payload.some_link}'
  },
  FROM_PAYLOAD_ACCESSIBLE_WITH_PATH_WITH_OPTIONS: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-24T16:06:28+03:00',
    action: 'test',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"some_link": {"$type": "link", "text": "Super company", "path": "/companies/123", "accessible": true, "options": {"target": "_blank"}}}',
    template: '%{payload.some_link}'
  },
  FROM_PAYLOAD_NOT_ACCESSIBLE_WITH_PATH: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-24T16:06:28+03:00',
    action: 'test',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"some_link": {"$type": "link", "text": "Super company", "path": "/companies/123", "accessible": false}}',
    template: '%{payload.some_link}'
  },
  FROM_PAYLOAD_ACCESSIBLE_WITHOUT_PATH: {
    id: '00058e6c-fa31-5718-0000-000001d2e4d7',
    occurredAt: '2019-07-24T16:06:28+03:00',
    action: 'test',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload:
      '{"some_link": {"$type": "link", "text": "Super company", "accessible": true}}',
    template: '%{payload.some_link}'
  },
  FROM_MODEL_DESCRIPTION: {
    id: '00058e5a-043a-2ab8-0000-000001d276fa',
    occurredAt: '2019-07-23T10:29:12-04:00',
    action: 'sent_email',
    subjectGID: 'gid://platform/Talent/1513001',
    subjectName: null,
    performerGID: null,
    comment: null,
    payload: '{}',
    template: 'Performer sent email to %{subject}'
  }
}

export const MODEL_DESCRIPTION = {
  ACCESSIBLE_WITH_PATH: {
    gid: 'gid://platform/Talent/1513001',
    associationReferences: [],
    designation: 'developer',
    reference: {
      text: 'Piotr Imb',
      accessible: true,
      options: [],
      path: '/platform/staff/talents/1513001'
    }
  },
  ACCESSIBLE_WITH_PATH_WITH_OPTIONS: {
    gid: 'gid://platform/Talent/1513001',
    associationReferences: [],
    designation: 'developer',
    reference: {
      text: 'Dorathy Koepp',
      accessible: true,
      options: [{ name: 'target', value: '_blank' }],
      path: '/resume/vijay-sharma'
    }
  },
  NOT_ACCESSIBLE_WITH_PATH: {
    gid: 'gid://platform/Talent/1513001',
    associationReferences: [],
    designation: 'developer',
    reference: {
      text: 'Piotr Imb',
      accessible: false,
      options: [],
      path: '/platform/staff/talents/1513001'
    }
  },
  ACCESSIBLE_WITHOUT_PATH: {
    gid: 'gid://platform/Talent/1513001',
    associationReferences: [],
    designation: 'developer',
    reference: {
      text: 'Piotr Imb',
      accessible: true,
      options: []
    }
  }
}
