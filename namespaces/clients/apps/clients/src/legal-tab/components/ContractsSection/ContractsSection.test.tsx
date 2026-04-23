import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { ContainerLoader } from '@staff-portal/ui'

import ContractsSection from './ContractsSection'
import { useGetContracts } from './data/get-contracts'
import { ContractsSectionContent, ContractSectionSkeleton } from './components'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ContainerLoader: jest.fn()
}))
jest.mock('./components/ContractsSectionContent', () => ({
  ContractsSectionContent: jest.fn()
}))
jest.mock('./data/get-contracts')

const mockedUseGetContracts = useGetContracts as jest.Mock
const mockedContainerLoader = ContainerLoader as jest.Mock
const mockedContractsSectionContent = ContractsSectionContent as jest.Mock

const renderWrapper = (props: ComponentProps<typeof ContractsSection>) =>
  render(<ContractsSection {...props} />)

describe('ContractsSection', () => {
  beforeEach(() => {
    mockedContainerLoader.mockImplementationOnce(({ children }) => (
      <>{children}</>
    ))
    mockedContractsSectionContent.mockReturnValueOnce(null)
  })

  describe('when company is no available', () => {
    it('does not render contract section content', () => {
      const loading = {}
      const initialLoading = {}

      mockedUseGetContracts.mockReturnValueOnce({ loading, initialLoading })

      renderWrapper({ companyId: '123' })

      expect(mockedContainerLoader).toHaveBeenCalledTimes(1)
      expect(mockedContainerLoader).toHaveBeenCalledWith(
        {
          loading,
          showSkeleton: initialLoading,
          skeletonComponent: expect.objectContaining({
            type: ContractSectionSkeleton
          }),
          children: undefined
        },
        {}
      )
      expect(mockedContractsSectionContent).toHaveBeenCalledTimes(0)
    })
  })

  describe('when company is available', () => {
    it('renders contract section content', () => {
      const loading = {}
      const initialLoading = {}
      const company = {}

      mockedUseGetContracts.mockReturnValueOnce({
        loading,
        initialLoading,
        company
      })

      renderWrapper({ companyId: '123' })

      expect(mockedContainerLoader).toHaveBeenCalledTimes(1)
      expect(mockedContainerLoader).toHaveBeenCalledWith(
        {
          loading,
          showSkeleton: initialLoading,
          skeletonComponent: expect.objectContaining({
            type: ContractSectionSkeleton
          }),
          children: expect.objectContaining({
            props: {
              company,
              isSubsidiarySelected: false,
              onSubsidiaryChange: expect.any(Function),
              onMutationSuccess: expect.any(Function)
            }
          })
        },
        {}
      )
      expect(mockedContractsSectionContent).toHaveBeenCalledTimes(1)
    })
  })

  describe('when loading fails', () => {
    it('throws error', () => {
      mockedUseGetContracts.mockImplementation(() => {
        throw new Error('Fail!')
      })

      // avoid error appearing on console
      const consoleErrorSpy = jest.spyOn(console, 'error')

      consoleErrorSpy.mockImplementation(() => {})

      expect(() => renderWrapper({ companyId: '123' })).toThrow('Fail!')
    })
  })
})
