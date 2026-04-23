import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { InvestigationReason } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import InvestigationResolveModalContent from './InvestigationResolveModalContent'
import ReportedIssuesContent from '../ReportedIssuesContent'

jest.mock('../ReportedIssuesContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const renderComponent = ({
  investigationReason,
  hasNoCommsTokenKey
}: Pick<
  ComponentProps<typeof InvestigationResolveModalContent>,
  'investigationReason' | 'hasNoCommsTokenKey'
>) =>
  render(
    <TestWrapper>
      <InvestigationResolveModalContent
        investigationReason={investigationReason}
        hasNoCommsTokenKey={hasNoCommsTokenKey}
        hideModal={() => {}}
        handleSubmit={(input: Record<PropertyKey, unknown>) =>
          Promise.resolve(input)
        }
        initialValues={{}}
        title='Modal Title'
        submitting={false}
        loading={false}
      />
    </TestWrapper>
  )

const ReportedIssuesContentMock = ReportedIssuesContent as jest.Mock

describe('InvestigationResolveModalContent', () => {
  beforeEach(() => {
    ReportedIssuesContentMock.mockReturnValue(null)
  })

  describe('when hasNoCommsTokenKey is false', () => {
    it('not renders removeNoCommsFlag', () => {
      renderComponent({
        investigationReason: InvestigationReason.OTHER
      })

      expect(
        screen.queryByTestId('investigation-resolve-modal-remove-no-comms-flag')
      ).toBeNull()
    })
  })

  describe('when hasNoCommsTokenKey is true', () => {
    it('renders removeNoCommsFlag', () => {
      renderComponent({
        investigationReason: InvestigationReason.OTHER,
        hasNoCommsTokenKey: true
      })

      expect(
        screen.getByTestId('investigation-resolve-modal-remove-no-comms-flag')
      ).toBeDefined()
    })
  })

  describe('when investigationReason is LEGAL', () => {
    it('shows component for Investigation with reason Legal', () => {
      renderComponent({
        investigationReason: InvestigationReason.LEGAL
      })

      expect(
        screen.getByTestId(
          'investigation-resolve-modal-settlement-agreement-sent'
        )
      ).toBeDefined()
      expect(ReportedIssuesContentMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when investigationReason is REPORTED_ISSUES', () => {
    it('shows component for Investigation with reason Reported Issues', () => {
      renderComponent({
        investigationReason: InvestigationReason.REPORTED_ISSUES
      })

      expect(
        screen.queryByTestId('InvestigationResolve-settlementAgreementSent')
      ).toBeNull()
      expect(ReportedIssuesContentMock).toHaveBeenCalledTimes(1)
    })
  })
})
