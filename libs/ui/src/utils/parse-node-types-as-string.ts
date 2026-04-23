import { titleize } from '@staff-portal/string'

export const parseNodeTypesAsString = (nodeTypes: string[]) =>
  nodeTypes
    .map(nodeType => {
      if (nodeType === 'skill_name') {
        return 'Skill'
      }

      if (nodeType.includes('/')) {
        return titleize(nodeType, { splitter: '/' })
      }

      return titleize(nodeType)
    })
    .join(', ')
