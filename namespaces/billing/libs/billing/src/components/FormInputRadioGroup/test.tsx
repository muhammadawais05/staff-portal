import { FinalForm } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React, { ComponentProps } from 'react'

import FormInputRadioGroup from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof FormInputRadioGroup>) =>
  renderComponent(
    <FinalForm onSubmit={noop}>
      {() => <FormInputRadioGroup {...props} />}
    </FinalForm>
  )

const options = [
  {
    label: 'Radio 1',
    value: '1'
  },
  {
    label: 'Radio 2',
    value: '2'
  }
]

describe('FormInputRadioGroup', () => {
  it('renders options for Radio Buttons', () => {
    const { queryByText, queryByTestId } = render({
      input: { name: 'radio' },
      meta: { error: undefined, touched: true },
      options,
      testId: 'radio'
    })

    const firstRadio = queryByText(options[0].label)
    const secondRadio = queryByText(options[1].label)
    const formField = queryByTestId('radio-field')

    expect(formField).not.toBeNull()
    expect(firstRadio).not.toBeNull()
    expect(secondRadio).not.toBeNull()
  })
})
