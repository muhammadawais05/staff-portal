import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'

import { useGetCountries } from '../../data'
import EditableCountry from '.'

jest.mock('@staff-portal/editable', () => ({
  EditableWrapper: (props: { children: ReactNode }) => {
    return (
      <div data-testid='EditableWrapper'>
        {props.children}
        <div>
          <div data-testid='EditableWrapper-cancel' />
          <div data-testid='EditableWrapper-submit' />
        </div>
      </div>
    )
  }
}))

jest.mock('../../data', () => ({
  useGetCountries: jest.fn()
}))

jest.mock('../../components', () => ({
  CountryCityFields: (props: Record<string, string>) => (
    <div data-testid={props['data-testid'] || 'CountryCityFields'}>
      {JSON.stringify(props)}
    </div>
  )
}))

const mockUseGetCountries = useGetCountries as jest.Mock

describe('EditableCountry', () => {
  beforeEach(() => {
    mockUseGetCountries.mockReturnValue({
      countries: [],
      loading: false
    })
  })

  it('renders form country input', () => {
    render(<EditableCountry name='test' placeholder='test' options={[]} />)

    const input = screen.getByTestId('EditableCountry')

    expect(input).toBeInTheDocument()
    expect(input).toHaveTextContent('"countries":[]')
    expect(input).toHaveTextContent('"placeholder":"test"')

    expect(screen.getByTestId('EditableWrapper')).toBeInTheDocument()
    expect(screen.getByTestId('EditableWrapper-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('EditableWrapper-submit')).toBeInTheDocument()
  })
})
