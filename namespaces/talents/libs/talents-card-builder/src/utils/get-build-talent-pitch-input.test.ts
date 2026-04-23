import { getBuildTalentPitchInput } from './get-build-talent-pitch-input'

describe('getBuildTalentPitchInput', () => {
  it('returns talent pitch input', () => {
    expect(
      getBuildTalentPitchInput({
        highlights: {
          skills: ['skill-id-1', 'skill-id-2'],
          industries: ['industry-id-1', 'industry-id-2'],
          portfolio: ['portfolio-id-1'],
          items: [
            { id: 'item-id-1', type: 'certification' },
            { id: 'item-id-2', type: 'education' },
            { id: 'item-id-3', type: 'certification' },
            {
              id: 'item-id-4',
              type: 'employment',
              description_items: ['description 1', 'description 2']
            },
            { id: 'item-id-5', type: 'portfolio' },
            {
              id: 'item-id-6',
              type: 'employment',
              description_items: ['description 1']
            },
            { id: 'item-id-7', type: 'publication' },
            { id: 'item-id-8', type: 'mentorship' }
          ]
        }
      })
    ).toStrictEqual({
      skillPitchItems: [
        {
          skillSetId: 'skill-id-1',
          sortPosition: 0
        },
        {
          skillSetId: 'skill-id-2',
          sortPosition: 1
        }
      ],
      industryPitchItems: [
        {
          industryId: 'industry-id-1',
          sortPosition: 2
        },
        {
          industryId: 'industry-id-2',
          sortPosition: 3
        }
      ],
      certificationPitchItems: [
        {
          certificationId: 'item-id-1',
          sortPosition: 4
        },
        {
          certificationId: 'item-id-3',
          sortPosition: 6
        }
      ],
      educationPitchItems: [
        {
          educationId: 'item-id-2',
          sortPosition: 5
        }
      ],
      employmentPitchItems: [
        {
          additionalTextItems: ['description 1', 'description 2'],
          employmentId: 'item-id-4',
          sortPosition: 7
        },
        {
          additionalTextItems: ['description 1'],
          employmentId: 'item-id-6',
          sortPosition: 9
        }
      ],
      portfolioPitchItems: [
        {
          portfolioItemId: 'item-id-5',
          sortPosition: 8
        },
        {
          portfolioItemId: 'portfolio-id-1',
          sortPosition: 12
        }
      ],
      publicationPitchItems: [
        {
          publicationId: 'item-id-7',
          sortPosition: 10
        }
      ],
      mentorshipPitchItems: [
        {
          sortPosition: 11
        }
      ]
    })

    expect(
      getBuildTalentPitchInput({
        highlights: {
          skills: [],
          industries: [],
          portfolio: ['portfolio-id-1'],
          items: [
            { id: 'item-id-1', type: 'certification' },
            { id: 'item-id-2', type: 'education' },
            { id: 'item-id-3', type: 'certification' },
            {
              id: 'item-id-4',
              type: 'employment',
              description_items: ['description 1', 'description 2']
            },
            { id: 'item-id-5', type: 'portfolio' },
            {
              id: 'item-id-6',
              type: 'employment',
              description_items: ['description 1']
            },
            { id: 'item-id-7', type: 'publication' },
            { id: 'item-id-8', type: 'mentorship' }
          ]
        }
      })
    ).toStrictEqual({
      skillPitchItems: [],
      industryPitchItems: [],
      certificationPitchItems: [
        {
          certificationId: 'item-id-1',
          sortPosition: 0
        },
        {
          certificationId: 'item-id-3',
          sortPosition: 2
        }
      ],
      educationPitchItems: [
        {
          educationId: 'item-id-2',
          sortPosition: 1
        }
      ],
      employmentPitchItems: [
        {
          additionalTextItems: ['description 1', 'description 2'],
          employmentId: 'item-id-4',
          sortPosition: 3
        },
        {
          additionalTextItems: ['description 1'],
          employmentId: 'item-id-6',
          sortPosition: 5
        }
      ],
      portfolioPitchItems: [
        {
          portfolioItemId: 'item-id-5',
          sortPosition: 4
        },
        {
          portfolioItemId: 'portfolio-id-1',
          sortPosition: 8
        }
      ],
      publicationPitchItems: [
        {
          publicationId: 'item-id-7',
          sortPosition: 6
        }
      ],
      mentorshipPitchItems: [
        {
          sortPosition: 7
        }
      ]
    })
  })
})
