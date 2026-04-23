import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'

export const quizMock = {
  id: 'VjEtQ2xpZW50LTUxODk2OA',
  cumulativeStatus: ClientCumulativeStatus.ACTIVE,
  remoteQuizUrl:
    'https://www.readinesschecker.com/remote/questionnaire/fkjapqrgRkCKmHIM/report?extended_for_staff=1',
  quizItems: {
    nodes: [
      {
        questionLabel: 'How many product managers do you need?',
        readableValue: ['One product manager'],
        __typename: 'QuizItem'
      },
      {
        questionLabel:
          'Which specific skills do you need your Toptal product manager to have?',
        readableValue: ['B2B, Market Research'],
        __typename: 'QuizItem'
      },
      {
        questionLabel: 'How soon do you need the product manager?',
        readableValue: ['Immediately'],
        __typename: 'QuizItem'
      },
      {
        questionLabel: 'What role would you like to hire?',
        readableValue: ['Product Managers'],
        __typename: 'QuizItem'
      },
      {
        questionLabel:
          'Is the product manager for an existing project or a new one?',
        readableValue: ['Existing project that needs more resources'],
        __typename: 'QuizItem'
      },
      {
        questionLabel: 'How long do you need the product manager?',
        readableValue: ['3 to 6 months'],
        __typename: 'QuizItem'
      },
      {
        questionLabel:
          'What level of time commitment will you require from the product manager?',
        readableValue: ['Hourly'],
        __typename: 'QuizItem'
      },
      {
        questionLabel: 'How many people are employed at your company?',
        readableValue: ['51 - 200'],
        __typename: 'QuizItem'
      },
      {
        questionLabel:
          'Are you open to working with a remote product manager if we find a perfect match?',
        readableValue: ['Yes'],
        __typename: 'QuizItem'
      },
      {
        questionLabel:
          "Toptal is a global network of elite freelance talent with hourly rates ranging from $60 - $210 USD. Does your budget align with Toptal's hourly rates?",
        readableValue: ['Yes'],
        __typename: 'QuizItem'
      },
      {
        questionLabel: "Success! Let's connect you with talent.",
        readableValue: ['manuel@meru.com, Meru, Manuel Rodriguez'],
        __typename: 'QuizItem'
      }
    ],
    __typename: 'QuizItemConnection'
  },
  referralPage: {
    text: 'Qing (Joanna) Xia',
    url: 'https://www.toptal.com/product-managers/resume/qing-xia',
    __typename: 'Link'
  },
  __typename: 'Client'
}
