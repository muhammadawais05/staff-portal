import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getQuestionAndAnswersResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      remoteQuizUrl: null,
      referralPage: {
        text: 'Angular Developer',
        url: 'https://some.url',
        __typename: 'Link'
      },
      quizItems: {
        nodes: [
          {
            readableValue: ['Angular, CSS, HTML5, Node.js'],
            questionLabel:
              'What skills would you like to see in your new hire?',
            __typename: 'QuizItem'
          }
        ],
        __typename: 'QuizItemConnection'
      },
      __typename: 'Client'
    }
  }
})
