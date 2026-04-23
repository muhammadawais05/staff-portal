import { ProfileEducation } from '../../types'

const getProfileEducationMock = (
  profileEducation: Partial<ProfileEducation> = {}
) => ({
  id: profileEducation.title ?? 'education-1',
  title: 'Warsaw Technical University',
  fieldOfStudy: 'Engineering',
  degree: "Master's Degree",
  yearFrom: 2020,
  yearTo: 2022,
  location: 'USA, New York',
  ...profileEducation
})

export default getProfileEducationMock
