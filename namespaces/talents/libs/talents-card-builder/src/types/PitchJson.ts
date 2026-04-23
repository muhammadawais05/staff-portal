interface PitchJsonPortfolio {
  type: 'designerPortfolio'
  data: {
    originalEntityId: string
  }
}

interface PitchJsonSkill {
  data: {
    originalEntityId: string
  }
}

interface PitchJsonIndustry {
  data: {
    originalEntityId: string
  }
}

interface PitchJsonEmployment {
  type: 'groupedEmployment'
  data: {
    originalEntityId: string
    descriptionItems: { data: { description: string } }[]
  }
}

interface PitchJsonSimpleEntity {
  type:
    | 'certification'
    | 'mentorship'
    | 'experience'
    | 'publication'
    | 'education'
  data: {
    originalEntityId: string
  }
}

type PitchJsonHighlight = PitchJsonSimpleEntity | PitchJsonEmployment

/**
 * Format of the pitch json stored on the server-side.
 * We send it with the job application mutation and receive as the lastPitch.
 */
export interface PitchJson {
  industries: PitchJsonIndustry[]
  skills: PitchJsonSkill[]
  portfolio: PitchJsonPortfolio[]
  highlights: PitchJsonHighlight[]
}
