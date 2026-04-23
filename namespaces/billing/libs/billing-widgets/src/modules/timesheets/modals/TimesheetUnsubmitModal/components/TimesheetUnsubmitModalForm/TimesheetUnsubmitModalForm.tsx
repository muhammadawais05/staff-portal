import { Container, Modal, Notification } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import TimesheetModalTitle from '../../../components/TimesheetModalTitle'
import { SetTimesheetUnsubmitMutationVariables } from '../../data/setTimesheetUnsubmit.graphql.types'

const displayName = 'TimesheetUnsubmitModalForm'

interface Props {
  billingCycle: BillingCycleItemFragment
  initialValues: SetTimesheetUnsubmitMutationVariables
  handleOnSubmit: (values: SetTimesheetUnsubmitMutationVariables) => void
}

const TimesheetUnsubmitModalForm: FC<Props> = memo<Props>(
  ({ billingCycle, initialValues, handleOnSubmit }) => {
    const { t: translate } = useTranslation('timesheet')
    const { timesheetExtraHours } = billingCycle

    return (
      <Form<SetTimesheetUnsubmitMutationVariables>
        data-testid={displayName}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      >
        <TimesheetModalTitle timesheet={billingCycle}>
          {translate('UnsubmitTimesheet.title')}
        </TimesheetModalTitle>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Container bottom={2}>
            <Notification data-testid={`${displayName}-warning`}>
              {translate(
                `UnsubmitTimesheet.${
                  timesheetExtraHours ? 'warningExtraHours' : 'warning'
                }` as const
              )}
            </Notification>
          </Container>
          <Form.Input
            autoFocus
            data-testid='comment'
            multiline
            name='comment'
            placeholder={translate(
              'UnsubmitTimesheet.form.comment.placeholder'
            )}
            required
            rowsMin={4}
            width='full'
          />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('UnsubmitTimesheet.actions.unsubmit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

TimesheetUnsubmitModalForm.displayName = displayName

export default TimesheetUnsubmitModalForm
