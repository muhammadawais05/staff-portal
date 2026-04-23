import React, { useMemo } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { ConvertClientToTalentInput } from '@staff-portal/graphql/staff'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { ConvertClientToTalentDocument } from '../../data'

export const TITLE = 'Turn into Talent Applicant'

interface Props {
  hideModal: () => void
  companyId: string
  fullName: string
  verticals: UserVerticalFragment[]
}

const TurnIntoTalentForm = ({
  hideModal,
  companyId,
  fullName,
  verticals
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: ConvertClientToTalentDocument,
    mutationResultOptions: {
      mutationResult: 'convertClientToTalent',
      onSuccessAction: hideModal,
      isFormSubmit: true,
      successNotificationMessage:
        'The Company Application was successfully converted to a talent application.'
    }
  })

  const verticalOptions = useMemo(
    () => (verticals || []).map(({ name, id }) => ({ text: name, value: id })),
    [verticals]
  )

  return (
    <ModalForm<ConvertClientToTalentInput>
      initialValues={{
        clientId: companyId,
        fullName
      }}
      data-testid='TurnIntoTalent-form'
      onSubmit={handleSubmit}
      title={TITLE}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to turn this company application into talent
            application?
          </Typography>
        </Container>
        <Form.Select
          label='Talent type'
          name='verticalId'
          width='full'
          required
          data-testid='TurnIntoTalent-vertical'
          options={verticalOptions}
        />
        <Form.Input
          label='Full name'
          name='fullName'
          required
          width='full'
          data-testid='TurnIntoTalent-fullName'
        />
        <Form.Input
          label='Details'
          name='comment'
          required
          width='full'
          multiline
          rows={4}
          data-testid='TurnIntoTalent-comment'
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='TurnIntoTalent-submit'
        >
          Turn Into Talent
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default TurnIntoTalentForm
