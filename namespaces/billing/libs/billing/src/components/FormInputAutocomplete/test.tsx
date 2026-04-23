import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import renderComponent from '../../utils/tests'
import FormInputAutocomplete from '.'

const render = (props: ComponentProps<typeof FormInputAutocomplete>) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <FormInputAutocomplete {...props} />
    </Form>
  )

describe('FormInputAutocomplete', () => {
  it('default render', () => {
    const { getByTestId } = render({
      model: AutocompleteModels.QUICK_SEARCH,
      name: 'test',
      'data-testid': 'test-autocomplete',
      onChange: jest.fn(),
      onSelect: jest.fn()
    })

    expect(getByTestId('test-autocomplete')).toBeInTheDocument()
  })
})
