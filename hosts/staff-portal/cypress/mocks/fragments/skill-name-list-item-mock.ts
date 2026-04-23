import { SkillName } from '@staff-portal/graphql/staff'

import {
  skillNameListItemOperationsMock,
  skillNameListItemSkillMock
} from '~integration/mocks/fragments'

export const skillNameListItemMock = (node?: {}) =>
  ({
    id: 'VjEtU2tpbGxOYW1lLTI4OTI4',
    name: '.NET Security Model',
    editorChecked: true,
    verticalChecked: true,
    skillPageSlug: 'dot-net',
    operations: skillNameListItemOperationsMock(),
    skills: [skillNameListItemSkillMock()],
    ...node
  } as unknown as SkillName)
