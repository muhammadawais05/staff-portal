import React, { ComponentProps } from 'react'

import renderComponent from '../../utils/tests'
import FormInputAutocompleteRoleOption from '.'

const render = (
  props: ComponentProps<typeof FormInputAutocompleteRoleOption>
) => renderComponent(<FormInputAutocompleteRoleOption {...props} />)

describe('render', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      autocompleteItem: {
        labelHighlight: 'foo',
        label: 'test',
        node: {
          __typename: 'Client',
          id: 'MS1DbGllbnQtMjIzOTQ2',
          roleType: 'role',
          companyLegacyId: 12345
        },
        nodeTypes: ['top_level_company']
      }
    })

    expect(queryByTestId('AutocompleteHighlightOption')).toBeInTheDocument()
    expect(
      queryByTestId('FormInputAutocompleteRoleOption-role-info')?.innerHTML
    ).toBe('top_level_company #12345')
  })
})
