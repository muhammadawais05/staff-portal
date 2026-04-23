import { fireEvent, render } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'

import FormMatchingCallSelect, { Props } from './FormMatchingCallSelect'

jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <FormMatchingCallSelect {...props} />
      </Form>
    </TestWrapper>
  )

describe('FormMatchingCallSelect', () => {
  it('renders select component with matching call options', () => {
    const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

    mockedUseGetCurrentUser.mockReturnValue({
      user: {
        timeZone: {
          name: '',
          value: 'Europe/Warsaw'
        }
      }
    })

    const { container, getByText } = arrangeTest({
      meetings: [
        {
          id: 'meeting-id-1',
          scheduledAt: '2020-11-17T20:45:00+03:00',
          organizer: {
            id: 'organizer-id-1',
            fullName: 'Alex Sevilla'
          }
        },
        {
          id: 'meeting-id-2',
          scheduledAt: '2020-11-16T21:24:09+03:00',
          organizer: {
            id: 'organizer-id-2',
            fullName: 'Sydni Gurnett'
          }
        }
      ]
    } as unknown as Props)
    const selectInput = container.getElementsByTagName('INPUT')[0]

    fireEvent.click(selectInput)

    expect(
      getByText('Nov 17, 2020 at 5:45 PM - Alex Sevilla')
    ).toBeInTheDocument()
    expect(
      getByText('Nov 16, 2020 at 6:24 PM - Sydni Gurnett')
    ).toBeInTheDocument()
  })
})
