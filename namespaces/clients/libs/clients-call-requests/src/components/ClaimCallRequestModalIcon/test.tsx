import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { CallRequestType } from '../../enums'
import ClaimCallRequestModalIcon from './ClaimCallRequestModalIcon'

jest.mock('@toptal/picasso/Icon/Calendar16', () => ({
  __esModule: true,
  default: () => <div data-testid='scheduled-icon' />
}))
jest.mock('@toptal/picasso/Icon/Flash16', () => ({
  __esModule: true,
  default: () => <div data-testid='instant-icon' />
}))

const arrangeTest = ({ type }: { type?: CallRequestType }) =>
  render(
    <TestWrapper>
      <ClaimCallRequestModalIcon type={type} />
    </TestWrapper>
  )

describe('ClaimCallRequestModalIcon', () => {
  describe('when it is a scheduled call request', () => {
    it('renders the scheduled icon', () => {
      arrangeTest({ type: CallRequestType.SCHEDULED })
      expect(screen.queryByTestId('scheduled-icon')).toBeInTheDocument()
    })
  })
  describe('when it is an instant call request', () => {
    it('renders the instant icon', () => {
      arrangeTest({ type: CallRequestType.INSTANT })
      expect(screen.queryByTestId('instant-icon')).toBeInTheDocument()
    })
  })

  describe('when the call request type is not recognized', () => {
    it('does not render icon', () => {
      arrangeTest({})
      expect(screen.queryByTestId('scheduled-icon')).not.toBeInTheDocument()
      expect(screen.queryByTestId('instant-icon')).not.toBeInTheDocument()
    })
  })
})
