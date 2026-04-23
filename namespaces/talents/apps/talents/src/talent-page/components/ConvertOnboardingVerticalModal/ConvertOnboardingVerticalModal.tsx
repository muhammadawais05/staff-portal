import { Button, Container, Typography } from '@toptal/picasso'
import React from 'react'
import { Form, SubmissionErrors, FormApi } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ConvertOnboardingTalentInput } from '@staff-portal/graphql/staff'
import { titleize, compareAlphabetically } from '@staff-portal/string'
import {
  concatUnexpectedValidationErrors,
  useHandleMutationResult
} from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED, TalentVerticalFragment } from '@staff-portal/talents'
import { getRoleTypeText } from '@staff-portal/facilities'

import { useConvertOnboardingTalent } from './data/convert-onboarding-talent'
import { getVerticalById } from '../../utils'

export interface Props {
  talentId: string
  fullName: string
  type: string
  verticals: TalentVerticalFragment[]
  hideModal: () => void
}

const ConvertOnboardingVerticalModal = ({
  talentId,
  fullName,
  type,
  verticals,
  hideModal
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const [convertOnboardingTalent, { loading }] = useConvertOnboardingTalent({
    onError: () =>
      showError('An error occurred, the vertical was not changed.'),
    onCompleted: data => {
      if (data?.convertOnboardingTalent?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      }
    }
  })

  const handleSubmit = async (
    input: ConvertOnboardingTalentInput,
    _: FormApi<ConvertOnboardingTalentInput>,
    setSubmissionErrors: ((errors?: SubmissionErrors) => void) | undefined
  ) => {
    const { toVerticalId } = input
    const convertOnboardingTalentResult = await convertOnboardingTalent({
      variables: { input: { ...input, talentId } }
    })

    const newVertical = getVerticalById(toVerticalId, verticals)

    if (!newVertical) {
      return
    }

    const successNotificationMessage = `The ${getRoleTypeText(
      type
    )} was successfully converted to a ${titleize(newVertical.talentType)}.`

    const validationErrors = handleMutationResult({
      mutationResult:
        convertOnboardingTalentResult?.data?.convertOnboardingTalent,
      successNotificationMessage
    })

    if (validationErrors) {
      setSubmissionErrors?.(validationErrors)
      const unexpectedValidationErrors = concatUnexpectedValidationErrors(
        validationErrors as Record<string, string>,
        Object.keys(input)
      )

      if (unexpectedValidationErrors) {
        showError(unexpectedValidationErrors)
      }
    }
  }

  const options = verticals
    .map(({ id, talentType }) => ({
      text: titleize(talentType),
      value: id
    }))
    .sort((first, second) => compareAlphabetically(first.text, second.text))

  return (
    <Modal open onClose={hideModal}>
      <Form<ConvertOnboardingTalentInput> onSubmit={handleSubmit}>
        <Modal.Title>
          Convert {getRoleTypeText(type)} {fullName}
        </Modal.Title>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Do you really want to convert this profile?
            </Typography>
          </Container>
          <Form.Select
            label='To'
            name='toVerticalId'
            required
            width='full'
            placeholder='Please select a vertical'
            data-testid='convert-onboarding-vertical-select'
            options={options}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Button variant='negative' loading={loading} type='submit'>
            Convert
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default ConvertOnboardingVerticalModal
