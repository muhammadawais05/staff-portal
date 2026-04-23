import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getBaseRoleTitleDataResponse = () => ({
  data: {
    verticals: {
      nodes: [
        {
          id: encodeEntityId('123', 'Vertical'),
          talentType: 'Developer',
          specializations: {
            totalCount: 1,
            __typename: 'VerticalSpecializationConnection'
          },
          __typename: 'Vertical'
        }
      ],
      totalCount: 1,
      __typename: 'VerticalConnection'
    },
    talent: null,
    job: null
  }
})
