import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { ClaimTransferRefundInput } from '@staff-portal/graphql/staff'
import {
  amountCleanNumberValue,
  formatCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'
import {
  composeValidators,
  positiveNumber,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

interface Props {
  handleOnSubmit: (values: ClaimTransferRefundInput) => void
  initialValues: ClaimTransferRefundInput
}

const displayName = 'ClaimRefundForm'

const ClaimRefundForm = ({ initialValues, handleOnSubmit }: Props) => {
  const { t: translate } = useTranslation('transfers')

  return (
    <Form<ClaimTransferRefundInput>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('claimRefundForm.title')}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={2}>
          <Typography size='medium' data-testid={`${displayName}-intro`}>
            {translate('claimRefundForm.intro')}
          </Typography>
        </Container>
        <Form.Input
          autoComplete='off'
          autoFocus
          data-testid='refundAmount'
          format={formatCleanNumberValue}
          formatOnBlur
          icon={<ReferralBonus16 />}
          label={translate('claimRefundForm.fields.refundAmount.label')}
          name='refundAmount'
          parse={amountCleanNumberValue}
          placeholder='0.0'
          required
          validate={composeValidators(required, positiveNumber)}
          width='full'
        />
        <Form.Input
          data-testid='comment'
          label={translate('claimRefundForm.fields.comment.label')}
          multiline
          name='comment'
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='negative'>
          {translate('claimRefundForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

ClaimRefundForm.displayName = displayName

export default memo(ClaimRefundForm)
