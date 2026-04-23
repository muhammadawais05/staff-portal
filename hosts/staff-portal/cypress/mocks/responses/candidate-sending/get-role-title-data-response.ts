import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getBaseRoleTitleDataResponse } from '~integration/mocks/responses'

export const getRoleTitleDataResponse = () => ({
  data: {
    ...getBaseRoleTitleDataResponse().data,
    job: {
      id: encodeEntityId('123', 'Job'),
      jobType: 'developer',
      specialization: {
        id: encodeEntityId('123', 'Specialization'),
        title: 'Core',
        __typename: 'Specialization'
      },
      __typename: 'Job'
    },
    talent: {
      id: encodeEntityId('123', 'Talent'),
      type: 'Developer',
      __typename: 'Talent'
    }
  }
})
