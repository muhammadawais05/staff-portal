import { ProfileExperience } from '../../types'

const getProfileExperienceMock = (
  profileExperience: Partial<ProfileExperience> = {}
) => ({
  id: profileExperience.title ?? 'experience-1',
  title: 'Experience',
  ...profileExperience
})

export default getProfileExperienceMock
