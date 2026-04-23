import React, { ComponentProps } from 'react'

import { convertToJSDate } from '../../_lib/dateTime'
import FormInputDatePicker from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof FormInputDatePicker>) =>
  renderComponent(<FormInputDatePicker {...props} />)

jest.mock('../../_lib/context/userContext', () => ({
  useUserContext: () => ({
    datepickerDisplayDateFormat: 'yyyy-MM-dd',
    datepickerEditDateFormat: 'yyyy-MM-dd',
    weekStartsOn: 1
  })
}))

describe('FormInputDatePicker', () => {
  it('default render', () => {
    const { container } = render({
      input: {
        name: 'foo',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onFocus: jest.fn(),
        value: convertToJSDate('2015-05-05')
      },
      meta: { error: undefined, touched: true }
    })

    expect(container).toMatchSnapshot()
  })
})
