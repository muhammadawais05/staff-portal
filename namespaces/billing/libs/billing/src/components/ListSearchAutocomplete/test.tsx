import React, { ComponentProps } from 'react'

import ListSearchAutocomplete from '.'
import renderComponent from '../../utils/tests'

const mockShowError = jest.fn()
const mockShowSuccess = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({
    showError: mockShowError,
    showSuccess: mockShowSuccess
  })
}))

const render = (props: ComponentProps<typeof ListSearchAutocomplete>) =>
  renderComponent(<ListSearchAutocomplete {...props} />)

// eslint-disable-next-line
describe.skip('ListSearchAutocomplete', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      searchBarCategories: [{ name: 'test' }],
      nestableControls: <span>'test'</span>
    })

    expect(mockShowError).toHaveBeenCalledTimes(0)

    expect(queryByTestId('ListSearchAutocomplete')).toBeInTheDocument()
  })
})
