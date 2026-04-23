import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Link, Talent } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'

export const getTalentMock = (
  talent?: Partial<Talent> | null
): Partial<WithTypename<Talent>> => ({
  __typename: 'Talent',
  id: encodeEntityId('123', 'Talent'),
  type: 'Developer',
  talentType: 'Developer',
  fullName: 'Talent Name',
  talentPartner: null,
  commissions: null,
  referrer: null,
  photo: null,
  profileLink: null,
  timeZone: null,
  email: 'talent-email@toptal.com',
  skype: null,
  additionalSkypeIds: null,
  resumeUrl: '',
  ...talent,
  contacts: {
    totalCount: 0,
    nodes: [],
    ...talent?.contacts
  },
  webResource: {
    text: 'Talent Name',
    url: 'https://staging.toptal.net/platform/staff/talents/123',
    __typename: 'Link',
    ...talent?.webResource
  } as Link
})
