import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

export const skillNameListItemOperationsMock = (node?: {}) => ({
  cloneSkillName:  hiddenOperationMock,
  removeSkillName: hiddenOperationMock,
  toggleCheckSkillName: hiddenOperationMock,
  updateSkillName: hiddenOperationMock,
  ...node
})
