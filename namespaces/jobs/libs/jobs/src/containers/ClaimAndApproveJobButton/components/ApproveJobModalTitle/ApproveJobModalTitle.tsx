import { Container, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { useFormState } from '@toptal/picasso-forms'

import * as S from './styles'
import { ApproveJobForm } from '../../types'

const ApproveJobModalTitle = () => {
  const {
    values: {
      skipSkillsChecks,
      skipQualityChecks,
      skills,
      showNoRequiredSkillsConfirmation
    }
  } = useFormState<ApproveJobForm>()

  const hasRequiredSkills = useMemo(
    () => skills?.some(skill => skill.niceToHave === false),
    [skills]
  )

  let title, step

  if (skipSkillsChecks && skipQualityChecks) {
    title = 'Claim Job'
    step = 1
  } else if (skipQualityChecks) {
    title = 'Review Skills'
    step = 2
  } else if (!hasRequiredSkills && showNoRequiredSkillsConfirmation) {
    title = 'Missing Required Skills'
    step = null
  } else {
    title = 'Review Job Description'
    step = 3
  }

  return (
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      css={S.titleWrapper}
    >
      <Typography size='inherit' weight='semibold' color='black'>
        {title}
      </Typography>
      {step && (
        <Typography size='medium' weight='semibold' color='black'>
          Step {step} out of 3
        </Typography>
      )}
    </Container>
  )
}

export default ApproveJobModalTitle
