import React, { ComponentProps } from 'react'
import { Notes } from '@staff-portal/notes'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import BillingInformationNotes from '.'

jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('@apollo/client')
jest.mock('@staff-portal/notes', () => ({
  ...jest.requireActual('@staff-portal/notes'),
  Notes: jest.fn(() => null)
}))
jest.mock('../LogBillingInformationButton')
jest.mock('@staff-portal/billing/src/components/OperationWrapper')
jest.mock('@staff-portal/billing/src/components/ContentLoader')

const render = (props: ComponentProps<typeof BillingInformationNotes>) =>
  renderComponent(
    <Form.ConfigProvider value={{ requiredVariant: 'asterisk' }}>
      <BillingInformationNotes {...props} />
    </Form.ConfigProvider>
  )

describe('BillingInformationNotes', () => {
  it('renders content properly', () => {
    const mockedRefetch = jest.fn()

    ;(useGetNode as jest.Mock).mockReturnValueOnce(() => ({
      error: null,
      loading: false,
      initialLoading: false,
      data: undefined,
      refetch: mockedRefetch
    }))
    const { getByTestId } = render({
      companyId: 'VjEtQ29tcGFueS0xMjM0NQ'
    })

    expect(getByTestId('Section-title').textContent).toBe(
      'Billing Information Notes'
    )
    expect(Notes).toHaveBeenCalledTimes(1)
    expect(Notes).toHaveBeenCalledWith(
      {
        commentRequired: false,
        editSubmitText: 'Save as new version',
        notes: [],
        notFoundMessage: 'Currently, there are no billing information notes.',
        onUpdate: mockedRefetch,
        refetchNotes: mockedRefetch
      },
      {}
    )
  })

  describe('when it is an enterprise company', () => {
    it('renders Log Billing Info button', () => {
      const mockedRefetch = jest.fn()

      ;(useGetNode as jest.Mock).mockReturnValueOnce(() => ({
        loading: false,
        refetch: mockedRefetch,
        data: {
          cumulativeStatus: 'PENDING_TOS',
          fullName: 'Umbrella',
          operations: {
            logClientBillingInformation: {
              callable: 'ENABLED',
              messages: []
            }
          },
          billingInformationNotes: {
            nodes: []
          }
        }
      }))

      const { getByTestId } = render({
        companyId: 'VjEtQ29tcGFueS0xMjM0NQ'
      })
      const actionButton = getByTestId('LogBillingInformationButton')
      const actionButtonContent = getByTestId(
        'LogBillingInformationButton-content'
      )

      expect(actionButtonContent).toHaveTextContent('Log billing information')
      expect(actionButton).toBeEnabled()
    })
  })

  describe('when `billingInformationNotes` is `null`', () => {
    it('renders Log Billing Info button', () => {
      const mockedRefetch = jest.fn()

      ;(useGetNode as jest.Mock).mockReturnValueOnce(() => ({
        loading: false,
        refetch: mockedRefetch,
        data: {
          cumulativeStatus: 'PENDING_TOS',
          fullName: 'Umbrella',
          operations: {
            logClientBillingInformation: {
              callable: 'ENABLED',
              messages: []
            }
          },
          billingInformationNotes: null
        }
      }))

      const { getByTestId } = render({
        companyId: 'VjEtQ29tcGFueS0xMjM0NQ'
      })
      const actionButton = getByTestId('LogBillingInformationButton')
      const actionButtonContent = getByTestId(
        'LogBillingInformationButton-content'
      )

      expect(actionButtonContent).toHaveTextContent('Log billing information')
      expect(actionButton).toBeEnabled()
    })
  })
})
