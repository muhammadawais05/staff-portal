import { SubSection } from '@staff-portal/ui'
import React, { PropsWithChildren } from 'react'

const EngagementSurveyAnswersLayout = ({ children }: PropsWithChildren<{}>) => (
  <SubSection titleSize='small' title='Feedback During Engagement'>
    {children}
  </SubSection>
)

export default EngagementSurveyAnswersLayout
