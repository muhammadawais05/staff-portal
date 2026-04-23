import React from 'react'
import { Button, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { ModalForm } from '@staff-portal/modals-service'
import { FormTimeZoneSelect } from '@staff-portal/forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { stringListToItems, stringListToOptions } from '@staff-portal/string'
import { CountryCityFields } from '@staff-portal/facilities'

import { GetClientApproveQuery } from '../../data/get-client-approve'
import { ClientApproveForm as ClientApproveFormType } from '../../types'
import { getApproveClientInput } from '../../utils'
import { SeamlessMatchingSection } from '..'
import { ApproveClientDocument } from '../../data/approve-client'

type Props = {
  data: NonNullable<GetClientApproveQuery>
  staffNode: NonNullable<GetClientApproveQuery['staffNode']>
  hideModal: () => void
  onSuccess?: () => void
  initialValues: ClientApproveFormType
}

const ClientApproveForm = ({
  data,
  staffNode,
  onSuccess,
  hideModal,
  initialValues
}: Props) => {
  const {
    id: clientId,
    fullName,
    website,
    employeeCountEstimation,
    seamlessMatchingPitchAvailableOnApproval,
    contact,
    country
  } = staffNode

  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: ApproveClientDocument,
    mutationResultOptions: {
      successNotificationMessage: 'The Applicant was successfully approved.',
      successMessageEmitOptions: {
        type: CLIENT_UPDATED,
        payload: { companyId: clientId }
      },
      onSuccessAction: () => {
        hideModal()
        onSuccess?.()
      }
    }
  })

  const {
    clientIndustries,
    clientBusinessModels,
    countries,
    clientSeamlessMatchingPitchSkipReasons
  } = data

  const industryOptions = stringListToOptions(clientIndustries)
  const businessModelsOptions = stringListToItems(clientBusinessModels)

  const onSubmit = (formData: ClientApproveFormType) =>
    handleSubmit(getApproveClientInput({ formData, clientId }))

  return (
    <ModalForm<ClientApproveFormType>
      onSubmit={onSubmit}
      title={`Approve Applicant Company ${fullName}`}
      initialValues={initialValues}
    >
      <Modal.Content>
        {!website && (
          <Form.Input
            width='full'
            name='website'
            label='Website'
            validate={isMaxLength}
          />
        )}

        {industryOptions.length && (
          <Form.Select
            name='industry'
            label='Industry'
            width='full'
            placeholder='Select industry'
            options={industryOptions}
            required
          />
        )}

        {businessModelsOptions.length && (
          <Form.TagSelector
            name='businessModels'
            label='Business models'
            width='full'
            placeholder='Select business models'
            options={businessModelsOptions}
            required
          />
        )}

        {!employeeCountEstimation && (
          <Form.NumberInput
            width='full'
            name='currentEmployeeCount'
            label='Total employees'
            min='0'
            step='1'
            hideControls
            required
          />
        )}

        {contact?.phones?.totalCount === 0 && (
          <>
            <Form.Input
              width='full'
              name='phoneNumber'
              label='Phone number'
              validate={isMaxLength}
              required
            />

            <Form.Input
              width='full'
              name='skype'
              label='Skype'
              defaultValue={contact?.skype}
              validate={isMaxLength}
            />
          </>
        )}

        {!country?.id && <CountryCityFields countries={countries.nodes} />}

        {!contact?.timeZone && (
          <FormTimeZoneSelect
            name='timeZoneName'
            label='Time Zone'
            width='full'
            required
            enableReset
          />
        )}

        <Form.RadioGroup
          data-testid='toptalProjects'
          name='toptalProjects'
          label='Toptal projects'
          horizontal
          required
        >
          <Form.Radio label='Yes' value='true' />
          <Form.Radio label='No' value='false' />
        </Form.RadioGroup>

        {seamlessMatchingPitchAvailableOnApproval && (
          <SeamlessMatchingSection
            reasons={clientSeamlessMatchingPitchSkipReasons}
          />
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>
          Approve Application
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ClientApproveForm
