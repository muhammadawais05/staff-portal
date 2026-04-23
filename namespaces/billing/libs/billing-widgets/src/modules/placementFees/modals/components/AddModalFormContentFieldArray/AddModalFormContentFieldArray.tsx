import { Button, Grid, Trash16 } from '@toptal/picasso'
import { FinalField, FieldArray } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, SyntheticEvent, memo } from 'react'
import {
  composeValidators,
  futureDate,
  positiveNumber,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  onBlurToFloatNumber,
  onChangeToFloatNumber
} from '@staff-portal/billing/src/_lib/form/handlers'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormInput from '@staff-portal/billing/src/components/FormInput'
import FormInputDatePicker from '@staff-portal/billing/src/components/FormInputDatePicker'

import * as S from './styles'

const displayName = 'AddModalFormContentFieldArray'

interface Props {
  autoFocusDatepicker: boolean
  isInline?: boolean
}

const CircularButton = Button.Circular

const AddModalFormContentFieldArray: FC<Props> = memo(
  ({ autoFocusDatepicker, isInline }) => {
    const { t: translate } = useTranslation('placementFees')
    const { modalContainer } = useExternalIntegratorContext()
    const icon = <span>$</span>

    return (
      <FieldArray name='installments'>
        {({ fields }) => {
          const handleOnRemove = (e: SyntheticEvent<HTMLButtonElement>) => {
            const value = e.currentTarget.value

            fields.remove(Number(value))
          }

          // @ts-expect-error fields length
          const trashIconColor = fields.length > 1 ? 'red' : 'light-grey'

          return fields.map((name, index) => (
            <Grid
              direction='row'
              key={name}
              spacing={16}
              alignItems={isInline ? 'flex-start' : 'flex-end'}
            >
              <Grid.Item small={5}>
                <FinalField
                  component={FormInputDatePicker}
                  inputProps={{
                    autoFocus: autoFocusDatepicker,
                    minDate: getCurrentDayAsJSDate(),
                    popperContainer: modalContainer
                  }}
                  label={translate('AddModal.fields.dueDate.label')}
                  name={`${name}.dueDate`}
                  required
                  testId={`${name}.dueDate`}
                  validate={composeValidators(required, futureDate)}
                />
              </Grid.Item>
              <Grid.Item small={6}>
                <FinalField
                  component={FormInput}
                  handleOnBlur={onBlurToFloatNumber}
                  handleOnChange={onChangeToFloatNumber}
                  inputProps={{
                    icon,
                    placeholder: '0.00'
                  }}
                  label={translate('AddModal.fields.amount.label')}
                  name={`${name}.amount`}
                  required
                  testId={`${name}.amount`}
                  validate={composeValidators(required, positiveNumber)}
                />
              </Grid.Item>
              <Grid.Item small={1}>
                <CircularButton
                  css={S.trashButton}
                  data-testid='deleteInstallmentBtn'
                  disabled={fields.length === 1}
                  icon={<Trash16 color={trashIconColor} />}
                  onClick={handleOnRemove}
                  value={index}
                  variant='flat'
                />
              </Grid.Item>
            </Grid>
          ))
        }}
      </FieldArray>
    )
  }
)

AddModalFormContentFieldArray.displayName = displayName

export default AddModalFormContentFieldArray
