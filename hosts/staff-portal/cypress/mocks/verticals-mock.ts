import { Vertical } from '@staff-portal/graphql/staff'

const verticalsMock = () => ({
  nodes: [
    {
      id: 'VjEtVmVydGljYWwtMTAxMA',
      talentType: 'top_screen',
      name: 'TopScreen',
      hasTalentQuizQuestions: false,
      specializations: {
        nodes: [],
        totalCount: 1
      },
      __typename: 'Vertical'
    },
    {
      id: 'VjEtVmVydGljYWwtMw',
      talentType: 'finance_expert',
      name: 'Finance Expert',
      hasTalentQuizQuestions: true,
      specializations: {
        nodes: [],
        totalCount: 2
      },
      __typename: 'Vertical'
    },
    {
      id: 'VjEtVmVydGljYWwtMQ',
      talentType: 'developer',
      name: 'Developer',
      hasTalentQuizQuestions: true,
      specializations: {
        nodes: [],
        totalCount: 14
      },
      __typename: 'Vertical'
    },
    {
      id: 'VjEtVmVydGljYWwtOQ',
      talentType: 'product_manager',
      name: 'Product Manager',
      hasTalentQuizQuestions: true,
      specializations: {
        nodes: [],
        totalCount: 2
      },
      __typename: 'Vertical'
    },
    {
      id: 'VjEtVmVydGljYWwtMg',
      talentType: 'designer',
      name: 'Designer',
      hasTalentQuizQuestions: true,
      specializations: {
        nodes: [],
        totalCount: 1
      },
      __typename: 'Vertical'
    },
    {
      id: 'VjEtVmVydGljYWwtOA',
      talentType: 'project_manager',
      name: 'Project Manager',
      hasTalentQuizQuestions: true,
      specializations: {
        nodes: [],
        totalCount: 6
      },
      __typename: 'Vertical'
    }
  ] as unknown as Vertical[]
})

export default verticalsMock
