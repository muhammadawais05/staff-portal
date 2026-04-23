import React, { FC, memo } from 'react'
import { Modal, Container, Alert } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { ChangeRoleReferrerInput, Maybe } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import ChangeRoleReferrerModalFormAutocomplete from '../ChangeRoleReferrerModalFormAutocomplete'

const displayName = 'ChangeRoleReferrerModalForm'

interface Props {
  canIssueSourcingCommission?: Maybe<boolean>
  handleOnSubmit: (values: ChangeRoleReferrerInput) => void
  roleHasReferrer?: boolean
}

const ChangeRoleReferrerModalForm: FC<Props> = memo<Props>(
  ({
    handleOnSubmit,
    canIssueSourcingCommission = false,
    roleHasReferrer = false
  }: Props) => {
    const { t: translate } = useTranslation('commission')

    return (
      <Form<ChangeRoleReferrerInput>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('modals.changeRoleReferrer.title')}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer fieldErrorKeys={['referrerId']} />
          {canIssueSourcingCommission && (
            <Container bottom='small'>
              <Alert data-testid={`${displayName}-notice`}>
                {translate('modals.changeRoleReferrer.form.fields.notice')}
              </Alert>
            </Container>
          )}
          <ChangeRoleReferrerModalFormAutocomplete
            autoFocus
            required={!roleHasReferrer}
          />
          <Form.Input
            data-testid={`${displayName}-comment`}
            label={translate(
              'modals.changeRoleReferrer.form.fields.comment.label'
            )}
            multiline
            name='comment'
            required
            rowsMin={4}
            width='full'
          />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton
            data-testid={`${displayName}-submit`}
            variant='positive'
          >
            {translate('modals.changeRoleReferrer.form.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

ChangeRoleReferrerModalForm.displayName = displayName

export default ChangeRoleReferrerModalForm
