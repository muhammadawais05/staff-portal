import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { ContactType } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { EditableFieldArrayView } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import PhoneContactsViewer from './PhoneContactsViewer'
import PhoneContactViewItem from '../PhoneContactViewItem/PhoneContactViewItem'

jest.mock('@staff-portal/editable', () => ({
  EditableFieldArrayView: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof PhoneContactsViewer>) =>
  render(
    <TestWrapper>
      <PhoneContactsViewer {...props} />
    </TestWrapper>
  )

const mockedEditableFieldArrayView = EditableFieldArrayView as jest.Mock

describe('PhoneContactsViewer', () => {
  describe('when phone numbers are passed', () => {
    it('default render', () => {
      mockedEditableFieldArrayView.mockReturnValueOnce(null)
      const nodes = [
        {
          id: '',
          type: ContactType.PHONE,
          value: '',
          primary: false
        }
      ]
      const nodeData = {
        companyRepresentativeId: 'test'
      }

      arrangeTest({
        nodes,
        nodeData
      })

      expect(screen.queryByTestId('PhoneContactsViewer-text')).toBeNull()
      expect(mockedEditableFieldArrayView).toHaveBeenCalledTimes(1)
      expect(mockedEditableFieldArrayView).toHaveBeenCalledWith(
        {
          nodes,
          nodeData,
          viewer: PhoneContactViewItem
        },
        {}
      )
    })
  })

  describe('when phone numbers list is empty', () => {
    it('shows empty sign', () => {
      arrangeTest({
        nodes: []
      })

      expect(screen.getByTestId('PhoneContactsViewer-text')).toHaveTextContent(
        NO_VALUE
      )
    })
  })

  describe('when phone numbers are not passed', () => {
    it('shows empty sign', () => {
      arrangeTest({
        nodes: undefined
      })

      expect(screen.getByTestId('PhoneContactsViewer-text')).toHaveTextContent(
        NO_VALUE
      )
    })
  })
})
