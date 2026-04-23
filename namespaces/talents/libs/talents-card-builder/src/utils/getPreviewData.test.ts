import { emptyFormState } from '../utils/emptyFormState'
import { getPreviewData } from './getPreviewData'
import getProfileSkillMock from '../mocks/get-profile-skill-mock/get-profile-skill-mock'
import getProfileCertificationMock from '../mocks/get-profile-certification-mock/get-profile-certification-mock'
import getProfileContentMock from '../mocks/get-profile-content-mock/get-profile-content-mock'
import getProfileEmploymentMock from '../mocks/get-profile-employment-mock/get-profile-employment-mock'
import getProfileExperienceMock from '../mocks/get-profile-experience-mock/get-profile-experience-mock'
import getProfilePortfolioItemMock from '../mocks/get-profile-portfolio-item-mock/get-profile-portfolio-item-mock'
import getProfilePublicationMock from '../mocks/get-profile-publication-mock/get-profile-publication-mock'
import { ProfileExperience } from '../types'

describe('getPreviewData', () => {
  it('processes skills', () => {
    const skill1 = getProfileSkillMock({ id: 'skill-1' })
    const skill2 = getProfileSkillMock({ id: 'skill-2' })

    const values = getPreviewData({
      content: getProfileContentMock({
        skills: [skill1, skill2]
      }),
      state: {
        ...emptyFormState,
        highlights: {
          ...emptyFormState.highlights,
          skills: ['skill-1']
        }
      }
    })

    expect(values).toHaveProperty('skills', [skill1])
  })

  it('processes experience -> mentorship', () => {
    const mentorshipItem = { id: 'item-1', type: 'mentorship' }

    const values = getPreviewData({
      content: getProfileContentMock({
        experience: [mentorshipItem as unknown as ProfileExperience]
      }),
      state: {
        ...emptyFormState,
        highlights: {
          ...emptyFormState.highlights,
          items: [{ type: 'mentorship', id: 'item-1' }]
        }
      }
    })

    expect(values).toHaveProperty('highlights', [
      { id: 'item-1', type: 'mentorship' }
    ])
  })

  it('processes experience -> portfolio', () => {
    const item1 = getProfileExperienceMock({ id: 'item-1' })
    const item2 = getProfileExperienceMock({ id: 'item-2' })

    const values = getPreviewData({
      content: getProfileContentMock({
        experience: [item1, item2]
      }),
      state: {
        ...emptyFormState,
        highlights: {
          ...emptyFormState.highlights,
          items: [{ type: 'portfolio', id: 'item-1' }]
        }
      }
    })

    expect(values).toHaveProperty('highlights', [
      { ...item1, type: 'portfolio' }
    ])
  })

  it('processes experience -> publication', () => {
    const item1 = getProfilePublicationMock({ id: 'item-1' })
    const item2 = getProfilePublicationMock({ id: 'item-2' })

    const values = getPreviewData({
      content: getProfileContentMock({
        publications: [item1, item2]
      }),
      state: {
        ...emptyFormState,
        highlights: {
          ...emptyFormState.highlights,
          items: [{ type: 'publication', id: 'item-1' }]
        }
      }
    })

    expect(values).toHaveProperty('highlights', [
      { ...item1, type: 'publication' }
    ])
  })

  it('processes portfolio', () => {
    const item1 = getProfilePortfolioItemMock({ id: 'item-1' })
    const item2 = getProfilePortfolioItemMock({ id: 'item-2' })

    const values = getPreviewData({
      content: getProfileContentMock({
        portfolio: [item1, item2]
      }),
      state: {
        ...emptyFormState,
        highlights: {
          ...emptyFormState.highlights,
          portfolio: ['item-1']
        }
      }
    })

    expect(values).toHaveProperty('portfolio', [item1])
  })

  it('processes certifications', () => {
    const cert1 = getProfileCertificationMock({ id: 'cert-1' })
    const cert2 = getProfileCertificationMock({ id: 'cert-2' })

    const values = getPreviewData({
      content: getProfileContentMock({
        certifications: [cert1, cert2]
      }),
      state: {
        ...emptyFormState,
        highlights: {
          ...emptyFormState.highlights,
          items: [{ type: 'certification', id: 'cert-1' }]
        }
      }
    })

    expect(values).toHaveProperty('highlights', [cert1])
  })

  it('processes employments', () => {
    const item1 = getProfileEmploymentMock({
      id: 'item-1',
      experienceItems: ['1', '2', '3']
    })
    const item2 = getProfileEmploymentMock({
      id: 'item-2',
      experienceItems: ['4', '5', '6']
    })

    const values = getPreviewData({
      content: getProfileContentMock({
        employments: [item1, item2]
      }),
      state: {
        ...emptyFormState,
        highlights: {
          ...emptyFormState.highlights,
          items: [
            { type: 'employment', id: 'item-1', description_items: ['1', '3'] }
          ]
        }
      }
    })

    expect(values).toHaveProperty('highlights', [
      { ...item1, experienceItems: ['1', '3'] }
    ])
  })

  describe('industries', () => {
    it('process industries', () => {
      const industry1 = { id: 'industry-1', name: 'industry 1' }
      const industry2 = { id: 'industry-2', name: 'industry 2' }

      const values = getPreviewData({
        content: getProfileContentMock({
          industries: [{ industry: industry1 }, { industry: industry2 }]
        }),
        state: {
          ...emptyFormState,
          highlights: {
            ...emptyFormState.highlights,
            industries: ['industry-1']
          }
        }
      })

      expect(values).toHaveProperty('industries', [{ industry: industry1 }])
    })
  })
})
