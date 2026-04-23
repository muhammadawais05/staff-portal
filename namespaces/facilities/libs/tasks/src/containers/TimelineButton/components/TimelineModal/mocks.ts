export const GET_TIMELINE_RESPONSE = {
  timeline: {
    notes: [
      {
        type: 0,
        id: '12',
        date: '2019-09-17T12:44:00Z',
        entity: {
          id: '12',
          createdAt: '2019-09-17T12:44:00Z',
          updatedAt: '2019-09-17T12:44:00Z',
          title: 'note title'
        }
      }
    ],
    actions: [
      {
        type: 1,
        id: '11',
        date: '2019-09-17T12:44:00Z',
        entity: {
          performedAction: {
            id: '11',
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
      }
    ],
    communications: [
      {
        type: 2,
        id: '13',
        date: '2019-09-17T12:44:00Z',
        entity: {
          __typename: 'EmailMessage',
          id: '13',
          categories: [],
          subject: 'email subject',
          sentAt: '2019-09-17T12:44:00Z',
          from: {
            __typename: 'EmailAddress',
            email: 'tyler.durden@gmail.com',
            blacklisted: false
          },
          to: [
            {
              __typename: 'EmailAddress',
              email: 'tyler.durden@gmail.com',
              blacklisted: false
            }
          ],
          fromUser: {
            fullName: 'Tyler Durden',
            email: 'tyler.durden@gmail.com',
            id: '11',
            webResource: {
              url: 'example.com'
            }
          },
          toUsers: [
            {
              fullName: 'Tyler Durden',
              email: 'tyler.durden@gmail.com',
              id: '11',
              webResource: {
                url: 'example.com'
              }
            }
          ]
        }
      }
    ]
  },
  nodeTitle: undefined,
  nodeType: undefined
}
