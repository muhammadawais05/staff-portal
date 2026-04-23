import { encodeEntityId } from '@staff-portal/data-layer-service'

export const createVerticalsMock = () => [
  {
    id: encodeEntityId('1000', 'Test'),
    talentType: 'designer',
    name: 'Designer',
    hasTalentQuizQuestions: true,
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('2000', 'Test'),
    talentType: 'developer',
    name: 'Developer',
    hasTalentQuizQuestions: true,
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('3000', 'Test'),
    talentType: 'finance_expert',
    name: 'Finance Expert',
    hasTalentQuizQuestions: true,
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('4000', 'Test'),
    talentType: 'product_manager',
    name: 'Product Manager',
    hasTalentQuizQuestions: true,
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('5000', 'Test'),
    talentType: 'project_manager',
    name: 'Project Manager',
    hasTalentQuizQuestions: true,
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('6000', 'Test'),
    talentType: 'top_screen',
    name: 'TopScreen',
    hasTalentQuizQuestions: false,
    __typename: 'Vertical'
  }
]
