import React from 'react'
import { render, screen } from '@testing-library/react'
import { formatAmount } from '@toptal/picasso/utils'
import { TestWrapper } from '@staff-portal/test-utils'

import AccountField, { Props } from './AccountField'

const arrangeTest = ({ unallocatedMemorandum }: Props) => {
  render(
    <TestWrapper>
      <AccountField unallocatedMemorandum={unallocatedMemorandum} />
    </TestWrapper>
  )
}

describe('AccountField', () => {
  it('shows formatted amount with link', () => {
    const totalAmount = '123'
    const formattetAmount = formatAmount({ amount: Number(totalAmount) })
    const amountLink = 'TEST_LINK'

    arrangeTest({
      unallocatedMemorandum: {
        totalAmount,
        webResource: {
          text: totalAmount,
          url: amountLink
        }
      }
    })

    expect(screen.getByText(formattetAmount)).toBeInTheDocument()
    expect(screen.getByText(formattetAmount)).toHaveAttribute(
      'href',
      amountLink
    )
  })

  describe('when user has no permission', () => {
    it('shows formatted amount as plain text', () => {
      const totalAmount = '123'
      const formattetAmount = formatAmount({ amount: Number(totalAmount) })

      arrangeTest({
        unallocatedMemorandum: {
          totalAmount,
          webResource: {
            text: totalAmount
          }
        }
      })

      expect(screen.getByText(formattetAmount)).toBeInTheDocument()
      expect(screen.getByText(formattetAmount)).not.toHaveAttribute('href')
    })
  })
})
