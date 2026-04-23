import React, { ReactNode, ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { CallDirection } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CallTableRow from '.'

jest.mock('../EditableCallPurposeCell/data', () => ({
  __esModule: true,
  useUpdateCallPurpose: () => [() => {}],
  getCallPurposesOptionsHook: () => () => ({
    request: jest.fn(),
    data: [],
    loading: false
  }),
  getCallValuesHook: () => () => ({
    request: jest.fn(),
    data: {
      purpose: 'somePurpose'
    },
    loading: false,
    called: false
  })
}))

jest.mock('@staff-portal/communication/src/components/StartCallLink', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='start-call-link'>{children}</div>
  )
}))

jest.mock('../UserField/data', () => ({
  __esModule: true,
  useGetCallCounterpartyNameValue: () => () => ({
    request: jest.fn(),
    data: 'some fullName',
    loading: false,
    called: false
  }),
  useUpdateCallCounterparty: () => [jest.fn()]
}))

const arrangeTest = (props: ComponentProps<typeof CallTableRow>) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <CallTableRow {...props} />
        </tbody>
      </table>
    </TestWrapper>
  )

jest.mock('../CallActionsCell/data', () => ({
  __esModule: true,
  useToggleCallDismissed: () => [() => {}, { loading: false }]
}))

describe('CallTableRow', () => {
  describe('when all necessary data to display a section is returned', () => {
    it('displays content', () => {
      arrangeTest({
        call: {
          createdAt: '2020-07-21',
          direction: CallDirection.INBOUND,
          duration: 123,
          id: 'qwe',
          isMissed: false,
          isUnfilled: false,
          isDismissed: false,
          recordings: [],
          counterparty: {
            phoneNumber: '+12345678901',
            fullName: 'John Doe'
          },
          purpose: 'Main Purpose',
          customPurpose: 'Custom Purpose'
        }
      })

      expect(screen.getByTestId('table-row')).toBeInTheDocument()

      expect(screen.getByTestId('table-row-date')).toHaveTextContent(
        '2020-07-21'
      )

      expect(screen.getByTestId('table-row-time')).toHaveTextContent(
        '2020-07-21'
      )

      expect(screen.getByTestId('table-row-type')).toHaveTextContent('Incoming')

      expect(screen.getByTestId('table-row-user')).toHaveTextContent('John Doe')

      expect(screen.getByTestId('start-call-link')).toHaveTextContent(
        '+12345678901'
      )

      expect(screen.getByTestId('table-row-purpose')).toHaveTextContent(
        'Main Purpose'
      )

      expect(screen.getByTestId('table-row-duration')).toHaveTextContent(
        '02:03'
      )
    })
  })
})
