import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React, { useMemo } from 'react'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import {
  TALENT_UPDATED,
  TalentApplicantSkillsSelector
} from '@staff-portal/talents'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

import { ConvertToSourcingFlowMutation } from '../../data/use-convert-to-sourcing-flow'
import {
  GetConvertToSourcingFlowInfoQuery,
  useConvertToSourcingFlow
} from '../../data'
import { AnswerFormValue, FormValues } from '../../types'
import {
  formValuesToMutationInput,
  getCountryId,
  getInitialAnswers
} from '../../utils'
import { ConvertToSourcingFlowApplicationAnswers } from '../ConvertToSourcingFlowApplicationAnswers'
import { ConvertToSourcingFlowCity } from '../ConvertToSourcingFlowCity'

export interface Props {
  talentId: string
  talentData: GetConvertToSourcingFlowInfoQuery
  hideModal: () => void
}

export const ConvertToSourcingFlowModalForm = ({
  talentId,
  talentData,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const initialValues = useMemo<FormValues>(
    () => ({
      fullName: talentData?.node?.fullName || '',
      email: talentData?.node?.email || '',
      countryId:
        getCountryId(
          talentData.countries.nodes,
          'name',
          talentData?.node?.locationV2?.countryName
        ) || '',
      city: {
        name: talentData?.node?.locationV2?.cityName || '',
        placeId: talentData?.node?.locationV2?.placeId || ''
      },
      citizenshipId:
        getCountryId(
          talentData.countries.nodes,
          'id',
          talentData?.node?.citizenship?.id
        ) || '',
      skills: talentData?.node?.applicantSkills?.nodes || [],
      answers: talentData?.node?.defaultApplicationAnswers?.nodes.length
        ? getInitialAnswers(talentData?.node?.defaultApplicationAnswers?.nodes)
        : undefined
    }),
    [
      talentData.countries.nodes,
      talentData?.node?.applicantSkills?.nodes,
      talentData?.node?.citizenship?.id,
      talentData?.node?.defaultApplicationAnswers?.nodes,
      talentData?.node?.email,
      talentData?.node?.fullName,
      talentData?.node?.locationV2?.cityName,
      talentData?.node?.locationV2?.countryName,
      talentData?.node?.locationV2?.placeId
    ]
  )

  const [convertToSourcingFlow, { loading }] = useConvertToSourcingFlow({
    onError: () =>
      showError(
        `An error occurred, can't convert ${talentData?.node?.fullName} to sourcing flow.`
      ),
    onCompleted: (data: ConvertToSourcingFlowMutation) => {
      if (data.convertToSourcingFlow?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
      }
    }
  })

  const countryOptions = useMemo(() => {
    if (!talentData.countries.nodes) {
      return []
    }

    const options = talentData.countries.nodes.map(({ id, name }) => ({
      value: id,
      text: name
    }))

    return [NOT_SELECTED_OPTION, ...options]
  }, [talentData.countries.nodes])

  const handleSubmit = async (values: FormValues) => {
    const input = formValuesToMutationInput(values, talentId)

    const { data } = await convertToSourcingFlow({
      variables: { input }
    })

    return handleMutationResult({
      mutationResult: data?.convertToSourcingFlow,
      onSuccessAction: hideModal,
      successNotificationMessage:
        'The talent profile was successfully converted to the sourcing flow.'
    })
  }

  return (
    <ModalForm<FormValues>
      title={`Convert ${talentData?.node?.fullName} to Sourcing Flow`}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      <Modal.Content>
        <Form.Input
          name='fullName'
          label='Full name'
          width='full'
          autoFocus
          required
          data-testid='convert-to-sourcing-flow-full-name'
        />

        <Form.Input
          required
          name='email'
          label='Email'
          width='full'
          data-testid='convert-to-sourcing-flow-email'
        />

        <Form.Select
          required
          name='countryId'
          label='Country'
          options={countryOptions}
          width='full'
          data-testid='convert-to-sourcing-flow-country'
        />
        <FormSpy<FormValues>>
          {({ values }) => (
            <ConvertToSourcingFlowCity
              defaultValue={talentData?.node?.locationV2?.cityName || ''}
              currentCountryId={values.countryId}
              countries={talentData.countries.nodes}
            />
          )}
        </FormSpy>
        <Form.Select
          required
          name='citizenshipId'
          label='Citizenship'
          options={countryOptions}
          width='full'
          data-testid='convert-to-sourcing-flow-citizenship'
        />

        <TalentApplicantSkillsSelector
          required
          name='skills'
          talentOrVerticalId={talentId}
        />

        {!!talentData?.node?.defaultApplicationAnswers?.nodes.length && (
          <ConvertToSourcingFlowApplicationAnswers
            answers={talentData?.node?.defaultApplicationAnswers?.nodes}
            initialAnswerValues={initialValues.answers as AnswerFormValue}
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='convert-to-sourcing-flow-submit'
        >
          Convert
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}
