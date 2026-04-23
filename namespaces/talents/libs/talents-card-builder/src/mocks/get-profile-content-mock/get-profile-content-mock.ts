import { ProfileContent } from '../../types'

const getProfileContentMock = (
  profileContent: Partial<ProfileContent> = {}
) => ({
  skills: [],
  industries: [],
  certifications: [],
  educations: [],
  employments: [],
  experience: [],
  portfolio: [],
  publications: [],
  mentorship: false,
  ...profileContent
})

export default getProfileContentMock
