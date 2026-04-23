import { Container, Grid, Helpbox, Typography } from '@toptal/picasso'
import {
  ExternallyChanged,
  useFormState,
  FinalField,
  useForm
} from '@toptal/picasso-forms'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { FC, SyntheticEvent, memo } from 'react'
import { BillCycle, Scalars, WeekDay } from '@staff-portal/graphql/staff'
import {
  formatDateURL,
  getDayNameForDate,
  getDayNamesOfWeek,
  getISODay,
  isValid
} from '@staff-portal/billing/src/_lib/dateTime'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { useUserContext } from '@staff-portal/billing/src/_lib/context/userContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import FormInputDatePicker from '@staff-portal/billing/src/components/FormInputDatePicker/FormInputDatePicker'
import FormInputSelect from '@staff-portal/billing/src/components/FormInputSelect/FormInputSelect'
import { getBillCycleOptions } from '@staff-portal/billing/src/utils'

import isBillingCycleTooLong from '../../../billingCycleSettings/components/BillingCycleSettingsModalForm/isBillingCycleTooLong'

const displayName = 'BillingCyclesSettingsForm'

interface Props {
  autoConsolidationEnabled?: boolean
  semiMonthlyPaymentTalentAgreement?: boolean
  netTerms?: number
  currentCycleStartDate?: Scalars['Date']
}

const BillingCyclesSettingsForm: FC<Props> = memo<Props>(
  ({
    semiMonthlyPaymentTalentAgreement,
    autoConsolidationEnabled,
    netTerms,
    currentCycleStartDate
  }) => {
    const { t: translate } = useTranslation('billingCycleSettings')
    const { modalContainer } = useExternalIntegratorContext()
    const { weekStartsOn } = useUserContext()
    const { change } = useForm()
    const {
      values: { billCycle, billDay, currentCycleEndDate }
    } = useFormState()
    const isBillCycleMonthBased = [
      BillCycle.SEMI_MONTHLY,
      BillCycle.MONTHLY
    ].includes(billCycle)
    const handleBillDayChange =
      (handleOnChange: (value: string) => void) =>
      (event: SyntheticEvent<HTMLSelectElement>): void => {
        const { value } = event.target as HTMLSelectElement

        change('currentCycleEndDate', undefined)
        handleOnChange(value)
      }

    const handleCycleEndDateChange = (
      handleOnChange: (value: string) => void,
      adjustedValue: Scalars['Date']
    ) => {
      if (isValid(adjustedValue)) {
        change(
          'billDay',
          getDayNameForDate(
            getISODay(adjustedValue, 1)
          ).toUpperCase() as WeekDay
        )
      }
      handleOnChange(formatDateURL(adjustedValue))
    }

    const daysOfWeek = getDayNamesOfWeek({
      locale: 'en-US',
      version: 'long',
      weekStartsOn
    }).map(day => ({
      text: day,
      value: day.toUpperCase()
    }))

    return (
      <>
        <FormBaseErrorContainer />
        {isBillingCycleTooLong(currentCycleStartDate, currentCycleEndDate) && (
          <Container bottom={1}>
            <Helpbox variant='red'>
              <Helpbox.Content data-testid={`${displayName}-long-cycle`}>
                {translate('updateModal.warnings.cycleTooLong')}
              </Helpbox.Content>
            </Helpbox>
          </Container>
        )}
        {isBillCycleMonthBased && !semiMonthlyPaymentTalentAgreement && (
          <Container bottom={1}>
            <Helpbox variant='red'>
              <Helpbox.Content data-testid={`${displayName}-semi-monthly`}>
                {translate('updateModal.warnings.noSemiMonthlyTalentAgreement')}
              </Helpbox.Content>
            </Helpbox>
          </Container>
        )}
        {autoConsolidationEnabled && (
          <Container bottom={1}>
            <Helpbox variant='yellow'>
              <Helpbox.Content
                data-testid={`${displayName}-auto-consolidation`}
              >
                {translate('updateModal.warnings.autoConsolidationEnabled')}
              </Helpbox.Content>
            </Helpbox>
          </Container>
        )}
        {!isBillCycleMonthBased && (
          <ExternallyChanged name='billDay'>
            {(externallyChanged: boolean) =>
              externallyChanged &&
              billDay && (
                <Container bottom={1}>
                  <Helpbox variant='yellow'>
                    <Helpbox.Content
                      data-testid={`${displayName}-not-semi-monthly`}
                    >
                      {`${translate('updateModal.warnings.billDayChanged', {
                        day: upperFirst(billDay.toLowerCase())
                      })}`}
                    </Helpbox.Content>
                  </Helpbox>
                </Container>
              )
            }
          </ExternallyChanged>
        )}
        {netTerms && (
          <Container bottom={1.5} top={1.5}>
            <Grid>
              <Grid.Item>
                <Typography size='medium'>
                  {translate('updateModal.form.fields.netTerms.label')}
                </Typography>
              </Grid.Item>
              <Grid.Item>
                <Typography
                  size='medium'
                  weight='semibold'
                  data-testid={`${displayName}-net`}
                >
                  {`Net ${netTerms}`}
                </Typography>
              </Grid.Item>
            </Grid>
          </Container>
        )}
        <FinalField
          component={FormInputSelect}
          inputProps={{
            options: getBillCycleOptions(),
            popperContainer: modalContainer
          }}
          label={translate('updateModal.form.fields.billCycle.label')}
          name='billCycle'
          required
          testId='billCycle'
        />
        {!isBillCycleMonthBased && (
          <FinalField
            component={FormInputSelect}
            handleOnChange={handleBillDayChange}
            inputProps={{
              options: daysOfWeek,
              placeholder: translate(
                'updateModal.form.fields.billDay.placeholder'
              ),
              popperContainer: modalContainer
            }}
            label={translate('updateModal.form.fields.billDay.label')}
            name='billDay'
            required
            testId='billDay'
          />
        )}
        {currentCycleStartDate && !isBillCycleMonthBased && (
          <FinalField
            component={FormInputDatePicker}
            inputProps={{
              popperContainer: modalContainer
            }}
            handleOnChange={handleCycleEndDateChange}
            label={translate(
              'updateModal.form.fields.currentCycleEndDate.label'
            )}
            name='currentCycleEndDate'
            testId='currentCycleEndDate'
          />
        )}
      </>
    )
  }
)

BillingCyclesSettingsForm.displayName = displayName

export default BillingCyclesSettingsForm
