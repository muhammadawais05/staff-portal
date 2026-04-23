import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import YesOrNoDropdown from '.'
import { YesNoDropdownValue } from '../../config'

jest.mock('../EditableField')
jest.mock('./components', () => jest.fn())

describe('YesOrNoDropdown', () => {
  it('renders yes or no editable select', () => {
    const value = Number(false)
    const disabled = false

    render(
      <YesOrNoDropdown
        disabled={disabled}
        name='name'
        onChange={() => {}}
        value={value}
        queryValue={() => ({
          data: value,
          loading: false,
          request: () => {},
          error: undefined
        })}
      />
    )

    expect(screen.getByTestId('EditableField-name')).toBeInTheDocument()
    expect(screen.getByTestId('EditableField-name-value')).toHaveTextContent(
      `${value}`
    )
    expect(screen.getByTestId('EditableField-name-viewer')).toHaveTextContent(
      YesNoDropdownValue.NO
    )
    expect(screen.getByTestId('EditableField-name-disabled')).toHaveTextContent(
      `${disabled}`
    )
  })
})
