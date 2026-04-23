import { fireEvent, render } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import FormClaimerSelect, { Props } from './FormClaimerSelect'
import { useGetTalentMatchers } from './data'

jest.mock('./data', () => ({
  __esModule: true,
  useGetTalentMatchers: jest.fn(() => null)
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <FormClaimerSelect {...({} as Props)} />
      </Form>
    </TestWrapper>
  )

describe('FormClaimerSelect', () => {
  it('renders select component with claimer options', () => {
    const mockedUseGetTalentMatchers = useGetTalentMatchers as jest.Mock

    mockedUseGetTalentMatchers.mockReturnValue({
      data: {
        roles: {
          nodes: [
            {
              id: 'role-id-1',
              fullName: 'Alex Sevilla',
              teams: {
                nodes: [
                  {
                    id: 'team-id',
                    name: 'Developer Matchers'
                  }
                ]
              }
            },
            {
              id: 'role-id-2',
              fullName: 'Alex Vaziri',
              teams: {
                nodes: []
              }
            },
            {
              id: 'role-id-3',
              fullName: 'Timofei Kachalov'
            }
          ]
        }
      }
    })

    const { container, getByText } = arrangeTest()
    const selectInput = container.getElementsByTagName('INPUT')[0]

    fireEvent.click(selectInput)

    expect(getByText('Alex Sevilla (Developer Matchers)')).toBeInTheDocument()
    expect(getByText('Alex Vaziri')).toBeInTheDocument()
    expect(getByText('Timofei Kachalov')).toBeInTheDocument()
  })
})
