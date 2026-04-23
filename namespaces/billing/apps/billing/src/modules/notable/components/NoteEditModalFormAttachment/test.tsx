import { Form } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NoteEditModalFormAttachment from '.'

const mockedGetState = jest.fn()

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: () => ({ getState: mockedGetState })
}))

const fileMock = { file: {}, identifier: 'name', url: 'https://url.com' }

const render = (initialValues: object) =>
  renderComponent(
    <Form onSubmit={noop} initialValues={initialValues}>
      <NoteEditModalFormAttachment />
    </Form>
  )

describe('NoteEditModalFormAttachment', () => {
  describe('when attachment is missing', () => {
    it('renders upload attachment', () => {
      ;(mockedGetState as jest.Mock).mockReturnValue({
        values: { attachment: [] }
      })
      const { queryByTestId } = render({ attachment: [] })
      const downloadAttachmentElement = queryByTestId(
        'NoteEditModalFormAttachment-download-attachment'
      )
      const uploadAttachmentElement = queryByTestId(
        'NoteEditModalFormAttachment-upload-attachment'
      )
      const attachmentInput = queryByTestId(
        'NoteEditModalFormAttachment-attachment-input'
      )
      const cancelAttachmentUploadElement = queryByTestId(
        'NoteEditModalFormAttachment-cancel-attachment-upload'
      )

      expect(downloadAttachmentElement).toBeNull()
      expect(uploadAttachmentElement).toBeNull()
      expect(attachmentInput).not.toBeNull()
      expect(cancelAttachmentUploadElement).toBeNull()
    })
  })

  describe('when attachment exist', () => {
    it('renders download attachment', () => {
      ;(mockedGetState as jest.Mock).mockReturnValue({
        values: { attachment: [fileMock] }
      })
      const { queryByTestId } = render({
        attachment: [fileMock]
      })
      const downloadAttachmentElement = queryByTestId(
        'NoteEditModalFormAttachment-download-attachment'
      )
      const uploadAttachmentElement = queryByTestId(
        'NoteEditModalFormAttachment-upload-attachment'
      )
      const attachmentInput = queryByTestId(
        'NoteEditModalFormAttachment-attachment-input'
      )
      const cancelAttachmentUploadElement = queryByTestId(
        'NoteEditModalFormAttachment-cancel-attachment-upload'
      )

      expect(uploadAttachmentElement).not.toBeNull()
      expect(downloadAttachmentElement).not.toBeNull()
      expect(attachmentInput).toBeNull()
      expect(cancelAttachmentUploadElement).toBeNull()
    })
  })
})
