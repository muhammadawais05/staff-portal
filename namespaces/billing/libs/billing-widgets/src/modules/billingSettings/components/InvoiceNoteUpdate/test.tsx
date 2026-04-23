import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceNoteUpdate from '.'
import adjustValues from './adjustValues'

jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('../../data')

const render = (invoiceNote = 'some note') =>
  renderComponent(<InvoiceNoteUpdate jobId='123' invoiceNote={invoiceNote} />)

describe('InvoiceNoteUpdate', () => {
  it('default render', () => {
    const { getByTestId, getByText } = render()

    expect(getByTestId('invoice-note-content')).toContainHTML('')
    expect(getByText('some note')).toBeInTheDocument()
  })

  it('shows fallback text', () => {
    const { getByTestId } = render('')

    expect(getByTestId('invoice-note-content')).toContainHTML(
      'No invoice note added'
    )
  })
})

describe('InvoiceNote #adjustValues', () => {
  it('will fallback to empty string for `invoiceNote` prop', () => {
    const actual = adjustValues({ jobId: '123' })
    const expected = { jobId: '123', invoiceNote: '' }

    expect(actual).toEqual(expected)
  })
  it('will return `invoiceNote` if it is a valid string', () => {
    const actual = adjustValues({ jobId: '123', invoiceNote: 'note' })
    const expected = { jobId: '123', invoiceNote: 'note' }

    expect(actual).toEqual(expected)
  })
})
