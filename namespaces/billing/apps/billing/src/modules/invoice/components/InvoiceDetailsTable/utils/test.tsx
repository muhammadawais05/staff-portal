import fixtures from '@staff-portal/billing/src/_fixtures'

import getDetailsTableItems from '.'
import { GetInvoiceDetailsTableQuery } from '../data/getInvoiceDetailsTable.graphql.types'

jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')
jest.mock('../../InvoiceUpdatePurchaseOrder')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/invoice/components/InvoiceAmountWithColorAndTooltip'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
)

const getData = (
  variables?: Exclude<GetInvoiceDetailsTableQuery['node'], null | undefined>
) => ({
  ...fixtures.MockInvoice,
  ...variables
})

describe('#getDetailsTableItems', () => {
  describe('when `talent` webResource url is defined', () => {
    it('returns `talent` items', () => {
      const items = getDetailsTableItems(
        getData({
          invoiceKind: 'COMPANY_BILL',
          job: { id: 'abc' }
        })
      )
      const item = items.find(({ label }) => label === 'Talent')

      expect(item.hidden).toBe(false)
      expect(item.label).toBe('Talent')
      expect(JSON.stringify(item.value)).toContain(
        '"url":"http://localhost:3000/platform/staff/talents/829381'
      )
    })
  })

  describe('when `talent` webResource url is undefined', () => {
    it('not returns `talent` items', () => {
      const items = getDetailsTableItems(
        getData({
          talent: undefined
        })
      )
      const item = items.find(({ label }) => label === 'Talent')

      expect(item.hidden).toBe(true)
    })
  })

  describe('when its not a isConsolidatedInvoice', () => {
    describe('when it has a related job', () => {
      it('returns `engagement` and `jobStatus` item', () => {
        const items = getDetailsTableItems(
          getData({
            invoiceKind: 'COMPANY_BILL',
            job: { id: 'abc' }
          })
        )
        const itemEngagement = items.find(({ label }) => label === 'Engagement')
        const itemJob = items.find(({ label }) => label === 'Job status')

        expect(itemEngagement.hidden).toBe(false)
        expect(itemEngagement.label).toBe('Engagement')
        expect(JSON.stringify(itemEngagement.value)).toContain(
          'data-testid":"InvoiceDetailsTableRow-engagement-link"'
        )

        expect(itemJob.hidden).toBe(false)
        expect(itemJob.label).toBe('Job status')
        expect(JSON.stringify(itemJob.value)).toContain(
          '"testId":"InvoiceDetailsTableRow-jobStatus-text"'
        )
      })
    })

    describe('when it has not a related job', () => {
      it('not returns `engagement` and `jobStatus` item', () => {
        const items = getDetailsTableItems(
          getData({
            invoiceKind: 'COMPANY_BILL',
            job: undefined
          })
        )
        const itemEngagement = items.find(({ label }) => label === 'Engagement')
        const itemJob = items.find(({ label }) => label === 'Job status')

        expect(itemEngagement.hidden).toBe(true)
        expect(itemJob.hidden).toBe(true)
      })
    })
  })

  it('returns non conditional items', () => {
    const [
      invoiceFor,
      ,
      ,
      ,
      preferredBillingOption,
      amount,
      balanceTitle,
      status,
      ,
      purchaseOrder,
      createdOn,
      issueDate,
      duePeriod,
      dateDue,
      financeTeamMember
    ] = getDetailsTableItems(getData())

    expect(invoiceFor.label).toBe('Invoice for')
    expect(JSON.stringify(invoiceFor.value)).toContain(
      '"http://localhost:3000/platform/staff/companies/1575810"'
    )

    expect(preferredBillingOption.label).toBe('Preferred payment method')
    expect(preferredBillingOption.value).toBe('—')

    expect(amount.label).toBe('Original amount')
    expect(amount.value).toContain('$2,295.00')

    expect(balanceTitle.label).toBe('Consolidated balance')
    expect(JSON.stringify(balanceTitle.value)).toContain(
      '"__typename":"Invoice"'
    )

    expect(status.label).toBe('Status')
    expect(JSON.stringify(status.value)).toContain(
      '"data-testid":"InvoiceDetailsTableRow-status-text"'
    )

    expect(createdOn.label).toBe('Generated')
    expect(createdOn.value).toBe('January 7, 2020')

    expect(issueDate.label).toBe('Issue date')
    expect(issueDate.value).toBe('January 7, 2020')

    expect(duePeriod.label).toBe('Due period')
    expect(duePeriod.value).toBe('Net 30')

    expect(dateDue.label).toBe('Due date')
    expect(dateDue.value).toBe('February 6, 2020')

    expect(purchaseOrder.label).toBe('Purchase order number')
    expect(JSON.stringify(purchaseOrder.value)).toContain(
      '"__typename":"Invoice"'
    )

    expect(financeTeamMember.label).toBe('Finance team member')
    expect(JSON.stringify(financeTeamMember.value)).toContain(
      '"url":"http://localhost:3000/platform/staff/staff/763558"'
    )
  })
})
