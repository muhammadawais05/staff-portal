/* eslint-disable max-lines */
import React, { useMemo } from 'react'
import {
  Button,
  Container,
  Grid,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Link, useNavigate } from '@staff-portal/navigation'
import { Permits, RoleType } from '@staff-portal/graphql/staff'
import { GridItemField } from '@staff-portal/ui'
import { FormBaseErrorContainer } from '@staff-portal/forms'
import { LanguagesTagSelector } from '@staff-portal/languages'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useNotifications } from '@toptal/picasso/utils'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { getTalentProfilePath } from '@staff-portal/routes'
import { RoleAvatarEditor } from '@staff-portal/role-profile'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { TalentLocationFields } from '@staff-portal/talents'

import { useUpdateTalentProfile } from './data/update-talent-profile/update-talent-profile.staff.gql'
import { getInitialValues } from './utils/get-initial-values'
import { TalentUpdateFragment } from '../../pages/TalentUpdatePage/data'
import { TalentUpdateFormValues } from '../../types'
import {
  BILLING_NAME_FIELD,
  EMAIL_FIELD,
  FULL_LEGAL_NAME_FIELD,
  FULL_NAME_FIELD,
  PHONE_NUMBER_FIELD,
  SKYPE_FIELD,
  TOPTAL_EMAIL_FIELD,
  USE_BILLING_NAME_FIELD,
  WEBSITE_FIELD,
  LINKEDIN_FIELD,
  ADMISSION_POST_URL_FIELD,
  TWITTER_FIELD,
  PASSWORD_FIELD,
  PASSWORD_CONFIRMATION_FIELD,
  TOP_SKILL_FIELD,
  HIDDEN_FROM_ROBOTS_FIELD,
  HIDDEN_FROM_PUBLIC_ACCESS_FIELD,
  FEATURED_FIELD,
  LANGUAGE_IDS_FIELD
} from '../../config'
import TalentUpdateHourlyRateFields from '../TalentUpdateHourlyRateFields'
import TalentPartnersField from '../TalentPartnersField'
import { transformTalentUpdateInput } from './utils/transform-talent-update-input'

const ERROR_MESSAGE = 'An error occurred, the profile was not updated.'
const SUCCESS_MESSAGE = 'The Profile was successfully updated.'

interface Props {
  permits: Pick<
    Permits,
    | 'accessTalentInternals'
    | 'manageTalentBillingName'
    | 'editTalentTopSkill'
    | 'hideTalentFromRobots'
  >
  talent: TalentUpdateFragment
}

/* eslint-disable-next-line max-lines-per-function */
const TalentUpdateForm = ({ talent, permits }: Props) => {
  const initialValues = useMemo(() => getInitialValues(talent), [talent])
  const talentId = talent.id
  const { handleMutationResult } = useHandleMutationResult()
  const navigate = useNavigate()
  const { showError } = useNotifications()
  const [updateTalentProfile] = useUpdateTalentProfile({
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleSubmit = async (formValues: TalentUpdateFormValues) => {
    const { data: result } = await updateTalentProfile({
      variables: {
        input: transformTalentUpdateInput(talentId, formValues, initialValues)
      }
    })

    return handleMutationResult({
      isFormSubmit: true,
      mutationResult: result?.updateTalentProfile,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        navigate(getTalentProfilePath(decodeEntityId(talentId).id))
      }
    })
  }

  return (
    <Form<TalentUpdateFormValues>
      autoComplete='off'
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <FormBaseErrorContainer bottom='medium' />

      <WidgetErrorBoundary emptyOnError>
        <GridItemField label='Profile image' alignItems='center'>
          <RoleAvatarEditor roleId={talent.id} roleType={RoleType.TALENT} />
        </GridItemField>
      </WidgetErrorBoundary>

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
      {permits.accessTalentInternals && (
        <GridItemField label='Toptal email' labelFor={TOPTAL_EMAIL_FIELD}>
          <Form.Input
            id={TOPTAL_EMAIL_FIELD}
            name={TOPTAL_EMAIL_FIELD}
            width='full'
            data-lpignore='true'
            data-testid='talent-update-toptal-email'
            placeholder='name@toptal.com'
          />
        </GridItemField>
      )}
      <GridItemField label='Phone number' labelFor={PHONE_NUMBER_FIELD}>
        <Form.Input
          id={PHONE_NUMBER_FIELD}
          name={PHONE_NUMBER_FIELD}
          width='full'
          data-lpignore='true'
          placeholder='Will be kept private...'
          hint='Please include the country code.'
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
      {permits.accessTalentInternals && (
        <GridItemField label='Full legal name' labelFor={FULL_LEGAL_NAME_FIELD}>
          <Form.Input
            id={FULL_LEGAL_NAME_FIELD}
            name={FULL_LEGAL_NAME_FIELD}
            width='full'
            data-lpignore='true'
            data-testid='talent-update-legal-name'
            placeholder='Full legal name'
          />
        </GridItemField>
      )}
      {permits.manageTalentBillingName && (
        <>
          <GridItemField label='Billing name' labelFor={BILLING_NAME_FIELD}>
            <Form.Input
              id={BILLING_NAME_FIELD}
              name={BILLING_NAME_FIELD}
              width='full'
              data-lpignore='true'
              data-testid='talent-update-billing-name'
            />
          </GridItemField>
          <GridItemField>
            <Form.Checkbox
              name={USE_BILLING_NAME_FIELD}
              label='Use billing name'
              data-testid='talent-update-use-billing-name'
            />
          </GridItemField>
        </>
      )}

      <TalentLocationFields talentTimezone={talent.timeZone?.value} />
      <TalentPartnersField />
      {permits.editTalentTopSkill && (
        <GridItemField label='Top Skill' labelFor={TOP_SKILL_FIELD}>
          <Form.Input
            id={TOP_SKILL_FIELD}
            name={TOP_SKILL_FIELD}
            width='full'
            data-testid='talent-update-top-skill'
            hint='For public profile title, leave blank to pick skill with most experience.'
          />
        </GridItemField>
      )}

      {permits.hideTalentFromRobots && (
        <GridItemField>
          <Form.Checkbox
            name={HIDDEN_FROM_ROBOTS_FIELD}
            label='Hide From Search Engines'
            data-testid='talent-update-hidden-from-robots'
          />
        </GridItemField>
      )}

      <GridItemField>
        <Form.Checkbox
          name={HIDDEN_FROM_PUBLIC_ACCESS_FIELD}
          label='Hide Profile'
          hint="Hidden profiles aren't publicly visible. They can only be viewed by staff."
        />
      </GridItemField>

      <GridItemField>
        <Form.Checkbox
          name={FEATURED_FIELD}
          label='Featured'
          hint='If checked developer can be shown in skill pages.'
        />
      </GridItemField>

      <TalentUpdateHourlyRateFields
        updateTalentHourlyRate={talent.operations.updateTalentHourlyRate}
      />

      <GridItemField label='Languages' labelFor={LANGUAGE_IDS_FIELD}>
        <LanguagesTagSelector width='full' />
      </GridItemField>

      <GridItemField label='Personal website URL' labelFor={WEBSITE_FIELD}>
        <Form.Input
          id={WEBSITE_FIELD}
          name={WEBSITE_FIELD}
          width='full'
          data-lpignore='true'
          data-testid='talent-update-website-url'
          placeholder='Will be kept private...'
        />
      </GridItemField>

      <GridItemField label='LinkedIn profile URL' labelFor={LINKEDIN_FIELD}>
        <Form.Input
          id={LINKEDIN_FIELD}
          name={LINKEDIN_FIELD}
          width='full'
          data-lpignore='true'
          data-testid='talent-update-linkedin-url'
          placeholder='Will be kept private...'
        />
      </GridItemField>

      <GridItemField label='Admission post' labelFor={ADMISSION_POST_URL_FIELD}>
        <Form.Input
          id={ADMISSION_POST_URL_FIELD}
          name={ADMISSION_POST_URL_FIELD}
          width='full'
          data-lpignore='true'
          data-testid='talent-update-admission-post'
        />
      </GridItemField>

      <GridItemField label='Twitter' labelFor={TWITTER_FIELD}>
        <Form.Input
          id={TWITTER_FIELD}
          name={TWITTER_FIELD}
          width='full'
          data-lpignore='true'
          data-testid='talent-update-twitter-url'
        />
      </GridItemField>

      <GridItemField label='New password' labelFor={PASSWORD_FIELD}>
        <Form.Input
          id={PASSWORD_FIELD}
          name={PASSWORD_FIELD}
          width='full'
          data-lpignore='true'
          data-testid='talent-update-password'
          placeholder='Password'
          type='password'
        />
      </GridItemField>

      <GridItemField
        label='Confirm new password'
        labelFor={PASSWORD_CONFIRMATION_FIELD}
      >
        <Form.Input
          id={PASSWORD_CONFIRMATION_FIELD}
          name={PASSWORD_CONFIRMATION_FIELD}
          width='full'
          data-lpignore='true'
          data-testid='talent-update-password-confirm'
          placeholder='Password confirmation'
          type='password'
        />
      </GridItemField>
      <Container top='small'>
        <Grid alignItems='baseline' spacing={16}>
          <Grid.Item small={4} />
          <Grid.Item small={8}>
            <Container gap='xsmall'>
              <Form.SubmitButton variant='positive'>
                Save Changes
              </Form.SubmitButton>

              {talent.webResource.url && (
                <Button
                  as={Link as typeof PicassoLink}
                  variant='secondary'
                  noUnderline
                  href={talent.webResource.url}
                >
                  Cancel
                </Button>
              )}
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
    </Form>
  )
}

export default TalentUpdateForm
