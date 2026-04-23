import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getPitchSnippetEngagementsResponse = () => ({
  data: {
    nodes: [
      {
        id: encodeEntityId('123', 'Engagement'),
        talent: {
          id: encodeEntityId('123', 'Talent'),
          allocatedHoursAvailability:
            TalentAllocatedHoursAvailability.FULL_TIME,
          associatedRoles: {
            nodes: []
          },
          availableHours: 5,
          allocatedHours: null,
          allocatedHoursConfirmedAt: '2021-10-17T09:55:03+03:00',
          fullName: 'Some Full Name',
          hourlyRate: '50.0',
          locationV2: null,
          resumeUrl: 'https://example.com/resume',
          type: 'Developer',
          roleTitle: 'Developer',
          __typename: 'Talent'
        },
        resumeUrl: null,
        __typename: 'Engagement'
      }
    ]
  }
})
