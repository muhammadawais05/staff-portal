import {
  clientIndustriesMock,
  clientRevenueRangesMock,
  clientBusinessModelsMocks,
  clientStagesMocks,
  staffNodeMock,
  clientWebNSocialMock
} from '~integration/mocks/fragments'

export const webNSocialTabMocks = () => ({
  Query: {
    staffNode: staffNodeMock,
    node: clientWebNSocialMock,
    clientIndustries: () => clientIndustriesMock,
    clientRevenueRanges: () => clientRevenueRangesMock,
    clientBusinessModels: () => clientBusinessModelsMocks,
    clientStages: () => clientStagesMocks
  }
})
