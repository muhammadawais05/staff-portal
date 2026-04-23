import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { EngagementStatusPerformerFragment } from '../../EngagementStatusSection/data'
import { getPerformer } from './get-performer'

const arrangeTest = (performer?: EngagementStatusPerformerFragment) => {
  const result = getPerformer(performer)

  render(<TestWrapper>{result}</TestWrapper>)
}

describe('getPerformer', () => {
  describe('when performer is missing', () => {
    it('shows System', () => {
      arrangeTest()

      expect(screen.getByText('System')).toBeInTheDocument()
    })
  })

  describe('when performer is provided', () => {
    it('shows performer link', () => {
      arrangeTest({
        webResource: { text: 'John Doe' }
      } as EngagementStatusPerformerFragment)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  describe('when client performer is provided', () => {
    it('shows client perform', () => {
      arrangeTest({
        client: { fullName: 'Client Name' },
        webResource: { text: 'Company Name' }
      } as EngagementStatusPerformerFragment)

      expect(screen.getByText('Company Name (Client Name)')).toBeInTheDocument()
    })
  })
})
