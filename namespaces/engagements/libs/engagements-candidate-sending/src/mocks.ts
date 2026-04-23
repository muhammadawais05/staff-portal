import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'

import { EngagementPitchSnippetFragment } from './data/engagement-pitch-snippet-fragment/engagement-pitch-snippet-fragment.staff.gql.types'

export const createEngagementPitchSnippet = (
  pitchSnippetEngagement: Partial<EngagementPitchSnippetFragment> = {}
): EngagementPitchSnippetFragment => ({
  id: pitchSnippetEngagement?.id || '123',
  talentHourlyRate: '50',
  talent: {
    id: 'talent-id',
    allocatedHours: 20,
    allocatedHoursAvailability: TalentAllocatedHoursAvailability.FULL_TIME,
    allocatedHoursConfirmedAt: '2021-09-05T00:22:07+03:00',
    availableHours: 5,
    fullName: 'Domenic Koss',
    hourlyRate: '65.00',
    locationV2: {
      country: {
        id: '1',
        name: 'Country Name'
      },
      cityName: 'City Name',
      stateName: 'State Name'
    },
    resumeUrl: 'https//example.com',
    type: 'type',
    roleTitle: 'Type',
    webResource: {
      url: 'https//talent-internal-page.com'
    }
  },
  ...pitchSnippetEngagement
})
