import getProfileContentMock from '../mocks/get-profile-content-mock/get-profile-content-mock'
import getProfileExperienceMock from '../mocks/get-profile-experience-mock/get-profile-experience-mock'
import getProfilePublicationMock from '../mocks/get-profile-publication-mock/get-profile-publication-mock'
import { ProfileExperience } from '../types'
import { getPreviewExperienceData } from './get-preview-experience-data'

describe('getPreviewExperienceData', () => {
  it('processes experience -> mentorship', () => {
    const mentorshipItem = { id: 'item-1', type: 'mentorship' }

    const { experience, publications } = getProfileContentMock({
      experience: [mentorshipItem as unknown as ProfileExperience]
    })

    const values = getPreviewExperienceData({
      contentExperience: experience,
      contentPublications: publications,
      stateExperience: [{ type: 'mentorship', id: 'item-1' }]
    })

    expect(values).toStrictEqual([{ id: 'item-1', type: 'mentorship' }])
  })

  it('processes experience -> portfolio', () => {
    const item1 = getProfileExperienceMock({ id: 'item-1' })
    const item2 = getProfileExperienceMock({ id: 'item-2' })

    const { experience, publications } = getProfileContentMock({
      experience: [item1, item2]
    })

    const values = getPreviewExperienceData({
      contentExperience: experience,
      contentPublications: publications,
      stateExperience: [{ type: 'portfolio', id: 'item-1' }]
    })

    expect(values).toStrictEqual([{ ...item1, type: 'portfolio' }])
  })

  it('processes experience -> publication', () => {
    const item1 = getProfilePublicationMock({ id: 'item-1' })
    const item2 = getProfilePublicationMock({ id: 'item-2' })

    const { experience, publications } = getProfileContentMock({
      publications: [item1, item2]
    })

    const values = getPreviewExperienceData({
      contentExperience: experience,
      contentPublications: publications,
      stateExperience: [{ type: 'publication', id: 'item-1' }]
    })

    expect(values).toStrictEqual([{ ...item1, type: 'publication' }])
  })

  it('processes all experience types', () => {
    const mentorshipItem = { id: 'item-1', type: 'mentorship' }
    const publication1 = getProfilePublicationMock({ id: 'publication-1' })
    const publication2 = getProfilePublicationMock({ id: 'publication-2' })
    const portfolio1 = getProfileExperienceMock({ id: 'portfolio-1' })
    const portfolio2 = getProfileExperienceMock({ id: 'portfolio-2' })

    const { experience, publications } = getProfileContentMock({
      publications: [publication2, publication1],
      experience: [
        portfolio1,
        mentorshipItem as unknown as ProfileExperience,
        portfolio2
      ]
    })

    const values = getPreviewExperienceData({
      contentExperience: experience,
      contentPublications: publications,
      stateExperience: [
        { type: 'publication', id: 'publication-1' },
        { type: 'portfolio', id: 'portfolio-2' }
      ]
    })

    expect(values).toStrictEqual([
      { ...publication1, type: 'publication' },
      { ...portfolio2, type: 'portfolio' }
    ])
  })
})
