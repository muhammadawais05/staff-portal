import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { StaffPortalRelatedTasks } from '@staff-portal/billing/src/@types/types'
import { useDependency } from '@staff-portal/dependency-injector'
import { when } from 'jest-when'

import { RELATED_TASKS } from '../../../../dependencies'
import InvoiceDetailsPage from '.'

jest.mock('../../../notable/components/NotesList')
jest.mock('../../components/InvoiceDetailsPageHeader')
jest.mock('../../components/InvoiceDetailsTable')
jest.mock('../../../notifications/components/EmailStatusPanel')
jest.mock('../../components/ConsolidatedInvoices')
jest.mock('../../../commercialDocument/components/Memorandums')
jest.mock('../../../transfer/components/TableWrapper')
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => ({
    data: null
  })
}))

jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

const MockedRelatedTasks: StaffPortalRelatedTasks = ({
  nodeId,
  taskSource
}) => (
  <div data-testid='RelatedTasks'>{JSON.stringify({ nodeId, taskSource })}</div>
)

when(useDependency as jest.Mock)
  .calledWith(RELATED_TASKS)
  .mockReturnValue(MockedRelatedTasks)

const render = () =>
  renderComponent(<InvoiceDetailsPage invoiceId={fixtures.MockInvoice.id} />)

describe('InvoiceDetailsPage', () => {
  it('renders Page', () => {
    const { getByTestId } = render()

    expect(getByTestId('content-title')).toContainHTML('Invoice #377249')
    expect(getByTestId('InvoiceDetailsPageHeader')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('EmailStatusPanel')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('NotesList')).toContainHTML('VjEtSW52b2ljZS0zNzcyNDk')
    expect(getByTestId('RelatedTasks')).toContainHTML(
      '{"nodeId":"VjEtSW52b2ljZS0zNzcyNDk","taskSource":"RELATED_TASKS_INVOICE"}'
    )
    expect(getByTestId('InvoiceDetailsTable')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('Transfers')).toContainHTML(
      '{"nodeId":"VjEtSW52b2ljZS0zNzcyNDk"}'
    )
    expect(getByTestId('Memorandums')).toContainHTML(
      '{"commercialDocumentId":"VjEtSW52b2ljZS0zNzcyNDk"}'
    )
    expect(getByTestId('ConsolidatedInvoices')).toContainHTML(
      '{"invoiceId":"VjEtSW52b2ljZS0zNzcyNDk"}'
    )
  })
})
