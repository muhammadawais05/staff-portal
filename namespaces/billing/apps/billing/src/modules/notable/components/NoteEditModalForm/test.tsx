import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NoteEditModalForm from '.'

jest.mock('../NoteEditModalFormAttachment')

const render = (isEdit: boolean) =>
  renderComponent(
    <NoteEditModalForm
      handleOnSubmit={jest.fn()}
      initialValues={{ attachment: {}, comment: '', title: '' }}
      isEdit={isEdit}
    />
  )

describe('NoteEditModalForm', () => {
  let spyConsole: jest.SpyInstance

  beforeEach(() => {
    spyConsole = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    spyConsole.mockRestore()
  })

  describe('when `isEdit` is `true`', () => {
    it('renders Edit form variant', () => {
      const { getByTestId } = render(true)

      expect(getByTestId('NoteEditModalForm-title')).toContainHTML('Edit Note')
      expect(getByTestId('cancel')).toContainHTML('Close')
      expect(getByTestId('submit')).toContainHTML('Edit Note')
      expect(getByTestId('NoteEditModalFormAttachment')).toBeInTheDocument()
      expect(getByTestId('title')).toContainHTML('Title')
      expect(getByTestId('comment')).toContainHTML('Comment')
    })
  })

  describe('when `isEdit` is `false`', () => {
    it('renders Create form variant', () => {
      const { getByTestId } = render(false)

      expect(getByTestId('NoteEditModalForm-title')).toContainHTML('Add Note')
      expect(getByTestId('cancel')).toContainHTML('Close')
      expect(getByTestId('submit')).toContainHTML('Add Note')
      expect(getByTestId('NoteEditModalFormAttachment')).toBeInTheDocument()
      expect(getByTestId('title')).toContainHTML('Title')
      expect(getByTestId('comment')).toContainHTML('Comment')
    })
  })
})
