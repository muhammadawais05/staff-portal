import React from 'react'
import { Form, useFormState, useForm } from '@toptal/picasso-forms'
import { Select } from '@toptal/picasso'
import { Call } from '@staff-portal/graphql/staff'
import { EditorProps } from '@staff-portal/editable'

import useCallPurposesOptions from '../../hooks/use-call-purposes-options'
import { PurposesListItemFragment } from '../EditableCallPurposeCell/data/get-purposes-options/purposes-list-item-fragment.staff.gql.types'

const MENU_WIDTH = '200px'

const CallPurposeForm = ({
  options = []
}: EditorProps<Call, Call['purpose'], PurposesListItemFragment[]>) => {
  const formState = useFormState()
  const [currentValue, optionsArr] = useCallPurposesOptions(options)
  const { submit, change } = useForm()
  const handleOnChange = async (
    ev: React.ChangeEvent<{
      name?: string | undefined
      value: string | number
    }>
  ) => {
    change(
      'purpose',
      optionsArr.find(
        option =>
          option.text === ev.target.value || option.value === ev.target.value
      )?.value
    )

    if (!ev.target.value || ev.target.value === 'other') {
      return
    }

    await submit()
  }

  return (
    <>
      <Select
        value={currentValue}
        options={optionsArr}
        onChange={handleOnChange}
        disabled={formState.submitting}
        data-testid='select-purpose'
        size='small'
        menuWidth={MENU_WIDTH}
        width='full'
        enableReset
      />
      {currentValue === 'other' && (
        <>
          <Form.Input
            data-testid='text-input-purpose'
            name='customPurpose'
            disabled={formState.submitting}
            required={formState.values.purpose === 'other'}
            size='small'
            width='full'
          />
          <Form.SubmitButton
            data-testid='button-input-purpose'
            fullWidth
            size='small'
            variant='positive'
          >
            Save Purpose
          </Form.SubmitButton>
        </>
      )}
    </>
  )
}

export default CallPurposeForm
