import { ProfileEmployment } from '../../types'

const getProfileEmploymentMock = (
  profileEmployment: Partial<ProfileEmployment> = {}
) => ({
  id: profileEmployment.position ?? 'employment-1',
  position: 'position',
  experienceItems: [],
  startDate: 2020,
  company: 'company',
  type: 'employment',
  ...profileEmployment
})

export default getProfileEmploymentMock
