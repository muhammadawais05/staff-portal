import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getLeaveMatcherFeedbackDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Feedback'),
      matcherQuestions: {
        edges: [
          {
            text: 'Would you match this client with this developer again?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi01',
              identifier: 'match_again',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0xOA',
                    tooltip: null,
                    value: 'Yes',
                    __typename: 'FeedbackQuestionOption'
                  }
                ],
                __typename: 'FeedbackQuestionOptionConnection'
              },
              __typename: 'FeedbackQuestion'
            },
            __typename: 'FeedbackQuestionEdge'
          },
          {
            text: 'Why not?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi02',
              identifier: 'why',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0yMA',
                    tooltip: null,
                    value: 'Talent was the main problem',
                    __typename: 'FeedbackQuestionOption'
                  }
                ],
                __typename: 'FeedbackQuestionOptionConnection'
              },
              __typename: 'FeedbackQuestion'
            },
            __typename: 'FeedbackQuestionEdge'
          },
          {
            text: 'Did the developer produce good work here?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi03',
              identifier: 'talent_work',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0yMw',
                    tooltip: null,
                    value: 'Yes',
                    __typename: 'FeedbackQuestionOption'
                  }
                ],
                __typename: 'FeedbackQuestionOptionConnection'
              },
              __typename: 'FeedbackQuestion'
            },
            __typename: 'FeedbackQuestionEdge'
          },
          {
            text: 'Did the client provide good work direction here?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi04',
              identifier: 'client_work',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0yNQ',
                    tooltip: null,
                    value: 'Yes',
                    __typename: 'FeedbackQuestionOption'
                  }
                ],
                __typename: 'FeedbackQuestionOptionConnection'
              },
              __typename: 'FeedbackQuestion'
            },
            __typename: 'FeedbackQuestionEdge'
          }
        ],
        __typename: 'FeedbackQuestionEdgedConnection'
      },
      __typename: 'Feedback'
    }
  }
})
