import { Section } from '@toptal/picasso'
import React, { ReactNode } from 'react'

const TalentInterviewFeedbackSection = ({
  children
}: {
  children: ReactNode
}) => (
  <Section
    variant='withHeaderBar'
    data-testid='engagement-talent-interview-feedback-section'
    title='Talent Interview Feedback'
  >
    {children}
  </Section>
)

export default TalentInterviewFeedbackSection
