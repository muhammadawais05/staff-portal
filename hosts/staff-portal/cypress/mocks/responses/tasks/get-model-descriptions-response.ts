import { modelDescriptionMock } from '~integration/mocks'

export const getModelDescriptionsResponse = () => ({
  data: {
    modelDescriptions: [
      modelDescriptionMock({ gid: 'gid://platform/Client/513942' }),
      modelDescriptionMock({ gid: 'gid://platform/Staff/1830104' }),
      modelDescriptionMock({ gid: 'gid://platform/Staff/2830248' }),
      modelDescriptionMock({ gid: 'gid://platform/Staff/2973717' })
    ]
  }
})
