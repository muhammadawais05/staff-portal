import { cleanup, getNodeText } from '@toptal/picasso/test-utils'
import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceNoteListItem from './NoteListItem'

const mockedNotes = fixtures.MockInvoice.notes.nodes
const mockedHandleOnClick = jest.fn()

const render = (props: ComponentProps<typeof InvoiceNoteListItem>) =>
  renderComponent(
    <InvoiceNoteListItem {...props} handleOnClick={mockedHandleOnClick} />
  )

describe('NoteListItem', () => {
  afterEach(cleanup)

  beforeAll(() => {
    MockDate.set('2019-01-01T19:00:00.000+00:00')
  })

  it('default render', () => {
    const { container, queryByTestId } = render({
      note: mockedNotes[0]
    })
    const noteItem = queryByTestId('NoteListItem')

    expect(container).toMatchSnapshot()
    expect(noteItem).not.toBeNull()
  })

  it('renders the attachment label when there is an attachment to download', () => {
    const { queryByTestId } = render({
      note: { ...mockedNotes[0], attachment: { url: 'example.com' } }
    })
    const attachmentLabel = queryByTestId('NoteListItem-attachment')

    expect(attachmentLabel).not.toBeNull()
  })

  it('does not render the attachment label when no attachment is present', () => {
    const { queryByTestId } = render({
      note: { ...mockedNotes[0], attachment: undefined }
    })
    const attachmentLabel = queryByTestId('NoteListItem-attachment')

    expect(attachmentLabel).toBeNull()
  })

  it('contains only add date when update date is equal', () => {
    const { queryByTestId } = render({
      note: {
        ...mockedNotes[0],
        createdAt: '2020-04-21T05:47:01-04:00',
        updatedAt: '2020-04-21T05:47:01-04:00'
      }
    })
    const status = queryByTestId('NoteListItem-modified-status')

    expect(getNodeText(status)).toMatch(/(.*)added on Apr 21, 2020 at 9:47am$/)
  })

  it('contains both dates when update date is different', () => {
    const { queryByTestId } = render({
      note: {
        ...mockedNotes[0],
        createdAt: '2020-04-21T05:47:01-04:00',
        updatedAt: '2020-05-21T05:48:01-04:00'
      }
    })
    const status = queryByTestId('NoteListItem-modified-status')

    expect(getNodeText(status)).toMatch(
      /(.*)added on Apr 21, 2020 at 9:47am \(updated on May 21, 2020 at 9:48am\)$/
    )
  })
})
