import { FinalForm, FORM_ERROR } from '@toptal/picasso-forms'
import React, { ComponentProps, ReactNode } from 'react'
import { noop } from '@toptal/picasso/utils'

import FormBaseErrorContainer from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof FormBaseErrorContainer>,
  onSubmit = noop
) =>
  renderComponent(
    <FinalForm onSubmit={onSubmit}>
      {formRenderProps => (
        <form onSubmit={formRenderProps.handleSubmit}>
          <FormBaseErrorContainer {...props}>{children}</FormBaseErrorContainer>
          <button type='submit'>Submit</button>
        </form>
      )}
    </FinalForm>
  )

describe('FormBaseErrorContainer', () => {
  it('base error', () => {
    const { container, getByTestId } = render(null, {}, () => ({
      [FORM_ERROR]: 'example base form error'
    }))

    container.querySelector('button')?.click()

    expect(getByTestId('FormBaseErrorContainer-error')).toHaveTextContent(
      'example base form error'
    )
  })

  it('field error', () => {
    const { container, getByTestId } = render(
      null,
      { fieldErrorKeys: ['test'] },
      () => ({ test: 'example field form error' })
    )

    container.querySelector('button')?.click()

    expect(getByTestId('FormBaseErrorContainer-error')).toHaveTextContent(
      'example field form error'
    )
  })

  it('no errors', () => {
    const { container } = render(null, {})

    expect(container).toMatchSnapshot()
  })
})
