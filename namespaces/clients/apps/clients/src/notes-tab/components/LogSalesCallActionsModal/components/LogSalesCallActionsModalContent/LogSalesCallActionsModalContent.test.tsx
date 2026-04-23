import React, { ComponentProps } from 'react'
import { VisualComplianceStatus } from '@staff-portal/graphql/staff'
import { render, screen } from '@toptal/picasso/test-utils'
import { ModalSuspender } from '@staff-portal/modals-service'
import { assertIsNotNullish, noop } from '@staff-portal/utils'
import { Form } from '@toptal/picasso-forms'

import LogSalesCallActionsModalContent from './LogSalesCallActionsModalContent'
import LogSalesCallBusinessActions from '../../../LogSalesCallBusinessActions'
import { useGetLogSalesCallActionsData } from '../../data'
import { getLogSalesCallActionDescription } from '../../utils'
import { ClientClaimingOperationsFragment } from '../../../../data/client-claiming-operations-fragment'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: jest.fn()
}))
jest.mock('../../data', () => ({
  useGetLogSalesCallActionsData: jest.fn()
}))
jest.mock('@staff-portal/utils', () => ({
  assertIsNotNullish: jest.fn()
}))
jest.mock('../../../LogSalesCallBusinessActions', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../../utils', () => ({
  getLogSalesCallActionDescription: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    SubmitButton: jest.fn()
  }
}))

const renderComponent = (
  props: ComponentProps<typeof LogSalesCallActionsModalContent>
) => render(<LogSalesCallActionsModalContent {...props} />)

const MockModalSuspender = ModalSuspender as unknown as jest.Mock
const MockLogSalesCallBusinessActions = LogSalesCallBusinessActions as jest.Mock
const MockForm = Form as unknown as jest.Mock & {
  SubmitButton: jest.Mock
}
const mockAssertIsNotNullish = assertIsNotNullish as jest.Mock
const mockUseGetLogSalesCallActionsData =
  useGetLogSalesCallActionsData as jest.Mock
const mockGetLogSalesCallActionDescription =
  getLogSalesCallActionDescription as jest.Mock

describe('LogSalesCallActionsModalContent', () => {
  beforeEach(() => {
    MockModalSuspender.mockReturnValueOnce(null)
  })

  describe('when data is loading', () => {
    it('shows suspender', () => {
      mockUseGetLogSalesCallActionsData.mockReturnValueOnce({
        loading: true
      })

      renderComponent({
        clientId: 'clientId',
        hideModal: () => null
      })

      expect(MockModalSuspender).toHaveBeenCalledTimes(1)
      expect(mockAssertIsNotNullish).toHaveBeenCalledTimes(0)
    })
  })

  describe(`when data is loaded, but it's null`, () => {
    it('should throw an error', () => {
      jest.spyOn(console, 'error').mockImplementation(noop)
      mockUseGetLogSalesCallActionsData.mockReturnValueOnce({
        loading: false
      })
      mockAssertIsNotNullish.mockImplementationOnce(() => {
        throw new Error()
      })

      expect(() =>
        renderComponent({
          clientId: 'clientId',
          hideModal: () => null
        })
      ).toThrow()

      jest.spyOn(console, 'error').mockReset()
    })
  })

  describe('when data is loaded', () => {
    beforeEach(() => {
      mockAssertIsNotNullish.mockReturnValueOnce(null)
      MockLogSalesCallBusinessActions.mockReturnValueOnce(null)
      MockForm.SubmitButton.mockReturnValueOnce(null)
    })

    describe('when description, operations, ofacCheckNotStarted are not provided', () => {
      it('should render components respectively', () => {
        mockGetLogSalesCallActionDescription.mockReturnValueOnce(null)
        mockUseGetLogSalesCallActionsData.mockReturnValueOnce({
          loading: false,
          data: {}
        })

        renderComponent({
          clientId: 'clientId',
          hideModal: () => null
        })

        expect(MockModalSuspender).toHaveBeenCalledTimes(0)
        expect(
          screen.queryByTestId(
            'log-sales-call-actions-modal-content-description'
          )
        ).not.toBeInTheDocument()
        expect(MockForm.SubmitButton).toHaveBeenCalledTimes(1)
        expect(MockForm.SubmitButton).toHaveBeenCalledWith(
          expect.objectContaining({
            children: 'Change Client Status'
          }),
          {}
        )
        expect(MockLogSalesCallBusinessActions).toHaveBeenCalledTimes(0)
      })

      describe('when description, operations, ofacCheckNotStarted is "NOT_FULLY_CHECKED"', () => {
        it('should render components respectively', () => {
          const description = 'description'
          const operations = {} as unknown as ClientClaimingOperationsFragment
          const clientName = {} as unknown as string
          const visualComplianceStatus =
            VisualComplianceStatus.NOT_FULLY_CHECKED

          mockGetLogSalesCallActionDescription.mockReturnValueOnce(description)
          mockUseGetLogSalesCallActionsData.mockReturnValueOnce({
            loading: false,
            data: {
              fullName: clientName,
              visualComplianceStatus
            }
          })

          renderComponent({
            clientId: 'clientId',
            hideModal: () => null,
            operations
          })

          expect(MockModalSuspender).toHaveBeenCalledTimes(0)
          expect(
            screen.getByTestId(
              'log-sales-call-actions-modal-content-description'
            )
          ).toHaveTextContent(description)
          expect(MockForm.SubmitButton).toHaveBeenCalledTimes(1)
          expect(MockForm.SubmitButton).toHaveBeenCalledWith(
            expect.objectContaining({
              children: 'Save'
            }),
            {}
          )
          expect(mockGetLogSalesCallActionDescription).toHaveBeenCalledTimes(1)
          expect(mockGetLogSalesCallActionDescription).toHaveBeenCalledWith(
            expect.objectContaining({
              clientName
            })
          )
          expect(MockLogSalesCallBusinessActions).toHaveBeenCalledTimes(1)
          expect(MockLogSalesCallBusinessActions).toHaveBeenCalledWith(
            expect.objectContaining({
              operations
            }),
            {}
          )
        })
      })
    })
  })
})
