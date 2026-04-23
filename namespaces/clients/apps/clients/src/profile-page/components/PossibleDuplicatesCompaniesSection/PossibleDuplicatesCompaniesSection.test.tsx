import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import PossibleDuplicatesCompaniesSection from './PossibleDuplicatesCompaniesSection'
import { PossibleDuplicateRow } from './components'
import { useMarkClientDuplicatesResolved } from './hooks'
import { useGetClientPossibleDuplicates } from './utils'

jest.mock('./utils')
jest.mock('./hooks')
jest.mock('./components')

const mockedPossibleDuplicateRow = PossibleDuplicateRow as jest.Mock
const useMarkClientDuplicatesResolvedMock =
  useMarkClientDuplicatesResolved as jest.Mock
const useGetClientPossibleDuplicatesMock =
  useGetClientPossibleDuplicates as jest.Mock

describe('PossibleDuplicatesCompaniesSection', () => {
  beforeEach(() => {
    mockedPossibleDuplicateRow.mockReturnValue(null)
  })

  describe('when company has unresolved possible duplicates', () => {
    it('renders possible duplicates section', () => {
      const clientId = 'clientId'
      const operation = {
        messages: [],
        callable: OperationCallableTypes.ENABLED
      }

      useGetClientPossibleDuplicatesMock.mockReturnValue({
        loading: false,
        data: {
          edges: [{ node: { id: 'key' }, explanation: '' }]
        }
      })
      useMarkClientDuplicatesResolvedMock.mockReturnValue({
        loading: false,
        markClientDuplicatesResolved: () => {}
      })

      render(
        <PossibleDuplicatesCompaniesSection
          clientId={clientId}
          operation={operation}
        />
      )

      expect(useMarkClientDuplicatesResolvedMock).toHaveBeenCalledWith({
        clientId
      })
      expect(useGetClientPossibleDuplicatesMock).toHaveBeenCalledWith(clientId)
      expect(
        screen.getByTestId('possible-duplicates-section')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('PossibleDuplicates-mark-as-resolved')
      ).toBeInTheDocument()
      expect(screen.getByTestId('PossibleDuplicates-table')).toBeInTheDocument()
    })
  })
})
