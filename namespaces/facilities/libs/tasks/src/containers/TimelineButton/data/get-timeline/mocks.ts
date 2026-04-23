const email = 'tyler.durden@gmail.com'

export const historyActionId = '11'
export const noteId = '12'
export const communicationId = '13'

export const staffEntity = {
  id: '1209642',
  type: 'Staff'
}

export const notableData = {
  email,
  notes: {
    nodes: [
      {
        id: noteId,
        createdAt: '2019-09-17T12:44:00Z',
        updatedAt: '2019-09-17T12:44:00Z',
        title: 'note title'
      }
    ]
  },
  webResource: { text: 'test' },
  __typename: 'Test'
}

export const performedActionsData = [
  {
    performedAction: {
      id: historyActionId,
      occurredAt: '2019-09-17T12:44:00Z',
      action: 'action',
      subjectGID: 'subject-id',
      subjectName: null,
      performerGID: null,
      payload: '{}',
      template: '',
      comment: null
    },
    literals: []
  }
]

export const communicationData = {
  emailMessages: {
    entities: [
      {
        __typename: 'EmailMessage',
        id: communicationId,
        categories: [],
        subject: 'email subject',
        sentAt: '2019-09-17T12:44:00Z',
        from: {
          __typename: 'EmailAddress',
          email,
          blacklisted: false
        },
        to: [
          {
            __typename: 'EmailAddress',
            email,
            blacklisted: false
          }
        ]
      }
    ]
  }
}

export const usersByEmailsData = [
  {
    fullName: 'Tyler Durden',
    email,
    id: '11',
    webResource: {
      url: 'example.com'
    }
  }
]
