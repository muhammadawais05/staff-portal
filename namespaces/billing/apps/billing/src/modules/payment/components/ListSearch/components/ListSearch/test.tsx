import { renderHook } from '@testing-library/react-hooks'
import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { getKey, getOptionKey, renderOption } from './searchAutocompleteConfig'
import ListSearch from '.'

jest.mock('@apollo/client')

jest.mock('../../data', () => ({
  useGetRolesQuery: jest.fn().mockReturnValue({
    data: undefined,
    loading: false
  })
}))

const renderListSearch = (
  children: ReactNode,
  props: ComponentProps<typeof ListSearch>
) => renderComponent(<ListSearch {...props}>{children}</ListSearch>)

describe('ListSearch', () => {
  // eslint-disable-next-line
  test.skip('default render', () => {
    const { container } = renderListSearch(null, {})

    expect(container).toMatchSnapshot()
  })

  // eslint-disable-next-line
  test.skip('helpers', () => {
    expect(getKey({ id: '123' })).toBe('123')
    expect(getOptionKey({})).toBe('')
    expect(getOptionKey({ node: {} })).toBe('')
    expect(getOptionKey({ node: { id: '123' } })).toBe('123')
  })

  // eslint-disable-next-line
  test.skip('renderOption', () => {
    const { result } = renderHook(() => renderOption({ nodeTypes: [] }))

    expect(result.current).toMatchSnapshot()

    const { result: withLabel } = renderHook(() =>
      renderOption({ label: '123', labelHighlight: '456', nodeTypes: [] })
    )

    expect(withLabel.current).toMatchSnapshot()
  })
})
