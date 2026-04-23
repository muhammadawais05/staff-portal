import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderDetailsTableCompany from '.'

const render = (
  props: ComponentProps<typeof PurchaseOrderDetailsTableCompany>
) => renderComponent(<PurchaseOrderDetailsTableCompany {...props} />)

describe('PurchaseOrderDetailsTableCompany', () => {
  describe('with `shared` false', () => {
    it('should not render the shared icon', () => {
      const { queryByTestId } = render({
        shared: false,
        client: { webResource: { text: 'COMPANY', url: 'URL' } }
      })

      expect(
        queryByTestId('PurchaseOrderDetailsTableCompany-shared-icon')
      ).toBeNull()
    })
  })

  describe('with `shared` true', () => {
    it('should render the shared icon', () => {
      const { queryByTestId } = render({
        shared: true,
        client: { webResource: { text: 'COMPANY', url: 'URL' } }
      })

      expect(
        queryByTestId('PurchaseOrderDetailsTableCompany-shared-icon')
      ).toBeInTheDocument()
    })
  })
})
