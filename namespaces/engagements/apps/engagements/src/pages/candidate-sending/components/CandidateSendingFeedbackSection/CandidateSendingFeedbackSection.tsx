import { Section, SectionProps } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'

const CandidateSendingFeedbackSection = ({
  children,
  ...props
}: SectionProps) => (
  <Section {...props} css={S.section}>
    {children}
  </Section>
)

export default CandidateSendingFeedbackSection
