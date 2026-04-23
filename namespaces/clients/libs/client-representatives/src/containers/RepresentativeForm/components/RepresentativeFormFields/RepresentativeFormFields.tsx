import React, { useMemo } from 'react'
import { Form as PicassoForm, useField } from '@toptal/picasso-forms'
import { Container, Form, Typography } from '@toptal/picasso'
import {
  Client,
  CompanyRepresentativeBillingCommunicationOption as BillingCommOpts,
  CompanyRepresentativeBillingCommunicationOption,
  CompanyRepresentativeCommunicationOption as CommOpts,
  CompanyRepresentativeCreationMethod,
  RoleStatus,
  Maybe
} from '@staff-portal/graphql/staff'
import { useNotifications } from '@staff-portal/error-handling'
import { FormTimeZoneSelect } from '@staff-portal/forms'
import { useGetCountries, CountryCityFields } from '@staff-portal/facilities'
import { useGetLanguages } from '@staff-portal/languages'
import { GridItemField } from '@staff-portal/ui'

import GroupField from '../GroupField'
import { RepresentativeFragment } from '../../../../data'
import BillingCommunicationJobsField from '../BillingCommunicationJobsField'
import TagSelectorField from '../TagSelectorField'
import PhoneContactsEditor from '../../../../components/PhoneContactsEditor/PhoneContactsEditor'
import {
  billingCommunicationOptionLabels as billingCommOptsLabels,
  communicationOptionLabels as commOptsLabels
} from '../../../../constants'
import { mapCommOptsToLabels } from '../../../../services'

type Props = {
  // this is only set when editing existing rep and undefined when creating new one
  representative?: RepresentativeFragment
  client: Partial<Maybe<Client>> | undefined
}

// eslint-disable-next-line complexity, max-lines-per-function
const RepresentativeFormFields = ({ representative, client }: Props) => {
  const enabledBillingComms = useMemo(() => {
    const enabledBilling = new Set(Object.values(BillingCommOpts))

    representative?.disabledBillingCommunicationOptions?.forEach(op =>
      enabledBilling.delete(op)
    )

    return Array.from(enabledBilling)
  }, [representative])

  const {
    input: { value: portalEnabledValue }
  } = useField('portalEnabled')

  const {
    input: { value: creationMethodValue }
  } = useField('creationMethod')

  // if true we're creating a rep that already has an account at toptal.
  const creatingForExistingAccount =
    creationMethodValue === CompanyRepresentativeCreationMethod.EXISTING

  const canReceiveLoginInvitation =
    client?.contactInvitable ||
    (representative &&
      !representative.currentSignInAt &&
      representative.contactInvitable)

  const { showError } = useNotifications()

  const { countries, loading: countriesLoading } = useGetCountries({
    onError: () => {
      showError('Unable to load countries.')
    }
  })
  const { languages, loading: languagesLoading } = useGetLanguages({
    onError: () => {
      showError('Unable to load languages.')
    }
  })
  const languagesOptions = useMemo(
    () =>
      languages
        ? languages.map(({ id, name }) => ({ text: name, value: id }))
        : [],
    [languages]
  )

  const isRepresentativeRemoved = representative?.status === RoleStatus.REMOVED

  return (
    <>
      {!representative && (
        <>
          <Container bottom='medium'>
            <Typography size='medium' weight='semibold'>
              {creatingForExistingAccount
                ? 'Create a new contact for a person who has already been added to Toptal. Some fields shared between roles are not available to edit on this form.'
                : "Create a new contact for a person who hasn't been added to Toptal before. All of the fields on the contact can be set when creating a new contact."}
            </Typography>
          </Container>
          <GridItemField label='Contact Type' labelFor='creationMethod'>
            <PicassoForm.RadioGroup
              horizontal
              id='creationMethod'
              name='creationMethod'
            >
              <PicassoForm.Radio
                label='This person is new to Toptal'
                value={CompanyRepresentativeCreationMethod.NEW}
                data-testid='radio-new-person'
              />

              <PicassoForm.Radio
                label='This person is already on Toptal'
                value={CompanyRepresentativeCreationMethod.EXISTING}
                data-testid='radio-existing-person'
              />
            </PicassoForm.RadioGroup>
          </GridItemField>
        </>
      )}

      {!creatingForExistingAccount && (
        <GridItemField label='Full name' labelFor='fullName' required>
          <PicassoForm.Input
            required
            id='fullName'
            name='fullName'
            width='full'
          />
        </GridItemField>
      )}

      <GridItemField label='Email' labelFor='email' required>
        <PicassoForm.Input required id='email' name='email' width='full' />
      </GridItemField>

      <GridItemField label='Position' labelFor='position'>
        <PicassoForm.Input id='position' name='position' width='full' />
      </GridItemField>

      {!creatingForExistingAccount && (
        <>
          {representative ? (
            <GridItemField label='Phone Numbers' labelFor='phones'>
              <PhoneContactsEditor formName='phones' noButtons />
            </GridItemField>
          ) : (
            <GridItemField label='Phone Number' labelFor='phoneNumber'>
              <PicassoForm.Input
                id='phoneNumber'
                name='phoneNumber'
                type='tel'
                width='full'
              />
            </GridItemField>
          )}

          {representative && (
            <GridItemField
              label='Phone number notes'
              labelFor='phoneNumberNotes'
            >
              <PicassoForm.Input
                id='phoneNumberNotes'
                name='phoneNumberNotes'
                width='full'
              />
            </GridItemField>
          )}

          <GridItemField label='Skype' labelFor='skype'>
            <PicassoForm.Input id='skype' name='skype' width='full' />
          </GridItemField>

          {representative && (
            <>
              <GridItemField label='LinkedIn' labelFor='linkedin'>
                <PicassoForm.Input id='linkedin' name='linkedin' width='full' />
              </GridItemField>

              <GridItemField label='Zoominfo' labelFor='zoominfoProfile'>
                <PicassoForm.Input
                  id='zoominfoProfile'
                  name='zoominfoProfile'
                  width='full'
                />
              </GridItemField>
            </>
          )}

          <CountryCityFields
            countries={countries}
            loading={countriesLoading}
            required={false}
            name='location.countryId'
            cityNameFieldName='location.cityName'
            variant='grid'
          />

          <GridItemField label='Time Zone' labelFor='timeZoneName'>
            <FormTimeZoneSelect
              id='timeZoneName'
              name='timeZoneName'
              width='full'
              enableReset
            />
          </GridItemField>

          <GridItemField label='About' labelFor='about'>
            <PicassoForm.Input
              id='about'
              name='about'
              multiline
              rows={3}
              rowsMax={6}
              width='full'
            />
          </GridItemField>

          <GridItemField label='Languages' labelFor='languageIds'>
            <TagSelectorField
              options={languagesOptions}
              loading={languagesLoading}
              name='languageIds'
            />
          </GridItemField>

          <GridItemField label='Twitter' labelFor='twitter'>
            <PicassoForm.Input id='twitter' name='twitter' width='full' />
          </GridItemField>

          {!representative && (
            <GridItemField label='Website' labelFor='website'>
              <PicassoForm.Input id='website' name='website' width='full' />
            </GridItemField>
          )}

          {representative && (
            <GridItemField label='information' labelFor='information'>
              <PicassoForm.Input
                id='information'
                name='information'
                with='full'
                multiline
                rows={3}
                rowsMax={6}
              />
            </GridItemField>
          )}

          <GridItemField label='Password' labelFor='password'>
            <PicassoForm.Input
              id='password'
              name='password'
              type='password'
              width='full'
            />
          </GridItemField>

          <GridItemField
            label='Password Confirmation'
            labelFor='passwordConfirmation'
          >
            <PicassoForm.Input
              id='passwordConfirmation'
              name='passwordConfirmation'
              type='password'
              width='full'
            />
          </GridItemField>
        </>
      )}

      <GridItemField label='Contact login' labelFor='portalEnabled' required>
        <PicassoForm.RadioGroup
          horizontal
          id='portalEnabled'
          name='portalEnabled'
          required
          hint='Allow this Contact to login to the Client Portal.'
        >
          <PicassoForm.Radio
            label='Yes'
            value='true'
            data-testid='portalEnabled-yes'
          />

          <PicassoForm.Radio
            label='No'
            value='false'
            data-testid='portalEnabled-no'
          />
        </PicassoForm.RadioGroup>
      </GridItemField>

      {portalEnabledValue === 'true' && canReceiveLoginInvitation && (
        <GridItemField>
          <PicassoForm.Checkbox
            label='Send invitation email'
            id='inviteToLogin'
            name='inviteToLogin'
            hint={`Contact will get an email with a link to set their password. ${
              client?.portalPermissionsEnabled &&
              'This user will be given Default permissions in the Client Portal.'
            }`}
          />
        </GridItemField>
      )}

      {!isRepresentativeRemoved && (
        <>
          <GridItemField
            label='Billing Communication'
            labelFor='billingCommunication'
          >
            <GroupField
              name='billingCommunication'
              disabledOptions={
                representative?.disabledBillingCommunicationOptions ?? [
                  CompanyRepresentativeBillingCommunicationOption.SELECTED_JOB_NOTICES
                ]
              }
              Group={PicassoForm.RadioGroup}
              Input={PicassoForm.Radio}
              horizontal
              choices={[
                {
                  value: BillingCommOpts.ALL,
                  label: billingCommOptsLabels[BillingCommOpts.ALL],
                  tooltip: client?.portalPermissionsEnabled
                    ? 'This will enable the View Invoices permission for this user.'
                    : undefined
                },
                {
                  value: BillingCommOpts.NONE,
                  label: billingCommOptsLabels[BillingCommOpts.NONE]
                },
                {
                  value: BillingCommOpts.SELECTED_JOB_NOTICES,
                  label:
                    billingCommOptsLabels[BillingCommOpts.SELECTED_JOB_NOTICES],
                  tooltip:
                    'This person will only receive invoices if they are listed as a job contact.'
                }
              ]}
            >
              {enabledBillingComms.length === 1 &&
                enabledBillingComms[0] === BillingCommOpts.ALL && (
                  <Form.Hint>
                    You cannot disable Billing Communication. This is a required
                    communication for at least one member of the company. Please
                    make sure that another contact has the option checked before
                    unchecking it.
                  </Form.Hint>
                )}
              {client?.portalPermissionsEnabled && (
                <Form.Hint>
                  Must be a job contact to receive Selected Job Notices.
                </Form.Hint>
              )}
            </GroupField>
          </GridItemField>

          {representative && (
            <>
              <BillingCommunicationJobsField
                name='billingCommunicationJobIds'
                linkedFieldName='billingCommunication'
                jobs={representative.jobs}
              />

              <GridItemField
                label='View and Download Billing Reporting'
                labelFor='readBillingReport'
              >
                <PicassoForm.RadioGroup
                  horizontal
                  id='readBillingReport'
                  name='readBillingReport'
                  hint='Allow this Contact to view and download billing reporting.'
                >
                  <PicassoForm.Radio label='Yes' value='true' />
                  <PicassoForm.Radio label='No' value='false' />
                </PicassoForm.RadioGroup>
              </GridItemField>
            </>
          )}

          <GridItemField label='Communication' labelFor='communication'>
            <GroupField
              name='communication'
              disabledOptions={representative?.disabledCommunicationOptions}
              Group={PicassoForm.CheckboxGroup}
              Input={PicassoForm.Checkbox}
              choices={[
                {
                  value: CommOpts.NOTIFY_TALENT_RECOMMENDATIONS,
                  label: commOptsLabels[CommOpts.NOTIFY_TALENT_RECOMMENDATIONS]
                },
                {
                  value: CommOpts.NOTIFY_OTHER,
                  label: commOptsLabels[CommOpts.NOTIFY_OTHER],
                  tooltip:
                    'Includes notifications of changes to the matcher or claimer on the account.'
                },
                {
                  value: CommOpts.NOTIFY_JOBS,
                  label: commOptsLabels[CommOpts.NOTIFY_JOBS],
                  tooltip:
                    'Will send talent and engagement related emails about all jobs, overriding job contact settings.'
                },
                {
                  value: CommOpts.NOTIFY_BILLING,
                  label: commOptsLabels[CommOpts.NOTIFY_BILLING]
                }
              ]}
            >
              {!!representative?.disabledCommunicationOptions?.length && (
                <Form.Hint>
                  You cannot disable{' '}
                  {representative?.disabledCommunicationOptions
                    .map(mapCommOptsToLabels)
                    .join(' or ')}
                  . This is a required communication for at least one member of
                  the company. Please make sure that another contact has the
                  option checked before unchecking it.
                </Form.Hint>
              )}
            </GroupField>
          </GridItemField>
        </>
      )}
    </>
  )
}

export default RepresentativeFormFields
