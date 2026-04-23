import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EditableFieldArrayView } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import CareerPagesViewer from './CareerPagesViewer'
import CareerPagesViewerItem from '../CareerPagesViewerItem'

jest.mock('@staff-portal/editable', () => ({
  EditableFieldArrayView: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof CareerPagesViewer>) =>
  render(
    <TestWrapper>
      <CareerPagesViewer {...props} />
    </TestWrapper>
  )

const mockedEditableFieldArrayView = EditableFieldArrayView as jest.Mock

describe('CareerPagesViewer', () => {
  describe('when career pages are passed', () => {
    it('default render', () => {
      mockedEditableFieldArrayView.mockReturnValueOnce(null)
      const nodes = [
        {
          id: '',
          primary: false,
          __typename: 'CareerPage' as const
        }
      ]

      arrangeTest({
        nodes
      })

      expect(screen.queryByTestId('CareerPagesViewer-text')).toBeNull()
      expect(mockedEditableFieldArrayView).toHaveBeenCalledTimes(1)
      expect(mockedEditableFieldArrayView).toHaveBeenCalledWith(
        {
          nodes,
          nodeData: {},
          viewer: CareerPagesViewerItem
        },
        {}
      )
    })
  })

  describe('when career pages are not passed', () => {
    it('shows empty sign', () => {
      arrangeTest({
        nodes: []
      })

      expect(screen.getByTestId('CareerPagesViewer-text')).toHaveTextContent(
        NO_VALUE
      )
    })
  })
})
