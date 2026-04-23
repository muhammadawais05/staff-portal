import { Vertical } from '@staff-portal/graphql/staff'

const verticalsWithSkillCategoriesMock = () =>
  [
    {
      id: 'VjEtVmVydGljYWwtMTAxMA',
      talentType: 'top_screen',
      name: 'TopScreen',
      skillCategories: {
        nodes: [],
        totalCount: 1
      }
    },
    {
      id: 'VjEtVmVydGljYWwtMw',
      talentType: 'finance_expert',
      name: 'Finance Expert',
      skillCategories: {
        nodes: [],
        totalCount: 1
      }
    },
    {
      id: 'VjEtVmVydGljYWwtMQ',
      talentType: 'developer',
      name: 'Developer',
      skillCategories: {
        nodes: [],
        totalCount: 1
      }
    },
    {
      id: 'VjEtVmVydGljYWwtOQ',
      talentType: 'product_manager',
      name: 'Product Manager',
      skillCategories: {
        nodes: [],
        totalCount: 1
      }
    },
    {
      id: 'VjEtVmVydGljYWwtMg',
      talentType: 'designer',
      name: 'Designer',
      skillCategories: {
        nodes: [],
        totalCount: 1
      }
    },
    {
      id: 'VjEtVmVydGljYWwtOA',
      talentType: 'project_manager',
      name: 'Project Manager',
      skillCategories: {
        nodes: [],
        totalCount: 1
      }
    }
  ] as unknown as Vertical[]

export default verticalsWithSkillCategoriesMock
