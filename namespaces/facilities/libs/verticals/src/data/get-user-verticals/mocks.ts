import { encodeEntityId } from '@staff-portal/data-layer-service'

export const createUserVerticalsMock = () => [
  {
    id: encodeEntityId('1000', 'Test'),
    talentType: 'designer',
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('2000', 'Test'),
    talentType: 'developer',
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('3000', 'Test'),
    talentType: 'finance_expert',
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('4000', 'Test'),
    talentType: 'product_manager',
    __typename: 'Vertical'
  },
  {
    id: encodeEntityId('5000', 'Test'),
    talentType: 'project_manager',
    __typename: 'Vertical'
  }
]
