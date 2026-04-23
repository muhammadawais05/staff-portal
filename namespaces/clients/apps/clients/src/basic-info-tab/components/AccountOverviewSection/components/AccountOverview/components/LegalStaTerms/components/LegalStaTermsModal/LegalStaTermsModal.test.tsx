import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import LegalStaTermsModal, {
  Props as LegalStaTermsModalProps
} from './LegalStaTermsModal'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: () => jest.fn(() => 'Feb, 24 2022')
}))

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

const legalNameMock = 'Awesome Company Name'

const arrangeTest = (props?: Partial<LegalStaTermsModalProps>) => {
  return render(
    <TestWrapper>
      <LegalStaTermsModal {...props} hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('LegalStaTermsModal', () => {
  describe('Legal Sta Terms Modal Items', () => {
    it('Renders the company name', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(),
        legalName: legalNameMock
      })

      expect(screen.getByText(/Awesome Company Name/)).toBeInTheDocument()
    })

    it('Renders Type as Standard', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(),
        legalName: legalNameMock
      })

      expect(screen.getByText('Standard')).toBeInTheDocument()
    })

    it('Renders Type as Custom', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(false),
        legalName: legalNameMock
      })

      expect(screen.getByText('Custom')).toBeInTheDocument()
    })

    it('Renders termination period in days', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(),
        legalName: legalNameMock
      })

      expect(screen.getByText('10 business days')).toBeInTheDocument()
    })

    it('Renders the signature date of the terms', () => {
      arrangeTest({
        activeStaContract: getActiveStaContractMock(),
        legalName: legalNameMock
      })

      expect(screen.getByText('Feb, 24 2022')).toBeInTheDocument()
    })
  })
})
