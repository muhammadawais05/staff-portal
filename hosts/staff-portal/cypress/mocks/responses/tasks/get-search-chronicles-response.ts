export const getSearchChroniclesResponse = () => ({
  data: {
    viewer: {
      search: {
        nextPage: null,
        entries: [
          {
            id: '0005d230-9842-51d7-0000-0000051e3ad1',
            occurredAt: '2021-12-03T00:37:18+03:00',
            action: 'changed_claimer',
            subjectGID: 'gid://platform/Client/513942',
            subjectName: null,
            performerGID: 'gid://platform/Staff/2973717',
            comment: 'This part was obfuscated, some content was here.',
            payload:
              '{"claimer":{"to":{"gid":"gid://platform/Staff/2830248"},"from":{"gid":"gid://platform/Staff/1830104"},"$type":"change"}}',
            template:
              '%{performer} assigned %{payload.claimer.to} as %{subject.designation} %{subject} claimer',
            __typename: 'Entry'
          },
          {
            id: '0005d230-9840-51e6-0000-0000051e3ad3',
            occurredAt: '2021-12-03T00:37:18+03:00',
            action: 'changed_account_owner',
            subjectGID: 'gid://platform/Client/513942',
            subjectName: null,
            performerGID: 'gid://platform/Staff/2973717',
            comment: null,
            payload:
              '{"account_owner":{"to":{"gid":"gid://platform/Staff/2830248"},"from":null,"$type":"change"}}',
            template:
              '%{performer} assigned %{payload.account_owner.to} as a Account Owner for the %{subject.designation} %{subject}',
            __typename: 'Entry'
          }
        ],
        __typename: 'EntryList'
      },
      __typename: 'Viewer'
    }
  }
})
