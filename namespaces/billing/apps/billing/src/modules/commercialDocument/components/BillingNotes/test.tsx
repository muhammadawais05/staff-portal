import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommercialDocumentBillingNotes from '.'

const renderCommercialDocumentBillingNotes = (
  props?: ComponentProps<typeof CommercialDocumentBillingNotes>
) => {
  return renderComponent(<CommercialDocumentBillingNotes {...props} />)
}

describe('CommercialDocumentBillingNotes', () => {
  describe('when `billingNotes` defined', () => {
    it('default render', () => {
      const { queryByTestId } = renderCommercialDocumentBillingNotes({
        billingNotes: `Billing Notes
        in just a few lines.
        Test final line.`
      })

      const comment = queryByTestId('MultilineComment')

      expect(comment).toContainHTML(`Billing Notes<br`)
      expect(comment).toContainHTML(`in just a few lines.<br`)
      expect(comment).toContainHTML(`Test final line.`)
    })
  })

  describe('when `billingNotes` undefined', () => {
    it('default render', () => {
      const { queryByTestId } = renderCommercialDocumentBillingNotes()

      expect(queryByTestId('MultilineComment')).not.toBeInTheDocument()
    })
  })
})
