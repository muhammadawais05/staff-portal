import { getWorkExperienceLabel } from '../get-work-experience-label'

describe('getWorkExperienceLabel', () => {
  it('returns Portfolio for designer or finance expert', () => {
    expect(getWorkExperienceLabel('Designer')).toBe('Portfolio')
    expect(getWorkExperienceLabel('FinanceExpert')).toBe('Portfolio')
  })

  it('returns Projects for not designer or finance expert', () => {
    expect(getWorkExperienceLabel('Developer')).toBe('Projects')
  })
})
