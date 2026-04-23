import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetApplicationInfo } from './data'
import ApplicationInfoModal from './ApplicationInfoModal'

jest.mock('./data')
const mockedUseGetApplicationInfo = useGetApplicationInfo as jest.Mock

const arrangeTest = () => ({
  renderResult: render(
    <TestWrapper>
      <ApplicationInfoModal
        entityId='tests'
        hideModal={jest.fn()}
        onModalOpen={jest.fn()}
      />
    </TestWrapper>
  )
})

describe('ApplicationInfoModal component', () => {
  describe('when application info exists', () => {
    it('renders application info items', () => {
      mockedUseGetApplicationInfo.mockReturnValue({
        applicationInfo: [
          { key: 'country', value: 'USA' },
          { key: 'state', value: '' },
          { key: 'id', value: '0' },
          { key: 'organic', value: 'false' },
          { key: 'host', value: 'null' }
        ]
      })

      arrangeTest()

      expect(screen.queryByText('Country')).toBeInTheDocument()
      expect(screen.queryByText('State')).not.toBeInTheDocument()
      expect(screen.queryByText('Id')).toBeInTheDocument()
      expect(screen.queryByText('Organic')).not.toBeInTheDocument()
      expect(screen.queryByText('Host')).not.toBeInTheDocument()
    })
  })

  describe('when application info does not exist', () => {
    it('renders notification message', () => {
      mockedUseGetApplicationInfo.mockReturnValue([])

      arrangeTest()

      expect(screen.queryByText('The data is unavailable')).toBeInTheDocument()
    })
  })
})
