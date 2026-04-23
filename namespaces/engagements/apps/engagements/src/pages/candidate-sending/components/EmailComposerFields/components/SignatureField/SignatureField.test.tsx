import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SignatureField, { Props } from './SignatureField'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <SignatureField {...props} />
    </TestWrapper>
  )

describe('SignatureField', () => {
  const claimerId = '123'
  const clientPartnerId = '456'
  const claimerSignOff = 'claimer signature'
  const clientPartnerSignOff = 'client partner signature'

  describe('when `senderId` equals to `claimerId`', () => {
    it('renders valid signature', () => {
      arrangeTest({
        senderId: claimerId,
        claimerId,
        clientPartnerId,
        claimerSignOff,
        clientPartnerSignOff
      })

      expect(screen.getByText(claimerSignOff)).toBeInTheDocument()
    })
  })

  describe('when `senderId` equals to `clientPartnerId`', () => {
    it('renders valid signature', () => {
      arrangeTest({
        senderId: clientPartnerId,
        claimerId,
        clientPartnerId,
        claimerSignOff,
        clientPartnerSignOff
      })

      expect(screen.getByText(clientPartnerSignOff)).toBeInTheDocument()
    })
  })

  describe('when `senderId` does not equal to `claimerId` or `clientPartnerId`', () => {
    it('does not render signature', () => {
      arrangeTest({
        senderId: '789',
        claimerId,
        clientPartnerId,
        claimerSignOff,
        clientPartnerSignOff
      })

      expect(screen.queryByText(claimerSignOff)).not.toBeInTheDocument()
      expect(screen.queryByText(clientPartnerSignOff)).not.toBeInTheDocument()
    })
  })
})
