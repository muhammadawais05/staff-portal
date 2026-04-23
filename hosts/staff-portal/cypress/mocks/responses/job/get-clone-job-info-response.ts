import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getCloneJobInfoResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      workType: 'REMOTE',
      skillLongShot: false,
      startDate: '2021-09-06',
      toptalProjects: false,
      longshotReasons: [],
      specialization: {
        id: encodeEntityId('123', 'Specialization'),
        __typename: 'Specialization'
      },
      location: null,
      availableSpecializations: {
        nodes: [
          {
            id: encodeEntityId('123', 'Specialization'),
            title: 'Artificial Intelligence',
            __typename: 'Specialization'
          }
        ],
        __typename: 'SpecializationConnection'
      },
      __typename: 'Job'
    },
    jobLongshotReasons: ['This skill has a limited supply of market/worldwide']
  }
})
