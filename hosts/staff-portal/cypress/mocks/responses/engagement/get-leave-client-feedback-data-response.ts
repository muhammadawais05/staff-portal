import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getLeaveClientFeedbackDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Feedback'),
      clientUrl: 'https://staging.toptal.net/',
      clientQuestions: {
        edges: [
          {
            text: 'How likely is that the client would hire the designer again, if they had similar project?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi0x',
              identifier: 'hire_again',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0xMQ',
                    tooltip: 'Extremely likely',
                    value: '10',
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
            text: 'Did the designer adhere to client timelines?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi0y',
              identifier: 'schedule_adherence',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0xMg',
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
            text: 'Is the client happy with the communication style of the designer?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi0z',
              identifier: 'communication',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0xNA',
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
            text: 'Is the client satisfied with the quality of the work delivered?',
            node: {
              id: 'VjEtRmVlZGJhY2tRdWVzdGlvbi00',
              identifier: 'quality_of_work',
              options: {
                nodes: [
                  {
                    id: 'VjEtRmVlZGJhY2tRdWVzdGlvbk9wdGlvbi0xNg',
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
