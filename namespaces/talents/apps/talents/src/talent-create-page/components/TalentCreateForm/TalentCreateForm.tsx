import React from 'react'
import { Button, Container, Grid } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'
import { FormBaseErrorContainer } from '@staff-portal/forms'
import { useNavigate } from '@staff-portal/navigation'
import { getTalentsPath, getTalentProfilePath } from '@staff-portal/routes'
import { TalentLocationFields } from '@staff-portal/talents'

import { TalentCreateFormValues } from '../../types'
import {
  ABOUT_FIELD,
  EMAIL_FIELD,
  FULL_NAME_FIELD,
  GITHUB_FIELD,
  LEGAL_NAME_FIELD,
  LINKEDIN_FIELD,
  PHONE_NUMBER_FIELD,
  PORTFOLIO_URL_FIELD,
  RESUME_FIELD,
  SKYPE_FIELD,
  WEBSITE_FIELD
} from '../../config'
import { TalentTypes } from '../../constants'
import TalentPartnerField from '../TalentPartnerField'
import ApplicationQuestions from '../ApplicationQuestions'
import { useCreateTalentProfile } from './hooks'
import TalentCreatePositionField from '../TalentCreatePositionField'
import TalentCreateSkillsField from '../TalentCreateSkillsField'
import TalentReferrerField from '../TalentReferrerField'

interface Props {
  talentType: string
  verticalId: string
  topScreenPosition?: string
  permits?: {
    assignTalentPartner: boolean
  }
}

const TalentCreateForm = ({
  talentType,
  topScreenPosition,
  verticalId,
  permits
}: Props) => {
  const navigate = useNavigate()
  const navigateBack = () => navigate(getTalentsPath())

  const { handleSubmit } = useCreateTalentProfile({
    talentType,
    verticalId,
    onSuccess: (talentId: string) => {
      navigate(getTalentProfilePath(talentId))
    }
  })
  const initialValues: Partial<TalentCreateFormValues> | undefined =
    talentType === TalentTypes.TOP_SCREEN && topScreenPosition
      ? ({
          topscreenPositionId: topScreenPosition
        } as unknown as TalentCreateFormValues)
      : undefined

  return (
    <Form<TalentCreateFormValues>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      <FormBaseErrorContainer bottom='medium' />

      <TalentReferrerField />

      <TalentPartnerField
        assignTalentPartnerPermit={permits?.assignTalentPartner}
      />
      {talentType === TalentTypes.TOP_SCREEN && <TalentCreatePositionField />}
      <GridItemField label='Full name' labelFor={FULL_NAME_FIELD} required>
        <Form.Input
          id={FULL_NAME_FIELD}
          name={FULL_NAME_FIELD}
          width='full'
          required
          data-lpignore='true'
          placeholder='Your full name'
        />
      </GridItemField>
      <GridItemField label='Email' labelFor={EMAIL_FIELD} required>
        <Form.Input
          id={EMAIL_FIELD}
          name={EMAIL_FIELD}
          width='full'
          required
          data-lpignore='true'
          placeholder='Email'
        />
      </GridItemField>
      <GridItemField label='Skype' labelFor={SKYPE_FIELD}>
        <Form.Input
          id={SKYPE_FIELD}
          name={SKYPE_FIELD}
          width='full'
          data-lpignore='true'
          placeholder='Skype username'
        />
      </GridItemField>
      <GridItemField label='About Me' labelFor={ABOUT_FIELD}>
        <Form.Input
          id={ABOUT_FIELD}
          name={ABOUT_FIELD}
          multiline
          rowsMin={4}
          rowsMax={25}
          width='full'
          placeholder='One paragraph summary about your professional experience'
        />
      </GridItemField>
      <TalentCreateSkillsField
        verticalId={verticalId}
        talentType={talentType}
      />
      <GridItemField label='Full legal name' labelFor={LEGAL_NAME_FIELD}>
        <Form.Input
          id={LEGAL_NAME_FIELD}
          name={LEGAL_NAME_FIELD}
          width='full'
          data-lpignore='true'
          placeholder='Full legal name'
        />
      </GridItemField>
      <TalentLocationFields required />
      <GridItemField label='Phone number' labelFor={PHONE_NUMBER_FIELD}>
        <Form.Input
          id={PHONE_NUMBER_FIELD}
          name={PHONE_NUMBER_FIELD}
          width='full'
          data-lpignore='true'
          placeholder='Will be kept private...'
        />
      </GridItemField>
      <GridItemField label='Resume' labelFor={RESUME_FIELD}>
        <Form.FileInput
          id={RESUME_FIELD}
          name={RESUME_FIELD}
          width='full'
          placeholder='Choose file'
        />
      </GridItemField>
      <GridItemField label='Personal website URL' labelFor={WEBSITE_FIELD}>
        <Form.Input
          id={WEBSITE_FIELD}
          name={WEBSITE_FIELD}
          width='full'
          data-lpignore='true'
          placeholder='Will be kept private...'
        />
      </GridItemField>
      <GridItemField label='LinkedIn profile URL' labelFor={LINKEDIN_FIELD}>
        <Form.Input
          id={LINKEDIN_FIELD}
          name={LINKEDIN_FIELD}
          width='full'
          data-lpignore='true'
          placeholder='Will be kept private...'
        />
      </GridItemField>
      {talentType === TalentTypes.DEVELOPER && (
        <GridItemField label='GitHub' labelFor={GITHUB_FIELD}>
          <Form.Input
            id={GITHUB_FIELD}
            name={GITHUB_FIELD}
            width='full'
            data-lpignore='true'
          />
        </GridItemField>
      )}
      {talentType === TalentTypes.DESIGNER && (
        <GridItemField label='Portfolio URL' labelFor={PORTFOLIO_URL_FIELD}>
          <Form.Input
            id={PORTFOLIO_URL_FIELD}
            name={PORTFOLIO_URL_FIELD}
            width='full'
            data-lpignore='true'
          />
        </GridItemField>
      )}
      <ApplicationQuestions verticalId={verticalId} />

      <Container top='small'>
        <Grid alignItems='baseline' spacing={16}>
          <Grid.Item small={4} />
          <Grid.Item small={8}>
            <Container gap='xsmall'>
              <Form.SubmitButton variant='positive'>
                Add {talentType}
              </Form.SubmitButton>

              <Button variant='secondary' onClick={navigateBack}>
                Cancel
              </Button>
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
    </Form>
  )
}

export default TalentCreateForm
