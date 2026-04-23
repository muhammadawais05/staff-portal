import {
  Button,
  Container,
  Grid,
  Helpbox,
  Modal,
  Typography
} from '@toptal/picasso'
import {
  ExternallyChanged,
  FinalField,
  FormRenderProps
} from '@toptal/picasso-forms'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { FC, SyntheticEvent, memo } from 'react'
import {
  BillCycle,
  ChangeProductBillingFrequencyInput,
  Scalars,
  WeekDay
} from '@staff-portal/graphql/staff'
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
import FormInputDatePicker from '@staff-portal/billing/src/components/FormInputDatePicker'
import FormInputSelect from '@staff-portal/billing/src/components/FormInputSelect/FormInputSelect'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { getBillCycleOptions } from '@staff-portal/billing/src/utils'

import isBillingCycleTooLong from './isBillingCycleTooLong'

const displayName = 'BillingCycleSettingsModalForm'

interface Props {
  formProps: FormRenderProps<ChangeProductBillingFrequencyInput>
  autoConsolidationEnabled?: boolean
  semiMonthlyPaymentTalentAgreement?: boolean
  netTerms?: number
  currentCycleStartDate?: Scalars['Date']
}

export const BillingCycleSettingsModalForm: FC<Props> = memo(
  ({
    formProps: { handleSubmit, form },
    semiMonthlyPaymentTalentAgreement,
    autoConsolidationEnabled,
    netTerms,
    currentCycleStartDate
  }) => {
    const { t: translate } = useTranslation('billingCycleSettings')
    const { modalContainer } = useExternalIntegratorContext()
    const { weekStartsOn } = useUserContext()
    const {
      submitting,
      values: { billCycle, billDay, currentCycleEndDate }
    } = form.getState()
    const isBillCycleMonthBased = [
      BillCycle.SEMI_MONTHLY,
      BillCycle.MONTHLY
    ].includes(billCycle)
    const handleBillDayChange =
      (handleFinalFormOnChange: (value: string) => void) =>
      (event: SyntheticEvent<HTMLSelectElement>): void => {
        const { value } = event.target as HTMLSelectElement

        form.change('currentCycleEndDate', undefined)
        handleFinalFormOnChange(value)
      }

    const handleCycleEndDateChange = (
      handleFinalFormOnChange: (value: string) => void,
      adjustedValue: Scalars['Date']
    ) => {
      if (isValid(adjustedValue)) {
        form.change(
          'billDay',
          getDayNameForDate(
            getISODay(adjustedValue, 1)
          ).toUpperCase() as WeekDay
        )
      }
      handleFinalFormOnChange(formatDateURL(adjustedValue))
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
      <form data-testid={displayName} onSubmit={handleSubmit}>
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('updateModal.title')}
        </Modal.Title>
        <Modal.Content data-testid={`${displayName}-content`}>
          <FormBaseErrorContainer />
          {isBillingCycleTooLong(
            currentCycleStartDate,
            currentCycleEndDate
          ) && (
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
                  {translate(
                    'updateModal.warnings.noSemiMonthlyTalentAgreement'
                  )}
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
        </Modal.Content>

        <ModalFooter data-testid={`${displayName}-footer`}>
          <Button
            disabled={submitting}
            loading={submitting}
            type='submit'
            variant='positive'
            data-testid='submit'
          >
            {translate('updateModal.form.actions.submit')}
          </Button>
        </ModalFooter>
      </form>
    )
  }
)

BillingCycleSettingsModalForm.displayName = displayName

export default BillingCycleSettingsModalForm
