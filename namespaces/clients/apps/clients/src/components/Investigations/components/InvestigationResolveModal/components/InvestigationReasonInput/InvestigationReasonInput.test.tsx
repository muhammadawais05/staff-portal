import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { InvestigationReason } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import InvestigationReasonInput from './InvestigationReasonInput'
import ReportedIssuesContent from '../ReportedIssuesContent'

jest.mock('../ReportedIssuesContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof InvestigationReasonInput>) =>
  render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <InvestigationReasonInput {...props} />
      </Form>
    </TestWrapper>
  )

const ReportedIssuesContentMock = ReportedIssuesContent as jest.Mock

describe('InvestigationResolveModalContent', () => {
  beforeEach(() => {
    ReportedIssuesContentMock.mockReturnValue(null)
  })

  describe('when investigationReason is OTHER', () => {
    it('shows resolution input', () => {
      arrangeTest({
        investigationReason: InvestigationReason.OTHER
      })

      expect(
        screen.getByTestId('InvestigationResolve-resolution-textarea')
      ).toBeDefined()
      expect(
        screen.queryByTestId('InvestigationResolve-resolution-select')
      ).toBeNull()
    })
  })

  describe('when investigationReason is not OTHER', () => {
    it('show resolution select', () => {
      arrangeTest({
        investigationReason: InvestigationReason.LEGAL
      })

      expect(
        screen.getByTestId('InvestigationResolve-resolution-select')
      ).toBeDefined()
      expect(
        screen.queryByTestId('InvestigationResolve-resolution-textarea')
      ).toBeNull()
    })
  })
})
