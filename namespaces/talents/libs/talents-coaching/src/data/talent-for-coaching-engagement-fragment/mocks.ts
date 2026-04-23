import { TalentForCoachingEngagementFragment } from './talent-fragment.staff.gql.types'

export const createTalentForCoachingEngagementFragmentMock = (
  fields?: Partial<TalentForCoachingEngagementFragment>
) =>
  ({
    id: 'VjEtVGFsZW50LTE4MzAxNDI',
    fullName: 'Domenic Koss',
    activatedAt: '2021-03-20T09:00:32+03:00',
    hourlyRate: '75.0',
    photo: null,
    engagements: {
      counters: {
        workingNumber: 0,
        __typename: 'TalentEngagementsCounters'
      },
      __typename: 'TalentEngagementConnection'
    },
    webResource: {
      text: 'Domenic Koss',
      url: 'https://staging.toptal.net/platform/staff/talents/1830142',
      __typename: 'Link'
    },
    timeZone: {
      name: '(UTC-11:00) Pacific - Pago Pago',
      __typename: 'TimeZone'
    },
    locationV2: {
      countryName: 'USA',
      __typename: 'Location'
    },
    talentType: 'Developer',
    talentPartner: {
      id: '123',
      webResource: {
        text: 'Tom Doe',
        url: 'https://partner-url.net/1',
        __typename: 'Link'
      },
      __typename: 'TalentPartner'
    },
    __typename: 'Talent',
    ...fields
  } as const)
