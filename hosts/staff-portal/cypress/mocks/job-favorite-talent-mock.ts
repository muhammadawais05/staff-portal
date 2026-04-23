import { Talent } from '@staff-portal/graphql/staff'

const jobFavoriteTalentMock = (talent?: Partial<Talent>) => ({
  id: 'VjEtVGFsZW50LTMwNDcxOTI',
  fullName: 'Cristi Pagac',
  ...talent,
  webResource: {
    text: 'Cristi Pagac',
    url: 'https://demo-url.com',
    ...talent?.webResource,
    __typename: 'Link'
  },
  __typename: 'Talent'
})

export default jobFavoriteTalentMock
