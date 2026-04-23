export const getAllEmailMessagesResponse = () => ({
  payload: {
    data: {
      emailMessages: {
        __typename: 'EmailMessageList',
        entities: [
          {
            __typename: 'EmailMessage',
            body: 'This part was obfuscated, some content was here.',
            from: {
              __typename: 'EmailAddress',
              email: 'vino-cda0a646c026dc62@toptal.io'
            },
            id: '30989303',
            sentAt: '2022-01-12T11:02:42.000000+03:00',
            subject: 'Please schedule an interview with Mohamed Khaled',
            to: [
              {
                __typename: 'EmailAddress',
                email: 'sama-a3b707ab23d8516b@toptal.io'
              }
            ]
          }
        ],
        maxCount: 10000,
        totalCount: 1
      }
    }
  },
  operationName: 'GetAllEmailMessages'
})
