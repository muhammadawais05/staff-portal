import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Modal, Typography, Tooltip } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { UpdateClientCommitmentInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import * as S from './styles'

interface Props {
  handleOnSubmit: (input: UpdateClientCommitmentInput) => void
  initialValues: Pick<UpdateClientCommitmentInput, 'comment' | 'minimumHours'>
  title: string
}

const displayName = 'MinimumCommitmentModalForm'

const minimumHoursOption = [
  {
    text: '0',
    value: 0
  },
  {
    text: '5',
    value: 5
  }
]

const MinimumCommitmentModalForm = ({
  handleOnSubmit,
  initialValues,
  title
}: Props) => {
  const { t: translate } = useTranslation('billingDetails')
  const { modalContainer } = useExternalIntegratorContext()

  return (
    <Form<UpdateClientCommitmentInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container
          direction='row'
          flex
          justifyContent='flex-start'
          css={S.minimumHoursRow}
        >
          <Tooltip
            interactive
            content={translate(
              'modals.minimumCommitmentEdit.fields.minimumHours.info'
            )}
          >
            <span>
              <Form.Select
                autoFocus
                css={S.minimumHoursField}
                data-testid={`${displayName}-minimum-hours`}
                label={translate(
                  'modals.minimumCommitmentEdit.fields.minimumHours.label'
                )}
                name='minimumHours'
                options={minimumHoursOption}
                popperContainer={modalContainer}
                required
                width='full'
              />
            </span>
          </Tooltip>
          <Typography
            size='medium'
            css={S.hoursAddon}
            data-testid={`${displayName}-minimum-hours-addon`}
          >
            {translate('modals.minimumCommitmentEdit.fields.minimumHours.hint')}
          </Typography>
        </Container>
        <Form.Input
          multiline
          rowsMin={4}
          width='full'
          name='comment'
          data-testid={`${displayName}-comment`}
          label={translate('modals.minimumCommitmentEdit.fields.comment.label')}
          required
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('modals.minimumCommitmentEdit.actions.edit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

MinimumCommitmentModalForm.displayName = displayName

export default MinimumCommitmentModalForm
