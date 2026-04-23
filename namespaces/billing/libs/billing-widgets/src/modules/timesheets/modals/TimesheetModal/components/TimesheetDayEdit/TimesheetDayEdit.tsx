import { FormSpy, FinalField } from '@toptal/picasso-forms'
import { Container, Form, Typography } from '@toptal/picasso'
import React, { FC, memo, useState } from 'react'
import { at } from 'lodash-es'

import { Error } from './Error'
import * as S from './styles'
import {
  UseCallbackDayEditHandleOnBlur,
  UseCallbackDayEditHandleOnChange,
  UseCallbackDayEditHandleOnFocus,
  timesheetInputEmptyValue
} from '../../../../utils/timesheet'

const displayName = 'TimesheetDayEdit'

interface Props {
  autoFocusHours: boolean
  disabled?: boolean
  fieldName: string
  handleOnBlur: UseCallbackDayEditHandleOnBlur
  handleOnChange: UseCallbackDayEditHandleOnChange
  handleOnFocus: UseCallbackDayEditHandleOnFocus
}

export const handleOnSelect: React.MouseEventHandler<HTMLInputElement> =
  event => {
    event.currentTarget.select()
  }

const TimesheetDayEdit: FC<Props> = memo<Props>(
  ({
    autoFocusHours,
    disabled,
    fieldName,
    handleOnBlur,
    handleOnChange,
    handleOnFocus
  }) => {
    const baseProps = {
      disabled,
      maxLength: 2,
      min: '0',
      pattern: '[0-9]{2}',
      placeholder: timesheetInputEmptyValue,
      step: '1',
      type: 'tel'
    }
    const [fakeInputFocus, setFakeInputFocus] = useState(false)

    return (
      <FormSpy
        subscription={{ errors: true }}
        render={({ errors }) => {
          return (
            <Form.Field>
              <Container
                css={S.fakeInput({
                  isDisabled: disabled,
                  isError: !!at(errors, fieldName)[0],
                  isFocus: fakeInputFocus
                })}
                alignItems='center'
                flex
                justifyContent='center'
              >
                <FinalField name={`${fieldName}.hours`}>
                  {({ input: { name, value, onBlur, onChange, onFocus } }) => {
                    return (
                      <input
                        css={S.inputHr(disabled)}
                        {...baseProps}
                        data-testid='hours'
                        data-lpignore='true'
                        max='24'
                        name={name}
                        autoFocus={autoFocusHours}
                        onClick={handleOnSelect}
                        onBlur={handleOnBlur(
                          onChange,
                          onBlur,
                          setFakeInputFocus
                        )}
                        onChange={handleOnChange(onChange)}
                        onFocus={handleOnFocus(onFocus, setFakeInputFocus)}
                        value={value}
                      />
                    )
                  }}
                </FinalField>

                <Typography css={S.divider} forwardedAs='div' color='black'>
                  :
                </Typography>

                <FinalField name={`${fieldName}.minutes`}>
                  {({ input: { name, value, onBlur, onChange, onFocus } }) => {
                    return (
                      <input
                        css={S.inputMin(disabled)}
                        {...baseProps}
                        data-testid='minutes'
                        data-lpignore='true'
                        max='59'
                        name={name}
                        onClick={handleOnSelect}
                        onBlur={handleOnBlur(
                          onChange,
                          onBlur,
                          setFakeInputFocus
                        )}
                        onChange={handleOnChange(onChange)}
                        onFocus={handleOnFocus(onFocus, setFakeInputFocus)}
                        value={value}
                      />
                    )
                  }}
                </FinalField>
              </Container>

              <Error name={`${fieldName}.hours`} />
              <Error name={`${fieldName}.minutes`} />
            </Form.Field>
          )
        }}
      />
    )
  }
)

TimesheetDayEdit.displayName = displayName

export default TimesheetDayEdit
