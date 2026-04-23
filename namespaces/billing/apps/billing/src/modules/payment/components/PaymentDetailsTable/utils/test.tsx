import { DocumentStatus, PaymentKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

import getPaymentDetailsTableContent from '.'

jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
)
jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')

const getData = (paymentData: Partial<Payment> = {}) => ({
  ...fixtures.MockPayment,
  description: undefined,
  paymentKind: PaymentKind.RETURNED_CREDIT,
  paymentGroup: undefined,
  status: DocumentStatus.OUTSTANDING,
  subjectObject: {
    ...fixtures.MockPayment.subjectObject,
    ...paymentData?.subjectObject
  },
  ...paymentData
})

describe('#getPaymentDetailsTableContent', () => {
  it('returns non conditional items', () => {
    const [paymentFor, , , status, type, amount, balanceDue, , , createdOn] =
      getPaymentDetailsTableContent(getData())

    expect(paymentFor.label).toBe('Payment For')
    expect(JSON.stringify(paymentFor.value)).toContain(
      '"url":"http://localhost:3000/platform/staff/staff/1455082"'
    )

    expect(status.label).toBe('Status')
    expect(JSON.stringify(status.value)).toContain('"__typename":"Payment"')

    expect(type.label).toBe('Type')
    expect(type.value).toContain('Refunded credit balance')

    expect(amount.label).toBe('Amount')
    expect(amount.value).toContain('$7.71')

    expect(balanceDue.label).toBe('Balance Due')
    expect(balanceDue.value).toContain('$7.71')

    expect(createdOn.label).toBe('Created On')
    expect(createdOn.value).toContain('July 21, 2020')
  })

  describe('when `billingCycleGid` defined', () => {
    describe('when client link defined', () => {
      it('returns `Company` item', () => {
        const items = getPaymentDetailsTableContent(
          getData({
            billingCycleGid: 'aabb',
            client: { webResource: { text: 'aaa', url: 'bbb' } }
          })
        )
        const item = items.find(({ label }) => label === 'Company')

        expect(item.label).toBe('Company')
        expect(JSON.stringify(item.value)).toContain(
          '"webResource":{"text":"aaa","url":"bbb"}'
        )
        expect(item.hidden).toBe(false)
      })
    })

    describe('when client link undefined', () => {
      it('not returns `Company` item', () => {
        const items = getPaymentDetailsTableContent(
          getData({
            billingCycleGid: 'aabb',
            client: { webResource: undefined }
          })
        )
        const item = items.find(({ label }) => label === 'Company')

        expect(item.hidden).toBe(true)
      })
    })

    describe('when job link defined', () => {
      it('returns `Engagement` item', () => {
        const items = getPaymentDetailsTableContent(
          getData({
            billingCycleGid: 'aabb',
            job: { webResource: { text: 'aaa', url: 'bbb' } }
          })
        )
        const item = items.find(({ label }) => label === 'Engagement')

        expect(item.label).toBe('Engagement')
        expect(JSON.stringify(item.value)).toContain(
          '"webResource":{"text":"aaa","url":"bbb"}'
        )
        expect(item.hidden).toBe(false)
      })
    })

    describe('when job link undefined', () => {
      it('not returns `Engagement` items', () => {
        const items = getPaymentDetailsTableContent(
          getData({
            billingCycleGid: 'aabb',
            job: { webResource: undefined }
          })
        )
        const item = items.find(({ label }) => label === 'Engagement')

        expect(item.hidden).toBe(true)
      })
    })
  })

  describe('when `billingCycleGid` undefined', () => {
    it('not returns `Engagement` & `Company` items', () => {
      const items = getPaymentDetailsTableContent(
        getData({ billingCycleGid: undefined })
      )
      const itemEngagement = items.find(({ label }) => label === 'Engagement')
      const itemCompany = items.find(({ label }) => label === 'Company')

      expect(itemEngagement.hidden).toBe(true)
      expect(itemCompany.hidden).toBe(true)
    })
  })

  describe('when paymentGroup link defined', () => {
    it('returns `paymentGroup` item', () => {
      const items = getPaymentDetailsTableContent(
        getData({
          paymentGroup: { webResource: { text: 'aaa', url: 'bbb' } }
        })
      )
      const item = items.find(({ label }) => label === 'Payment Group')

      expect(item.hidden).toBe(false)
      expect(item.label).toBe('Payment Group')
      expect(JSON.stringify(item.value)).toContain(
        '"webResource":{"text":"aaa","url":"bbb"}'
      )
    })
  })

  describe('when paymentGroup link undefined', () => {
    it('not returns `paymentGroup` item', () => {
      const items = getPaymentDetailsTableContent(
        getData({
          paymentGroup: undefined
        })
      )
      const item = items.find(({ label }) => label === 'Payment Group')

      expect(item.hidden).toBe(true)
    })
  })

  describe('when payment is a commission', () => {
    it('returns `dueDate` & `duePeriod` item', () => {
      const items = getPaymentDetailsTableContent(
        getData({
          paymentKind: 'CASH_LEAD_REWARD',
          createdOn: '2020-05-25',
          dueDate: '2020-06-25'
        })
      )
      const itemDueDate = items.find(({ label }) => label === 'Due Date')
      const itemDuePeriod = items.find(({ label }) => label === 'Due Period')

      expect(itemDueDate.hidden).toBe(false)
      expect(itemDueDate.label).toBe('Due Date')
      expect(itemDueDate.value).toContain('June 25, 2020')

      expect(itemDuePeriod.hidden).toBe(false)
      expect(itemDuePeriod.label).toBe('Due Period')
      expect(itemDuePeriod.value).toBe(31)
    })
  })

  describe('when payment is not a commission', () => {
    it('not returns `dueDate` & `duePeriod` item', () => {
      const items = getPaymentDetailsTableContent(
        getData({
          paymentKind: 'COMPANY_CLAIMING_COMMISSION'
        })
      )
      const itemDueDate = items.find(({ label }) => label === 'Due Date')
      const itemDuePeriod = items.find(({ label }) => label === 'Due Period')

      expect(itemDueDate.hidden).toBe(true)
      expect(itemDuePeriod.hidden).toBe(true)
    })
  })

  describe('when payment has hold until date', () => {
    it('returns `paymentOnHold` item', () => {
      const items = getPaymentDetailsTableContent(
        getData({
          subjectObject: { activePaymentHold: { dateThreshold: '2020-05-05' } }
        })
      )
      const item = items.find(({ label }) => label === 'Payment on hold')

      expect(item.label).toBe('Payment on hold')
      expect(item.value).toContain('until May 5, 2020')
      expect(item.hidden).toBe(false)
    })
  })

  describe('when payment has no hold until date', () => {
    it('not returns `paymentOnHold` item', () => {
      const items = getPaymentDetailsTableContent(
        getData({
          subjectObject: undefined
        })
      )
      const item = items.find(({ label }) => label === 'Payment on hold')

      expect(item.hidden).toBe(true)
    })
  })
})
