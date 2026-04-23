import React from 'react'
import FormInputAutocompleteRoleOption from '@staff-portal/billing/src/components/FormInputAutocompleteRoleOption'

import getRenderOption from './getRenderOption'

describe('#getRenderOption', () => {
  it('renders `FormInputAutocompleteRoleOption` properly', () => {
    const element = getRenderOption({
      text: 'exampleText',
      description: 'test'
    })

    expect(element).toEqual(
      <FormInputAutocompleteRoleOption
        autocompleteItem={{ description: 'test', text: 'exampleText' }}
      />
    )
  })
})
