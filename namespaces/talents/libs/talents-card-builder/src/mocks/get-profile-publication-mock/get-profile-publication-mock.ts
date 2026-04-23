import { ProfilePublication } from '../../types'

const getProfilePublicationMock = (
  profilePublication: Partial<ProfilePublication> = {}
) => ({
  id: profilePublication.title ?? 'publication-1',
  title: 'Publication',
  url: '',
  excerpt: '',
  ...profilePublication
})

export default getProfilePublicationMock
