import { CommunityEventFragment } from '../../../../data/community-event-fragment'

export const createCommunityEventMock = (
  communityEvent?: Partial<CommunityEventFragment>
): CommunityEventFragment => ({
  id: 'id-1',
  description: 'Event Description',
  endDate: '2028-11-02',
  location: {
    cityName: 'City Name',
    countryName: 'Country Name',
    stateName: 'State Name'
  },
  name: 'Event Name',
  shortName: 'Event Short Name',
  startDate: '2028-11-03',
  typeformUrl: 'https://www.toptal.com',
  webResource: {
    url: undefined,
    text: 'Event Name'
  },
  ...communityEvent
})
