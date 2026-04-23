import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'

import { FieldHelper } from './field-helper'

export const onboardingPathField: FieldHelper = ({
  company: { onboardingPath }
}) => [
  'Onboarding Path',
  onboardingPath && (
    <TypographyOverflow data-testid='onboarding-path'>
      {onboardingPath}
    </TypographyOverflow>
  )
]
