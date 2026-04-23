import { encodeEntityId } from '@staff-portal/data-layer-service'

export const modelDescriptionMock = (node = {}) => ({
  id: encodeEntityId('123', 'ModelDescription'),
  gid: 'gid://platform/Client/513942',
  associationReferences: [],
  designation: 'company',
  reference: {
    text: 'Stracke, Walsh and McGlynn',
    accessible: true,
    options: [],
    path: '/platform/staff/companies/2438257',
    __typename: 'ModelDescriptionLink'
  },
  __typename: 'ModelDescription',
  ...node
})
