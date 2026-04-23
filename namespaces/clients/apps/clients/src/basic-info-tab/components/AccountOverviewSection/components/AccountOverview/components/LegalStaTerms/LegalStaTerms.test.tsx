import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import LegalStaTerms, { Props as LegalStaTermsProps } from './LegalStaTerms'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const getActiveStaContractMock = (
  standard = true,
  terminationPeriodApplicable = true
) => {
  return {
    webResource: {
      url: 'http://localhost:3000/platform/staff/contracts/277765',
      text: 'Rare Candy Collectables Client STA'
    },
    id: 'VjEtQ29udHJhY3QtMjc3NzY1',
    title: 'Rare Candy Collectables Client STA',
    status: 'SIGNED',
    kind: 'STA',
    signatureReceivedAt: '2022-02-24T05:12:50-05:00' as const,
    staTerms: {
      standard,
      terminationPeriodInDays: 10,
      terminationPeriodApplicable
    }
  }
}

const legalNameMock = 'Company test'

const arrangeTest = (props?: Partial<LegalStaTermsProps>) => {
  return render(
    <TestWrapper>
      <LegalStaTerms {...props} />
    </TestWrapper>
  )
}

describe('LegalStaTerms', () => {
  beforeEach(() => {
    mockUseModal.mockReturnValue({
      showModal: jest.fn()
    })
  })

  describe('when activeStaContract is passed', () => {
    it('renders type=Standard and name', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(),
        legalName: legalNameMock
      })

      expect(screen.getByText(/Type: Standard/)).toBeInTheDocument()
      expect(
        screen.getByText(/Termination period: 10 business days/)
      ).toBeInTheDocument()
    })

    it('renders type=Custom and name', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(false),
        legalName: legalNameMock
      })

      expect(screen.getByText(/Type: Custom/)).toBeInTheDocument()
      expect(
        screen.getByText(/Termination period: 10 business days/)
      ).toBeInTheDocument()
    })
  })

  describe('when terminationPeriodApplicable is false', () => {
    it('renders not applicable', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(false, false),
        legalName: legalNameMock
      })

      expect(screen.getByText(/Not applicable/)).toBeInTheDocument()
    })
  })

  describe('when activeStaContract is not passed', () => {
    it('renders not applicable', () => {
      render(
        <TestWrapper>
          <LegalStaTerms />
        </TestWrapper>
      )

      expect(screen.getByText(/Not applicable/)).toBeInTheDocument()
    })

    it('not renders View Term Details button', () => {
      render(
        <TestWrapper>
          <LegalStaTerms />
        </TestWrapper>
      )

      expect(screen.queryByText(/View Term Details/)).not.toBeInTheDocument()
    })
  })
})
