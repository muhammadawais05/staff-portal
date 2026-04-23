import { getResolvedJobId, getResolvedTalentId } from './get-resolved-ids'

describe('getResolvedJobId', () => {
  it('gives position jobId if it exists', () => {
    expect(
      getResolvedJobId(
        {
          POSITION: {
            jobId: 'jobId',
            talentId: 'talentId',
            engagementId: 'engagementId'
          },
          SKILLS: null,
          AVAILABILITY: null,
          DETAILS: null,
          PITCH: null,
          FEEDBACK: null
        },
        'initialJobId'
      )
    ).toBe('jobId')
  })

  it('gives initialJobId if no position step', () => {
    expect(
      getResolvedJobId(
        {
          POSITION: null,
          SKILLS: null,
          AVAILABILITY: null,
          DETAILS: null,
          PITCH: null,
          FEEDBACK: null
        },
        'initialJobId'
      )
    ).toBe('initialJobId')
  })

  it('gives null if no any value', () => {
    expect(
      getResolvedJobId(
        {
          POSITION: null,
          SKILLS: null,
          AVAILABILITY: null,
          DETAILS: null,
          PITCH: null,
          FEEDBACK: null
        },
        undefined
      )
    ).toBeNull()
  })
})

describe('getResolvedTalentId', () => {
  it('gives position talentId if it exists', () => {
    expect(
      getResolvedTalentId(
        {
          POSITION: {
            jobId: 'jobId',
            talentId: 'talentId',
            engagementId: 'engagementId'
          },
          SKILLS: null,
          AVAILABILITY: null,
          DETAILS: null,
          PITCH: null,
          FEEDBACK: null
        },
        'initialTalentId'
      )
    ).toBe('talentId')
  })

  it('gives initialJobId if no position step', () => {
    expect(
      getResolvedTalentId(
        {
          POSITION: null,
          SKILLS: null,
          AVAILABILITY: null,
          DETAILS: null,
          PITCH: null,
          FEEDBACK: null
        },
        'initialTalentId'
      )
    ).toBe('initialTalentId')
  })

  it('gives null if no any value', () => {
    expect(
      getResolvedTalentId(
        {
          POSITION: null,
          SKILLS: null,
          AVAILABILITY: null,
          DETAILS: null,
          PITCH: null,
          FEEDBACK: null
        },
        undefined
      )
    ).toBeNull()
  })
})
