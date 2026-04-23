import React from 'react'
import { render } from '@testing-library/react'
import { useQuery } from '@staff-portal/data-layer-service'
import { OperationWrapper } from '@staff-portal/operations'
import { Button } from '@toptal/picasso'
import { ActionLoader } from '@staff-portal/ui'
import { getCreateClientPath } from '@staff-portal/routes'

import AddNewCompanyButton from './AddNewCompanyButton'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  OperationWrapper: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ActionLoader: jest.fn()
}))

jest.mock('@staff-portal/routes', () => ({
  ...jest.requireActual('@staff-portal/routes'),
  getCreateClientPath: jest.fn()
}))

const ActionLoaderMock = ActionLoader as jest.Mock
const ButtonMock = Button as unknown as jest.Mock
const OperationWrapperMock = OperationWrapper as jest.Mock
const useQueryMock = useQuery as jest.Mock
const getCreateClientPathMock = getCreateClientPath as jest.Mock

const data = { operations: { createClient: {} } }
const loading = {}
const path = {}

describe('AddNewCompanyButton', () => {
  describe('when loading', () => {
    it('renders loader', () => {
      useQueryMock.mockReturnValue({
        loading
      })
      ActionLoaderMock.mockReturnValue(null)

      render(<AddNewCompanyButton />)

      expect(ActionLoaderMock).toHaveBeenCalledTimes(1)
      expect(OperationWrapperMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when loaded', () => {
    it('calls query and renders button with expected props passed', () => {
      OperationWrapperMock.mockImplementation(({ children }) => <>{children}</>)
      ButtonMock.mockReturnValue(null)
      getCreateClientPathMock.mockReturnValue(path)
      useQueryMock.mockReturnValue({
        loading: false,
        data
      })

      render(<AddNewCompanyButton />)

      expect(ActionLoaderMock).toHaveBeenCalledTimes(0)
      expect(OperationWrapperMock).toHaveBeenCalledTimes(1)
      expect(OperationWrapperMock).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: data.operations.createClient
        }),
        {}
      )

      expect(ButtonMock).toHaveBeenCalledTimes(1)
      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          href: path,
          children: 'Add New Company'
        }),
        {}
      )
    })
  })
})
