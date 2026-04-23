import { render } from '@testing-library/react'
import { Section } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentInterviewFeedbackSection from './TalentInterviewFeedbackSection'

jest.mock('@toptal/picasso', () => ({
  Section: jest.fn()
}))

const arrangeTest = (
  props: ComponentProps<typeof TalentInterviewFeedbackSection>
) =>
  render(
    <TestWrapper>
      <TalentInterviewFeedbackSection {...props} />
    </TestWrapper>
  )

const SectionMock = Section as unknown as jest.Mock
const children = <div>children</div>

describe('TalentInterviewFeedbackSection', () => {
  beforeEach(() => {
    SectionMock.mockImplementationOnce(() => null)
  })

  it('renders section', () => {
    arrangeTest({ children })

    expect(SectionMock).toHaveBeenCalledWith(
      {
        children,
        title: 'Talent Interview Feedback',
        variant: 'withHeaderBar',
        'data-testid': 'engagement-talent-interview-feedback-section'
      },
      {}
    )
  })
})
