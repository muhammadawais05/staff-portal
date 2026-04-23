import React, { ComponentProps } from 'react'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceShortDescription from '.'

const render = (props: ComponentProps<typeof InvoiceShortDescription>) =>
  renderComponent(<InvoiceShortDescription {...props} />)

describe('#InvoiceShortDescription', () => {
  describe(`when kind is "COMPANY_BILL"`, () => {
    it('renders the expected short description', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.COMPANY_BILL
        }
      })

      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'Dec 29, 2019 — Jan 4, 2020'
      )
      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'href="http://localhost:3000/platform/staff/talents/829381"'
      )
      expect(getByTestId('InvoiceShortDescription-talent').innerHTML).toBe(
        'Bertie Davis'
      )
      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'href="http://localhost:3000/platform/staff/jobs/196075"'
      )
      expect(getByTestId('InvoiceShortDescription-job').innerHTML).toBe(
        'Job title link text'
      )
    })
  })

  describe(`when kind is "COMPANY_DEPOSIT"`, () => {
    describe('when "job" is defined', () => {
      it('renders the expected short description', () => {
        const { getByTestId } = render({
          invoice: {
            ...fixtures.MockInvoice,
            invoiceKind: InvoiceKind.COMPANY_DEPOSIT
          }
        })

        expect(
          getByTestId('InvoiceShortDescription-description')
        ).toContainHTML('Deposit for ')
        expect(
          getByTestId('InvoiceShortDescription-description')
        ).toContainHTML(
          'href="http://localhost:3000/platform/staff/jobs/196075"'
        )
        expect(getByTestId('InvoiceShortDescription-job').innerHTML).toBe(
          'Job title link text'
        )
      })
    })

    describe('when "job" is undefined', () => {
      it('renders the expected short description', () => {
        const { getByTestId } = render({
          invoice: {
            ...fixtures.MockInvoice,
            job: undefined,
            invoiceKind: InvoiceKind.COMPANY_DEPOSIT
          }
        })

        expect(
          getByTestId('InvoiceShortDescription-description')
        ).toContainHTML('Deposit (prepayment) for')
        expect(
          getByTestId('InvoiceShortDescription-description')
        ).toContainHTML(
          'href="http://localhost:3000/platform/staff/companies/1575810"'
        )
        expect(getByTestId('InvoiceShortDescription-company').innerHTML).toBe(
          'Wolf, Rath and Effertz'
        )
      })
    })
  })

  describe(`when kind is "COMPANY_FINE"`, () => {
    it('renders the expected short description', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.COMPANY_FINE
        }
      })

      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'Fee for '
      )
      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'href="http://localhost:3000/platform/staff/jobs/196075"'
      )
      expect(getByTestId('InvoiceShortDescription-job').innerHTML).toBe(
        'Job title link text'
      )
      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'href="http://localhost:3000/platform/staff/talents/829381"'
      )
      expect(getByTestId('InvoiceShortDescription-talent').innerHTML).toBe(
        'Bertie Davis'
      )
    })
  })

  describe(`when kind is "CONSOLIDATED"`, () => {
    it('renders the expected short description', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.CONSOLIDATED
        }
      })

      expect(getByTestId('InvoiceShortDescription-description').innerHTML).toBe(
        'Consolidated invoice from May 5 — Jun 6, 2015'
      )
    })
  })

  describe(`when unconsolidated is true"`, () => {
    it('renders the expected short description', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.CONSOLIDATED,
          unconsolidated: true
        }
      })

      expect(getByTestId('InvoiceShortDescription-description').innerHTML).toBe(
        'Unconsolidated invoice'
      )
    })
  })

  describe(`when kind is "EXTRA_EXPENSES"`, () => {
    it('renders the expected short description', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.EXTRA_EXPENSES
        }
      })

      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'Extra expenses from '
      )
      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'href="http://localhost:3000/platform/staff/talents/829381"'
      )
      expect(getByTestId('InvoiceShortDescription-talent').innerHTML).toBe(
        'Bertie Davis'
      )
      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'href="http://localhost:3000/platform/staff/jobs/196075"'
      )
      expect(getByTestId('InvoiceShortDescription-job').innerHTML).toBe(
        'Job title link text'
      )
    })
  })

  describe(`when kind is "TOPTAL_SERVICES_BILL"`, () => {
    it('renders the expected short description', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.TOPTAL_SERVICES_BILL
        }
      })

      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'Toptal services invoice for '
      )
      expect(getByTestId('InvoiceShortDescription-description')).toContainHTML(
        'href="http://localhost:3000/platform/staff/companies/1575810"'
      )
      expect(getByTestId('InvoiceShortDescription-company').innerHTML).toBe(
        'Wolf, Rath and Effertz'
      )
    })
  })
})
