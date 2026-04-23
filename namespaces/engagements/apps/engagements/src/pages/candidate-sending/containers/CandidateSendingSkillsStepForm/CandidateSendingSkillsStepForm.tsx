import { Form, useFormState } from '@toptal/picasso-forms'
import { Typography, Container } from '@toptal/picasso'
import React from 'react'
import {
  SkillVettingResult,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

import { FormSkillRadioLabel } from './components'
import { CandidateSendingStepAttributes } from '../../types'
import * as S from './styles'

type Props = {
  skillName?: string
  webResource?: {
    url?: string | null
    text: string
  }
}

const CandidateSendingSkillsStepForm = ({ skillName, webResource }: Props) => {
  const { values } =
    useFormState<
      CandidateSendingStepAttributes<NewEngagementWizardStep.SKILLS>
    >()

  return (
    <>
      {webResource && skillName && (
        <Container
          bottom='medium'
          data-testid='candidate-sending-skills-step-form-header'
        >
          <Typography variant='heading' size='medium'>
            This client requires an expert in {skillName}
          </Typography>

          <Typography size='small'>
            Please verify{' '}
            <LinkWrapper
              wrapWhen={Boolean(webResource.url)}
              href={webResource.url as string}
            >
              {webResource.text}
            </LinkWrapper>
            's expertise in {skillName}.
          </Typography>
        </Container>
      )}

      <Form.RadioGroup
        name='skillVettingResult'
        label='Your assessment'
        horizontal
        required
        css={S.radioGroup}
      >
        <Form.Radio
          label={
            <FormSkillRadioLabel
              title='Lower Confidence'
              description={`The talent meets the skill expertise requirements of this job
              but would require further assessment on future job applications.`}
            />
          }
          value={SkillVettingResult.NO}
        />
        <Form.Radio
          label={
            <FormSkillRadioLabel
              title='Confirmed Expert'
              description='I confirm the talent is indeed a top expert in this skill.'
            />
          }
          value={SkillVettingResult.EXPERT}
        />
      </Form.RadioGroup>

      {values?.skillVettingResult === SkillVettingResult.NO && (
        <Form.Input
          label='Comment'
          name='skillVettingComment'
          data-testid='candidate-sending-skills-step-form-comment'
          required
          multiline
          rows={4}
          width='full'
        />
      )}
    </>
  )
}

export default CandidateSendingSkillsStepForm
