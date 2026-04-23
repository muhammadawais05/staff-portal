import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'

import RejectedApplicationItemExpandedRow from './RejectedApplicationItemExpandedRow'

jest.mock('@staff-portal/talents-quality', () => ({
  __esModule: true,
  MatchQualitySection: () => <>MatchQualitySection</>
}))

jest.mock(
  '../CandidateSendingApplicantSkills/CandidateSendingApplicantSkills',
  () => ({
    __esModule: true,
    default: () => <>CandidateSendingApplicantSkills</>
  })
)

jest.mock('../TalentInfoSection/TalentInfoSection', () => ({
  __esModule: true,
  default: () => <>TalentInfoSection</>
}))

jest.mock('../JobPositionAnswersSection/JobPositionAnswersSection', () => ({
  __esModule: true,
  default: () => <>JobPositionAnswersSection</>
}))

jest.mock('../PreviewTalentCard/PreviewTalentCard', () => ({
  __esModule: true,
  default: () => <>PreviewTalentCard</>
}))

const arrangeTest = () => {
  const {
    container: { textContent }
  } = render(
    <TestWrapper>
      <RejectedApplicationItemExpandedRow
        talentId='talentId'
        applicantId='applicantId'
      />
    </TestWrapper>
  )

  return textContent
}

describe('RejectedApplicationItemExpandedRow', () => {
  it('contains required components', () => {
    const content = arrangeTest()

    expect(content).toContain('TalentInfoSection')
    expect(content).toContain('MatchQualitySection')
    expect(content).toContain('CandidateSendingApplicantSkills')
    expect(content).toContain('JobPositionAnswersSection')
    expect(content).toContain('PreviewTalentCard')
  })
})
