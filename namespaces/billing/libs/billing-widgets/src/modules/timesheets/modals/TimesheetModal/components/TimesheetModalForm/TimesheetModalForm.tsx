import { Modal } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import React, { FC, memo, useCallback } from 'react'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import i18n from '@staff-portal/billing/src/utils/i18n'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import {
  getTimesheetEditTotal,
  TimesheetEditFormInput,
  useCallbackDayEditHandleOnBlur,
  useCallbackDayEditHandleOnChange,
  useCallbackDayEditHandleOnFocus
} from '../../../../utils/timesheet'
import TimesheetDayList from '../TimesheetDayList'
import TimesheetJobTitle from '../TimesheetJobTitle'
import TimesheetMessage from '../TimesheetMessage'
import TimesheetModalFooter from '../../../components/TimesheetModalFooter'
import TimesheetRejectionComment from '../TimesheetRejectionComment'
import TimesheetSummary from '../TimesheetSummary'
import { SetTimesheetUpdateMutationVariables } from '../../data/setTimesheetUpdate.graphql.types'
import { getValidatorTimesheetEditForm } from '../../../../utils/validators'
import { SubmitButton } from './SubmitButton'

interface Props {
  initialValues: TimesheetModalFormInput
  timesheet: BillingCycleItemFragment
  handleOnSubmit: (values: SetTimesheetUpdateMutationVariables) => void
}

const displayName = 'TimesheetModalForm'

export type TimesheetModalFormInput = {
  billingCycleId: string
  timesheetComment: string
  timesheetRecords: TimesheetEditFormInput[]
  action: string
}

const TimesheetModalForm: FC<Props> = memo(
  ({ initialValues, timesheet, handleOnSubmit }) => {
    const { operations, timesheetSubmitted, breaksPeriod, endDate, startDate } =
      timesheet

    const { timesheetRecords } = initialValues

    const handleOnFocus = useCallback(useCallbackDayEditHandleOnFocus, [])
    const handleOnBlur = useCallback(useCallbackDayEditHandleOnBlur, [])
    const handleOnChange = useCallback(useCallbackDayEditHandleOnChange, [])

    const canSubmit =
      !timesheetSubmitted &&
      isOperationEnabled({ operations, key: 'timesheetSubmit' })

    return (
      <Form<TimesheetModalFormInput>
        data-testid={displayName}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validate={getValidatorTimesheetEditForm}
        keepDirtyOnReinitialize
      >
        <Modal.Content>
          <FormBaseErrorContainer />
          <TimesheetRejectionComment timesheet={timesheet} />
          <TimesheetMessage timesheet={timesheet} />
          <TimesheetJobTitle />
          <FormSpy subscription={{ values: true }}>
            {({ values }) => {
              const { hours, minutes } = getTimesheetEditTotal(
                values.timesheetRecords as TimesheetEditFormInput[]
              )

              return (
                <TimesheetSummary
                  hours={hours}
                  minutes={minutes}
                  isEdit
                  timesheet={timesheet}
                />
              )
            }}
          </FormSpy>
          <TimesheetDayList
            breaksArray={breaksPeriod}
            endDate={endDate}
            isEdit
            onEditDayBlur={handleOnBlur}
            onEditDayChange={handleOnChange}
            onEditDayFocus={handleOnFocus}
            startDate={startDate}
            timesheetRecords={timesheetRecords}
          />
        </Modal.Content>
        <TimesheetModalFooter>
          <SubmitButton
            action='updateTimesheet'
            data-testid='save'
            variant='primary'
          >
            {i18n.t(
              `timesheet:TimesheetEditForm.actions.${
                timesheetSubmitted ? 'save' : 'saveDraft'
              }`
            )}
          </SubmitButton>

          {canSubmit && (
            <SubmitButton
              action='submitTimesheet'
              useConfirmation
              data-testid='submit'
              variant='positive'
            >
              {i18n.t('common:actions.submit')}
            </SubmitButton>
          )}
        </TimesheetModalFooter>
      </Form>
    )
  }
)

TimesheetModalForm.displayName = displayName

export default TimesheetModalForm
