import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getVerticalResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Vertical'),
      skillCategories: {
        nodes: [
          {
            id: encodeEntityId('123', 'SkillCategory'),
            description: 'e.g., Python, PHP, Java, C#, JavaScript, SQL',
            position: 6,
            title: 'Languages',
            __typename: 'SkillCategory'
          }
        ],
        __typename: 'SkillCategoryConnection'
      },
      defaultSkillCategory: {
        id: encodeEntityId('123', 'SkillCategory'),
        description: 'e.g., Python, PHP, Java, C#, JavaScript, SQL',
        position: 6,
        title: 'Languages',
        __typename: 'SkillCategory'
      },
      __typename: 'Vertical'
    }
  }
})
