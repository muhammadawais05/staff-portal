export default {
  __typename: 'Note',
  answers: { __typename: 'NoteAnswerConnection', nodes: [] },
  attachment: {
    __typename: 'NoteAttachment',
    identifier: 'example text document',
    url: 'example.com/index.tsx',
    webResource: {
      text: 'example text document',
      url: 'example.com/index.tsx',
      __typename: 'Link'
    }
  },
  comment: 'Awesome comment',
  createdAt: '2020-04-21T05:47:01-04:00',
  creator: {
    __typename: 'Staff',
    fullName: 'Thad Walter',
    id: 'VjEtU3RhZmYtMTMxMTU2Nw',
    webResource: {
      text: 'Thad Walter',
      url: 'https://staging.toptal.net/platform/staff/staff/1649121',
      __typename: 'Link'
    }
  },
  id: 'VjEtTm90ZS0xMDUzODU0',
  newSalesCall: false,
  checklistSalesCall: false,
  operations: {
    __typename: 'NoteOperations',
    removeNote: { __typename: 'Operation', callable: 'ENABLED', messages: [] },
    removeNoteAttachment: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    updateNote: { __typename: 'Operation', callable: 'ENABLED', messages: [] }
  },
  screeningCall: false,
  title: 'Awesome title',
  updatedAt: '2020-04-21T05:47:01-04:00'
}
