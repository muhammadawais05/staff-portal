import { Button, Container, Helpbox, Modal, Typography } from '@toptal/picasso'
import { FinalField, FormRenderProps } from '@toptal/picasso-forms'
import { Trans, useTranslation } from 'react-i18next'
import { camelCase } from 'lodash-es'
import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react'
import { EngagementCommitmentEnum, Maybe } from '@staff-portal/graphql/staff'
import {
  useExternalIntegratorContext,
  FormBaseErrorContainer,
  FormInputCheckbox,
  FormInputDatePicker,
  FormInputSelect,
  FormInput,
  ModalFooter,
  isDefaultRateMethod,
  isLegacyRateMethod,
  isRateMethodOverride,
  shouldDisplayDiscountTierRateFields,
  getCommitmentOptions,
  PaymentsRatesTableValues
} from '@staff-portal/billing'

import { getRateMethodOptions } from './utils'
import CommitmentChangeModalFormTable from '../CommitmentChangeModalFormTable'

const displayName = 'CommitmentChangeModalForm'

export interface CommitmentChangeModalFormValues
  extends PaymentsRatesTableValues {
  canBeDiscounted: boolean
  changeDate: string
  commitment: EngagementCommitmentEnum
  defaultFullTimeDiscount?: string
  defaultMarkup?: string
  defaultPartTimeDiscount?: string
  defaultUpcharge?: string
  discountMultiplier?: string
  engagementId: string
  notifyCompany?: boolean
  notifyTalent?: boolean
  overrideReason?: string
}

interface Props {
  finalFormProps: FormRenderProps<CommitmentChangeModalFormValues>
  job?: Maybe<{
    title: string
  }>
}

export const CommitmentChangeModalForm: FC<Props> = memo(
  ({
    finalFormProps: {
      handleSubmit,
      form: { getState, change }
    },
    job
  }) => {
    const { t: translate } = useTranslation('commitment')
    const {
      submitting,
      values: {
        defaultMarkup,
        markup,
        rateMethod,
        rateOverrideReason,
        defaultPartTimeDiscount,
        defaultFullTimeDiscount
      }
    } = getState()

    const [newRateMethod, setNewRateMethod] = useState(rateMethod || 'default')
    const { modalContainer } = useExternalIntegratorContext()

    const changeCommitmentOptions = useCallback(getCommitmentOptions, [
      translate
    ])

    const handleChange =
      (onChange: (val: string) => void) =>
      (event: SyntheticEvent<HTMLSelectElement>): void => {
        const { value } = event.target as HTMLSelectElement

        setNewRateMethod(camelCase(value))
        onChange(value)
      }

    const showOverrideReason = isRateMethodOverride(newRateMethod)
    const displayDiscountTierRateFields =
      shouldDisplayDiscountTierRateFields(newRateMethod)

    const resetMarkupAndDiscounts = useCallback(() => {
      if (!displayDiscountTierRateFields || isDefaultRateMethod(rateMethod)) {
        change('markup', `${Number(defaultMarkup)}`)
        change('partTimeDiscount', `${Number(defaultPartTimeDiscount)}`)
        change('fullTimeDiscount', `${Number(defaultFullTimeDiscount)}`)
      }
    }, [
      change,
      defaultFullTimeDiscount,
      defaultMarkup,
      defaultPartTimeDiscount,
      displayDiscountTierRateFields,
      rateMethod
    ])

    return (
      <form data-testid={displayName} onSubmit={handleSubmit}>
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('changeModal.title')}

          <FormBaseErrorContainer top={1} bottom={0} />
        </Modal.Title>

        <Modal.Content>
          <Typography
            data-testid={`${displayName}-job-title`}
            size='medium'
            variant='heading'
          >
            {job?.title}
          </Typography>
          <Container bottom={2} top={2}>
            <Typography size='medium' data-testid={`${displayName}-note`}>
              <Trans>{translate('changeModal.note.text')}</Trans>
            </Typography>
          </Container>
          <Container bottom={2} top={2}>
            <Helpbox variant='red'>
              <Helpbox.Title>
                {translate('changeModal.warning.title')}
              </Helpbox.Title>
              <Helpbox.Content>
                {translate('changeModal.warning.text')}
              </Helpbox.Content>
            </Helpbox>
          </Container>
          <FinalField
            component={FormInputSelect}
            inputProps={{
              options: changeCommitmentOptions(),
              popperContainer: modalContainer
            }}
            label={translate('changeModal.form.fields.commitment.label')}
            name='commitment'
            testId='commitment'
          />
          <FinalField
            component={FormInputDatePicker}
            inputProps={{
              popperContainer: modalContainer
            }}
            label={translate('changeModal.form.fields.changeDate.label')}
            name='changeDate'
            required
            testId='changeDate'
          />

          <FinalField
            component={FormInputSelect}
            inputProps={{
              options: getRateMethodOptions(isLegacyRateMethod(rateMethod)),
              popperContainer: modalContainer
            }}
            handleOnChange={handleChange}
            hint={
              isLegacyRateMethod(newRateMethod) &&
              translate('changeModal.form.fields.rateMethod.hint')
            }
            label={translate('changeModal.form.fields.rateMethod.label')}
            initialValue='default'
            name='rateMethod'
            testId='rateMethod'
            required
            value={newRateMethod}
          />

          {showOverrideReason && (
            <FinalField
              component={FormInput}
              label={translate('changeModal.form.fields.overrideReason.label')}
              name='rateOverrideReason'
              testId='rateOverrideReason'
              required
              value={rateOverrideReason}
            />
          )}

          {displayDiscountTierRateFields && (
            <FinalField
              component={FormInput}
              inputProps={{
                disabled: isDefaultRateMethod(rateMethod),
                icon: <span>$</span>,
                type: 'number'
              }}
              label={translate('changeModal.form.fields.markup.label')}
              name='markup'
              testId='markup'
              required
              value={markup}
            />
          )}

          <CommitmentChangeModalFormTable
            rateMethodSelected={newRateMethod}
            onRateMethodChange={resetMarkupAndDiscounts}
          />

          <FinalField
            component={FormInputCheckbox}
            label={translate('changeModal.form.fields.notifyTalent.label')}
            name='notifyTalent'
            testId='notifyTalent'
            type='checkbox'
          />
          <FinalField
            component={FormInputCheckbox}
            label={translate('changeModal.form.fields.notifyCompany.label')}
            name='notifyCompany'
            testId='notifyCompany'
            type='checkbox'
          />
        </Modal.Content>
        <ModalFooter>
          <Button
            data-testid='submit'
            disabled={submitting}
            loading={submitting}
            type='submit'
            variant='positive'
          >
            {translate('changeModal.form.actions.submit')}
          </Button>
        </ModalFooter>
      </form>
    )
  }
)

CommitmentChangeModalForm.displayName = displayName

export default CommitmentChangeModalForm
