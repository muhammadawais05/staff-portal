import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModal from '.'
import { useGetPayModalInvoice } from '../../data'

jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/AlertModal')
jest.mock('../InvoicePayModalContent')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const mockGetPayModalInvoice = useGetPayModalInvoice as jest.Mock

const render = (props: ComponentProps<typeof InvoicePayModal>) =>
  renderComponent(<InvoicePayModal {...props} />)

describe('InvoicePayModal', () => {
  describe('default render', () => {
    it('renders form', () => {
      mockGetPayModalInvoice.mockReturnValue({
        data: {
          node: fixtures.MockInvoice
        },
        loading: false,
        initialLoading: false
      })

      const { queryByTestId } = render({
        options: {
          nodeId: fixtures.MockInvoice.documentNumber.toString(),
          nodeType: 'invoice'
        }
      })

      expect(queryByTestId('InvoicePayModalContent')).toBeInTheDocument()
    })
  })

  describe('loading `true` render', () => {
    it('renders form', () => {
      mockGetPayModalInvoice.mockReturnValue({
        data: undefined,
        loading: true,
        initialLoading: true
      })

      const { queryByTestId } = render({
        options: {
          nodeId: fixtures.MockInvoice.documentNumber.toString(),
          nodeType: 'invoice'
        }
      })

      expect(queryByTestId('ModalSkeleton')).toBeInTheDocument()
      expect(queryByTestId('InvoicePayModalContent')).not.toBeInTheDocument()
    })
  })
})
